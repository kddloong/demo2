import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { Button, Drawer, message, Modal, Space } from 'antd';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useRef, useState } from 'react';
import { SettleOrderForLessonSignUp } from '@/components/lesson/SettleOrderForLessonSignUp';
import { BackLessonSignUpOrder } from '@/components/lesson/BackLessonSignUpOrder';
import { Access, useAccess } from '@umijs/max';
import { LessonArrange } from 'types/lesson/lesson-arrange';
import { LessonSignUpPayTypeEnum, LessonSignUpStatusEnum } from '@/utils/enums';
import {
  handleBackLessonSignUpOrder,
  handleCheckInLesson,
  handleFetchLessonUnpaidPeopleInfo,
  handleFetchSignUpPerson,
} from '@/utils/lesson/lesson-arrange/group-lesson-arrange';
import { useLessonInfoById } from '@/hooks/lesson/useLessonInfoById';
import { lessonArrangeSignUpColumns } from './columns';
import { utilsStyles } from '@/styles/utilsStyles';

interface SignUpProps {
  planId: string;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  lessonId: string;
  refreshTable: () => void;
}

/**
 * 课程报名信息列表
 * @param props
 * @constructor
 */
const LessonSignUpDrawer: FC<SignUpProps> = (props) => {
  const { planId, visible, setVisible, lessonId, refreshTable: refreshArrangeTable } = props;

  const access = useAccess();

  const actionUserRef = useRef<ActionType>();

  const [payVisible, setPayVisible] = useState(false);

  const [record, setRecord] = useState<LessonArrange.SignUpPersonItem | null>(null);

  const [backVisible, setBackVisible] = useState(false);

  const [payParams, setPayParams] = useState({
    price: 0,
    id: '',
    planId: '',
    name: '',
    phoneNo: '',
    gender: '',
    signUpNo: '',
  });

  const { styles } = utilsStyles();

  const refreshTable = () => {
    actionUserRef.current?.reload();
  };

  const lessonInfo = useLessonInfoById(lessonId);

  return (
    <>
      <Drawer
        visible={visible}
        width={document.body.clientWidth > 1700 ? 1600 : '90%'}
        onClose={() => {
          refreshArrangeTable?.();
          setVisible(false);
        }}
      >
        <ProTable
          className={styles.myTableChose}
          actionRef={actionUserRef}
          rowKey="id"
          search={
            access?.['lesson:setting:signUp:search']
              ? {
                  labelWidth: 'auto',
                  span: 6,
                  defaultCollapsed: true,
                  optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
                }
              : false
          }
          headerTitle={
            <Space>
              <Access key={'export'} accessible={!access?.['lesson:setting:signUp:export']}>
                <Button
                  onClick={async () => {
                    const exportUrl = `${API_URL}/venue-service/${version}/train/class/signUp/download?planId=${planId}&access_token=${localStorage.getItem(
                      'accessToken',
                    )}`;

                    window.open(exportUrl, '_blank');
                  }}
                >
                  导出
                </Button>
              </Access>
              <Access key={'checkId'} accessible={!access?.['lesson:setting:signUp:checkIn']}>
                <Button
                  key={'show'}
                  disabled={
                    record?.checkIn === '1' ||
                    record?.status !== LessonSignUpStatusEnum.SIGN_UP_SUCCESS
                  }
                  onClick={async () => {
                    Modal.confirm({
                      title: '签到',
                      content: '确定要签到吗？',
                      onOk: async () => {
                        if (record && 'id' in record) {
                          const result = await handleCheckInLesson(record?.id);

                          if (result.success) {
                            refreshTable();
                          }
                        }
                      },
                    });
                  }}
                >
                  签到
                </Button>
              </Access>

              <Access key={'pay'} accessible={!access?.['lesson:setting:signUp:pay']}>
                <Button
                  disabled={record?.status !== LessonSignUpStatusEnum.NEED_PAY}
                  key={'pay'}
                  onClick={async () => {
                    if (record?.source && ['8', '9'].includes(record.source)) {
                      message.error('暂不支持该订单来源的付款');
                      return;
                    }

                    if (record) {
                      setPayParams({
                        price: record?.price,
                        planId: record?.planId,
                        id: record?.id,
                        gender: record?.gender,
                        name: record?.name,
                        phoneNo: record?.phoneNo,
                        signUpNo: record?.signUpNo,
                      });
                      setPayVisible(true);
                    }
                  }}
                >
                  支付
                </Button>
              </Access>

              <Access key={'back'} accessible={!access?.['lesson:setting:signUp:cancel']}>
                <Button
                  key="delete"
                  disabled={
                    ![
                      LessonSignUpStatusEnum.CHECK_IN,
                      LessonSignUpStatusEnum.SIGN_UP_SUCCESS,
                    ].includes(record?.status as LessonSignUpStatusEnum)
                  }
                  onClick={() => {
                    if (record) {
                      if (record.type === LessonSignUpPayTypeEnum.USE_COMBO) {
                        //   套餐约课
                        setPayParams({
                          gender: '',
                          name: '',
                          phoneNo: '',
                          planId: '',
                          price: 0,
                          signUpNo: '',
                          id: record.id,
                        });
                        setBackVisible(true);
                      } else {
                        // 报名价格为0时， 走取消订单的接口
                        if (record.price === 0) {
                          Modal.confirm({
                            title: '退款',
                            content: '确定要退款吗?',
                            onOk: async () => {
                              const result = await handleBackLessonSignUpOrder({
                                id: record.id,
                                price: 0,
                                refundReason: '',
                              });
                              if (result.success) {
                                refreshTable?.();
                              }
                            },
                          });
                        } else {
                          setPayParams({
                            gender: '',
                            name: '',
                            phoneNo: '',
                            planId: '',
                            price: 0,
                            signUpNo: '',
                            id: record.id,
                          });
                          setBackVisible(true);
                        }
                      }
                    }
                  }}
                >
                  退款
                </Button>
              </Access>
              {/* 2022-12-12 已支付成功订单, 已取消订单 不可以取消订单 */}
              <Access key={'cancel'} accessible={!access?.['lesson:setting:signUp:cancel']}>
                <Button
                  onClick={async () => {
                    Modal.confirm({
                      title: '取消订单',
                      content: '确定要取消该订单信息吗?',
                      onOk: async () => {
                        const userResult = await handleFetchLessonUnpaidPeopleInfo(
                          record?.id as string,
                        );

                        if (userResult) {
                          refreshTable();
                        }
                      },
                    });
                  }}
                  disabled={!record || LessonSignUpStatusEnum.NEED_PAY !== record.status}
                >
                  取消订单
                </Button>
              </Access>
            </Space>
          }
          rowClassName={(row) => {
            if (row.signUpNo === record?.signUpNo) {
              return `clicked`;
            }
            return '';
          }}
          onRow={(recordRow) => {
            return {
              onClick: () => {
                setRecord(recordRow);
              },
            };
          }}
          request={async (userParams) => {
            const { status, ...other } = userParams;

            return await handleFetchSignUpPerson({
              ...other,
              field: 'createDate',
              order: 'desc',
              planId: planId as string,
            } as LessonArrange.SearchSignUpParams);
          }}
          columns={lessonArrangeSignUpColumns(
            lessonInfo?.genderLimit ?? '',
            lessonInfo?.isLimitAge ?? '',
          )}
          scroll={{
            x: 1600,
          }}
        />

        {/*支付已报名未支付订单*/}
        {payVisible && (
          <SettleOrderForLessonSignUp
            info={payParams}
            visible={payVisible}
            setVisible={setPayVisible}
            refreshTable={refreshTable}
            price={payParams.price}
            memberPrice={lessonInfo?.memPrice}
            classId={lessonId}
          />
        )}

        {/*报名退款*/}
        {backVisible && (
          <BackLessonSignUpOrder
            visible={backVisible}
            setVisible={setBackVisible}
            orderId={payParams.id}
            refreshTable={refreshTable}
          />
        )}
      </Drawer>
    </>
  );
};

export { LessonSignUpDrawer };
