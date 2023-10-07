import type { FC } from 'react';
import { useState } from 'react';
import { Button, Form, message, Modal, Space } from 'antd';
import {
  DescriptionsSkeleton,
  ProDescriptions,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import { getBackLessonSignUpColumns } from './columns';
import { LessonSignUpPayTypeEnum } from '@/utils/enums';
import {
  handleBackLessonSignUpOrder,
  handleFetchLessonSignUpInfoById,
} from '@/utils/lesson/lesson-arrange/group-lesson-arrange';
import { TypeUtil } from 'types/utils';
import { LessonArrange } from '../../../../types/lesson/lesson-arrange';

type BackRentOrderProps = {
  visible: boolean;
  setVisible: TypeUtil.SetState<boolean>;
  orderId: string;
  // 退押金 或 订单
  refreshTable: any;
};

/**
 * 课程报名订单退款
 * @param props
 * @constructor
 */
const BackLessonSignUpOrder: FC<BackRentOrderProps> = (props) => {
  const { visible, setVisible, orderId, refreshTable } = props;

  const [pageData, setPageData] = useState<LessonArrange.SignUpPersonItem | null>(null);

  useAsyncEffect(async () => {
    if (visible) {
      const result = await handleFetchLessonSignUpInfoById(orderId);

      if (result.success && 'id' in result.data) {
        setPageData(result.data);
      }
    }
  }, [visible]);

  const [form] = Form.useForm();

  const back = async () => {
    if (pageData?.id) {
      if (pageData?.type === LessonSignUpPayTypeEnum.USE_MONEY) {
        const price = form.getFieldValue('price');

        if (price === 0) {
          message.warning(`价格为0,不需要退款!`);
          return;
        }

        const result = await handleBackLessonSignUpOrder({
          id: pageData.id,
          price,
          refundReason: form.getFieldValue('refundReason'),
        });
        if (result.success) {
          refreshTable?.();
          setVisible(false);
        }
      }
    }
  };

  return (
    <>
      <Modal
        title={'订单退款'}
        visible={visible}
        maskClosable={false}
        onCancel={() => setVisible(false)}
        width={1200}
        destroyOnClose={true}
        footer={
          <>
            {pageData && 'id' in pageData && (
              <Space>
                <Button onClick={() => setVisible(false)}>返回</Button>

                <Button
                  type={'primary'}
                  onClick={async () => {
                    if (pageData?.type === LessonSignUpPayTypeEnum.USE_COMBO) {
                      const num = form.getFieldValue('num');

                      if (!num) {
                        message.warning('请输入要退的课时!');
                        return;
                      }
                    }

                    Modal.confirm({
                      title:
                        pageData?.type === LessonSignUpPayTypeEnum.USE_MONEY ? '退款' : '退课时',
                      content: `确定要为订单${pageData.signUpNo} ${
                        pageData?.type === LessonSignUpPayTypeEnum.USE_MONEY ? '退款' : '退课时'
                      }吗?`,
                      onOk: async () => {
                        await back();
                      },
                    });
                  }}
                >
                  {'退款'}
                </Button>
              </Space>
            )}
          </>
        }
      >
        {!pageData ? (
          <DescriptionsSkeleton active />
        ) : (
          <>
            {/*@ts-ignore*/}
            <ProDescriptions
              columns={getBackLessonSignUpColumns(pageData?.type)}
              dataSource={pageData}
            />

            <ProForm
              form={form}
              submitter={false}
              initialValues={{
                backPriceType: '0',
              }}
            >
              {pageData?.type === LessonSignUpPayTypeEnum.USE_MONEY ? (
                <>
                  {' '}
                  <ProFormRadio.Group
                    name={'backPriceType'}
                    label={`退款方式`}
                    options={[
                      {
                        label: `全额退款`,
                        value: '0',
                      },
                      {
                        label: `自定义退款`,
                        value: '1',
                      },
                    ]}
                    fieldProps={{
                      onChange: (e) => {
                        if (e.target.value === '0') {
                          form.setFieldsValue({
                            price: pageData?.actPrice,
                          });
                        }
                      },
                    }}
                  />
                  <ProFormDependency name={['backPriceType']}>
                    {({ backPriceType }) => {
                      if (backPriceType === '0') {
                        return (
                          <ProFormDigit
                            label={`退款金额`}
                            name={'price'}
                            width={'sm'}
                            initialValue={pageData?.actPrice}
                            readonly
                          />
                        );
                      }

                      if (backPriceType === '1') {
                        return <ProFormDigit label={`退款金额`} name={'price'} width={'sm'} />;
                      }

                      return null;
                    }}
                  </ProFormDependency>
                </>
              ) : (
                <>
                  <ProFormDigit
                    label={`课时数`}
                    name={'num'}
                    width={'sm'}
                    fieldProps={{
                      precision: 0,
                    }}
                  />
                </>
              )}

              <ProFormText name={'refundReason'} label={'退款理由'} width={'md'} />
            </ProForm>
          </>
        )}
      </Modal>
    </>
  );
};

export { BackLessonSignUpOrder };
