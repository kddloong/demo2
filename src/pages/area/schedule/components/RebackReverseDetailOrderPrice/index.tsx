import type { FC } from 'react';
import { useEffect } from 'react';
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
import { orderColumns } from './columns';
import { isEmpty } from '@/utils/utils';
import { TypeUtil } from 'types/utils';
import { useScanFetchDetailOrderInfo } from '@/hooks/useFetchDetailOrderInfo';
import { handleBackReverseDetailOrder } from '@/utils/area/schedule';

export interface BackReverseDetailOrderPriceProps {
  visible: boolean;
  setVisible: TypeUtil.SetState<boolean>;
  detailId: string;
  refreshTable: any;
}

/**
 * 预定订单子订单退款
 * @param props
 * @constructor
 */
const BackReverseDetailOrderPrice: FC<BackReverseDetailOrderPriceProps> = (props) => {
  const { visible, setVisible, detailId, refreshTable } = props;

  const [form] = Form.useForm();

  const detailOrderInfo = useScanFetchDetailOrderInfo(detailId, 'reverse', true);

  useEffect(() => {
    form.setFieldsValue({
      price: detailOrderInfo?.actPrice || 0,
    });
  }, [detailOrderInfo]);

  return (
    <>
      <Modal
        title={'预定订单退款'}
        open={visible}
        maskClosable={false}
        onCancel={() => setVisible(false)}
        width={1200}
        destroyOnClose={true}
        footer={
          <Space>
            <Button onClick={() => setVisible(false)}>返回</Button>

            <Button
              type={'primary'}
              onClick={async () => {
                if (!detailOrderInfo) {
                  console.warn(`无pageData`);
                  return;
                }

                Modal.confirm({
                  title: '退款',
                  content: `确定要退款吗?`,
                  onOk: async () => {
                    const price = form.getFieldValue('price');

                    if (detailOrderInfo?.actPrice === 0 && detailOrderInfo?.actNum === 0) {
                      message.warning('价格为0,不需要退款!');
                      return;
                    }

                    const refundReason = form.getFieldValue('refundReason');

                    /**
                     * 如果pageData里面的actNum的值大于0， 并且payType为4 ，就是用次数支付
                     */
                    const result = await handleBackReverseDetailOrder(
                      detailOrderInfo?.id || '',
                      detailOrderInfo.actNum,
                      price,
                      refundReason,
                    );

                    if (result.success) {
                      refreshTable();
                      setVisible(false);
                    }
                  },
                });
              }}
            >
              退款
            </Button>
          </Space>
        }
      >
        {detailOrderInfo && isEmpty(detailOrderInfo) ? (
          <DescriptionsSkeleton active />
        ) : (
          <>
            {/*@ts-ignore*/}
            <ProDescriptions columns={orderColumns} dataSource={detailOrderInfo} />

            <ProForm
              form={form}
              submitter={false}
              initialValues={{
                backType: '0',
              }}
            >
              {detailOrderInfo &&
              detailOrderInfo.actTotalPrice === 0 &&
              detailOrderInfo.actTotalNum > 0 ? (
                <></>
              ) : (
                <>
                  <ProFormRadio.Group
                    name={'backType'}
                    label={'退款方式'}
                    options={[
                      {
                        label: '全额退款',
                        value: '0',
                      },
                      {
                        label: '自定义退款',
                        value: '1',
                      },
                    ]}
                  />

                  <ProFormDependency name={['backType']}>
                    {({ backType }) => {
                      if (backType === '0') {
                        return (
                          <>
                            <ProFormDigit
                              label={'退款金额'}
                              name={'price'}
                              width={'sm'}
                              initialValue={detailOrderInfo?.actTotalPrice}
                              hidden
                            />
                            <ProFormText
                              name="refundReason"
                              label={'退款原因'}
                              hidden={false}
                              width={'sm'}
                            />
                          </>
                        );
                      }

                      if (backType === '1') {
                        return (
                          <>
                            <ProFormDigit
                              label={'退款金额'}
                              name={'price'}
                              width={'sm'}
                              initialValue={detailOrderInfo?.actTotalPrice}
                            />
                            <ProFormText
                              name="refundReason"
                              label={'退款原因'}
                              hidden={false}
                              width={'sm'}
                              initialValue={detailOrderInfo?.refundReason}
                            />
                          </>
                        );
                      }

                      return null;
                    }}
                  </ProFormDependency>
                </>
              )}
            </ProForm>
          </>
        )}
      </Modal>
    </>
  );
};

export { BackReverseDetailOrderPrice };
