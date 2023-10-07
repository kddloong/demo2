import type { FC } from 'react';
import { useState } from 'react';
import { Button, Form, message, Modal, Space } from 'antd';
import {
  DescriptionsSkeleton,
  ProForm,
  ProFormDigit,
  ProFormText,
} from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import type { RebackMemberOrderPriceProps } from '@/pages/member/member/order-list/components/RebackMemberOrderPrice/props';
import { handleBackMemberOrder, handleFetchMemberOrderInfoById } from '@/utils/member/member/order';
import { isEmpty } from '@/utils/utils';

/**
 * 会员卡支付退款
 * @param props
 * @constructor
 */
const RebackMemberOrderPrice: FC<RebackMemberOrderPriceProps> = (props) => {
  const { visible, setVisible, orderId, refreshTable } = props;

  const [pageData, setPageData] = useState<Partial<MemberOrder.MemberOrderItem>>({});
  const [form] = Form.useForm();
  useAsyncEffect(async () => {
    if (visible) {
      const result = await handleFetchMemberOrderInfoById(orderId);

      if (result.success) {
        const resultData = result.data;

        if (resultData) {
          setPageData(result.data);

          form.setFieldsValue({ price: resultData.price });
        }
      }
    }
  }, [visible]);

  return (
    <>
      <Modal
        title={'会员订单退款'}
        visible={visible}
        maskClosable={false}
        onCancel={() => setVisible(false)}
        width={800}
        destroyOnClose={true}
        footer={
          <Space>
            <Button
              type={'primary'}
              onClick={async () => {
                const price = form.getFieldValue('price');

                if (price === 0) {
                  message.warning('价格为0,不需要退款!');
                  return;
                }

                Modal.confirm({
                  title: '退款',
                  content: `确定要为订单${pageData.orderNo}退款吗?`,
                  onOk: async () => {
                    if ('orderNo' in pageData && pageData.orderNo) {
                      const result = await handleBackMemberOrder(
                        pageData.orderNo,
                        price,
                        form.getFieldValue('refundReason'),
                      );

                      if (result.success) {
                        refreshTable();
                        setVisible(false);
                      }
                    }
                  },
                });
              }}
            >
              确认
            </Button>
            <Button onClick={() => setVisible(false)}>返回</Button>
          </Space>
        }
      >
        {isEmpty(pageData) ? (
          <DescriptionsSkeleton active />
        ) : (
          <>
            <ProForm
              form={form}
              submitter={false}
              layout={'horizontal'}
              initialValues={{
                backType: '0',
              }}
            >
              <ProFormDigit
                label={'退款金额'}
                name={'price'}
                width={'sm'}
                initialValue={pageData.price}
              />
              <ProFormText
                name="refundReason"
                label={'退款原因'}
                hidden={false}
                width={'sm'}
                initialValue={pageData?.refundReason}
              />
            </ProForm>
          </>
        )}
      </Modal>
    </>
  );
};

export { RebackMemberOrderPrice };
