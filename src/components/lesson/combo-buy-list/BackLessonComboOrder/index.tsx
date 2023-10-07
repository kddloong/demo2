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
import { backLessonComboColumns } from './columns';
import { TypeUtil } from '../../../../../types/utils';
import {
  handleBackLessonComboOrder,
  handleFetchLessonComboOrderById,
} from '@/utils/lesson/combo/combo-order';

type BackRentOrderProps = {
  visible: boolean;
  setVisible: TypeUtil.SetState<boolean>;
  orderId: string;
  // 退押金 或 订单
  refreshTable: any;
};

/**
 * 套餐订单订单退款
 * @param props
 * @constructor
 */
const BackLessonComboOrder: FC<BackRentOrderProps> = (props) => {
  const { visible, setVisible, orderId, refreshTable } = props;

  const [pageData, setPageData] = useState<ComboOrder.ComboOrderItem | null>(null);

  useAsyncEffect(async () => {
    if (visible) {
      const result = await handleFetchLessonComboOrderById(orderId);

      if (result.success && result.data && 'id' in result.data) {
        setPageData(result.data);
      }
    }
  }, [visible]);

  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title={'订单退款'}
        open={visible}
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
                    Modal.confirm({
                      title: '退款',
                      content: `确定要为订单${pageData.orderNo} 退款吗?`,
                      onOk: async () => {
                        const price = form.getFieldValue('price');

                        if (price === 0) {
                          message.warning(`价格为0, 不需要退款!`);
                          return;
                        }

                        const result = await handleBackLessonComboOrder({
                          id: pageData.id,
                          price,
                          refundReason: form.getFieldValue('refundReason'),
                        });
                        if (result.success) {
                          refreshTable?.();
                          setVisible(false);
                        }
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
            <ProDescriptions columns={backLessonComboColumns} dataSource={pageData} />

            <ProForm
              form={form}
              submitter={false}
              initialValues={{
                backPriceType: '0',
              }}
            >
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
                    return (
                      <ProFormDigit
                        label={`退款金额`}
                        name={'price'}
                        width={'sm'}
                        max={pageData?.actPrice}
                      />
                    );
                  }

                  return null;
                }}
              </ProFormDependency>

              <ProFormText name={'refundReason'} label={'退款理由'} width={'md'} />
            </ProForm>
          </>
        )}
      </Modal>
    </>
  );
};

export { BackLessonComboOrder };
