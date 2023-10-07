import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Col, Form, message, Modal, Row } from 'antd';
import { useModel } from '@@/exports';
import { ProCard, ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import '@/components/area-and-ticket/SettleOrder/styles.css';
import { LessonArrange } from 'types/lesson/lesson-arrange';
import { TypeUtil } from 'types/utils';
import { MemberUserInfo } from 'types/member/member/user-info';
import { INVEST_CARD_PAY, NEGATIVE_STATUS as CASH_PAY } from '@/utils/utils';
import { useExistingOrderInfo } from '@/hooks/useExistingOrderInfo';
import { handleDictionaryForPayType } from '@/utils/main/main/dictionary';
import { useLessonInfoById } from '@/hooks/lesson/useLessonInfoById';
import { ScanModal } from '@/components/ScanModal';
import { BaseSettleOrderInfo } from '@/components/BaseSettleOrderInfo';
import { decideLessonSignUp } from '@/utils/lesson/pay/decideLessonSignUp';
import { formLabelStyles } from '@/styles/form/styles';

export interface SettleOrderForLessonSignUpProps {
  info: LessonArrange.SaveLessonSignUpParams;
  visible: boolean;
  setVisible: TypeUtil.SetState<boolean>;
  refreshTable: () => void;
  price: number;
  memberPrice: number;
  classId: string;
}

/**
 * 课程报名 支付控制台
 * @param props
 * @constructor
 */
const SettleOrderForLessonSignUp: FC<SettleOrderForLessonSignUpProps> = (props) => {
  const { info, visible, setVisible, refreshTable, price, memberPrice, classId } = props;

  const { styles } = formLabelStyles();

  const [infoForm] = Form.useForm();

  const [scanVisible, setScanVisible] = useState(false);

  const [actionForm] = Form.useForm();

  const [orderId, setOrderId] = useState('');

  const [memberCardList, setMemberCardList] = useState<MemberUserInfo.MemberCardListItem[]>([]);

  const [memberInfo, setMemberInfo] = useState({
    memberId: '',
    configId: '',
    detailType: '',
  });

  // 不能删
  const { existingOrderInfo: existingInfo, saveExistingInfo: saveInfo } = useExistingOrderInfo();

  useEffect(() => {
    infoForm.setFieldsValue({ phoneNo: info.phoneNo, contact: info.name });

    if (info?.id && info?.signUpNo) {
      saveInfo(info.id, info.signUpNo);
    }
  }, []);

  const newClassInfo = useLessonInfoById(classId);

  const close = () => {
    setVisible?.(false);
    refreshTable?.();
  };

  const action = (payType: string) => {
    if (payType === CASH_PAY || payType === INVEST_CARD_PAY) {
      return () => {
        setVisible?.(false);
        refreshTable?.();
      };
    } else {
      return (returnOrderId: string) => {
        setOrderId(returnOrderId);
        setScanVisible(true);
      };
    }
  };

  const clickCard = (item: MemberUserInfo.MemberCardListItem) => {
    setMemberInfo({
      memberId: item.memberId,
      configId: item.id,
      detailType: item.type,
    });

    actionForm.setFieldsValue({
      payType: INVEST_CARD_PAY,

      needPrice: memberPrice,
    });
  };

  return (
    <>
      <Modal
        visible={visible}
        maskClosable={false}
        width={1200}
        onCancel={() => setVisible(false)}
        onOk={async () => {
          await infoForm.validateFields();

          await actionForm.validateFields();

          const infoResult = infoForm.getFieldsValue();

          const actionResult = actionForm.getFieldsValue();

          if (actionResult.payType === '4') {
            if (!infoResult.memberId) {
              message.error('请输入会员信息并查询或读取实体卡信息');
              return;
            }
          }

          /**
           * @date 2022-09-22
           * 如果包含支付操作
           */

          await decideLessonSignUp(
            { ...info, name: infoResult.contact, memberId: infoResult.memberId },
            {
              payType: actionResult.payType,
            },
            {
              memberId: memberInfo?.memberId,
              configId: memberInfo?.configId,
              detailType: memberInfo?.detailType,
            },
            actionResult.needPrice,
            action,
            existingInfo,
            saveInfo,
          );
        }}
      >
        <ProCard
          style={{
            marginTop: '24px',
          }}
          bodyStyle={{
            border: '1px solid black',
          }}
        >
          <Row gutter={16}>
            <Col span={9}>
              <ProCard title={<span className={'modal-title'}>报名信息</span>}>
                <>
                  <p>姓名：{(info as LessonArrange.SaveLessonSignUpParams).name || 0}</p>
                  <p>手机号：{(info as LessonArrange.SaveLessonSignUpParams).phoneNo || 0}</p>
                  <p>课程名称：{newClassInfo?.name || 0}</p>
                  <p>课程老师：{newClassInfo?.teacherName || 0}</p>
                </>
              </ProCard>
            </Col>
            <Col span={15}>
              <BaseSettleOrderInfo
                form={infoForm}
                memberCardList={memberCardList}
                setMemberCardList={setMemberCardList}
                clickCard={clickCard}
                mainType={'lesson'}
              />

              <>
                <ProCard title={<span className={'modal-title'}>结账信息</span>}>
                  <ProForm
                    className={styles['base-form']}
                    form={actionForm}
                    submitter={false}
                    layout={'horizontal'}
                    initialValues={{
                      payType: '0',
                      needPrice: price,
                    }}
                  >
                    <ProFormRadio.Group
                      name={'payType'}
                      label={'付款方式'}
                      request={async () => {
                        return await handleDictionaryForPayType();
                      }}
                      fieldProps={{
                        onChange: (e) => {
                          // info.price 只有在 点击报名列表的支付才会有

                          if (price) {
                            if (
                              e.target.value === INVEST_CARD_PAY &&
                              infoForm.getFieldValue('memberId')
                            ) {
                              actionForm.setFieldsValue({ needPrice: memberPrice });
                            } else {
                              actionForm.setFieldsValue({ needPrice: price });
                            }
                          }
                        },
                      }}
                    />

                    <ProFormText name={'needPrice'} readonly label={'应付金额'} />
                  </ProForm>
                </ProCard>
              </>
            </Col>
          </Row>
        </ProCard>

        {scanVisible && (
          <ScanModal
            visible={scanVisible}
            setVisible={setScanVisible}
            orderId={orderId}
            payType={actionForm?.getFieldValue('payType')}
            closeSettle={close}
            openSource={'lesson'}
          />
        )}
      </Modal>
    </>
  );
};

export { SettleOrderForLessonSignUp };
