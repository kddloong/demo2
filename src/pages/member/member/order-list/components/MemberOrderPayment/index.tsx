import { ProForm, ProFormGroup, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { Form, Modal, Tag } from 'antd';
import { FC, useEffect, useState } from 'react';
import { TypeUtil } from 'types/utils';
import { useRequest } from 'ahooks';
import { handleFetchMemberOrderInfoById } from '@/utils/member/member/order';
import { memberOrderPaymentClassnames } from '@/pages/member/member/order-list/components/MemberOrderPayment/styles';
import { handleDictionaryForPayType } from '@/utils/main/main/dictionary';
import { bgObj } from '@/utils/member/setting/setting';
import { basicRule, NEGATIVE_STATUS as CASH_PAY, sendLog } from '@/utils/utils';
import { payToMemberOrderByCash } from '@/utils/pay/payToMemberOrder';
import { InvestCardTypeEnum } from '@/utils/enums';

type MemberOrderPaymentProps = TypeUtil.ModalBaseProps & {
  orderId: string;
};

const MemberOrderPayment: FC<MemberOrderPaymentProps> = (props) => {
  const { styles } = memberOrderPaymentClassnames();

  const { visible, setVisible, refresh, orderId } = props;

  const [orderInfo, setOrderInfo] = useState<MemberOrder.MemberOrderItem | null>(null);

  const [form] = Form.useForm();

  const { data } = useRequest(handleFetchMemberOrderInfoById, {
    defaultParams: [orderId],
  });

  useEffect(() => {
    const result = data;

    console.log(`result`, result?.data);

    if (result?.success) {
      const resultData = result?.data;

      form.setFieldsValue({ ...resultData, price: `${resultData?.price}元` });

      setOrderInfo(resultData);
    }
  }, [data]);

  return (
    <Modal
      open={visible}
      onCancel={() => {
        setVisible(false);
      }}
      destroyOnClose={true}
      onOk={async () => {
        await form?.submit();
      }}
      title={'支付'}
      width={600}
    >
      <ProForm
        form={form}
        layout={'horizontal'}
        labelCol={{ span: 4 }}
        labelAlign={'right'}
        initialValues={{
          type: '4',
        }}
        className={styles['base-form']}
        submitter={false}
        onFinish={async (values) => {
          if (orderInfo) {
            if (values.payType === CASH_PAY) {
              await payToMemberOrderByCash({
                venueId: orderInfo?.venueId,
                orderId: orderInfo?.id,
                price: orderInfo?.price,
                cardType: orderInfo?.type as InvestCardTypeEnum,
                finishPayCallback: () => {
                  refresh?.();
                  setVisible(false);
                },
              });
            }
          } else {
            sendLog(`未获取到orderId为${orderId}的订单数据`);
          }
        }}
      >
        <Form.Item label={'已选充值类型'} className={'simple-form-label'} colon={false}></Form.Item>

        <ProFormGroup>
          <Tag>储值卡</Tag>
        </ProFormGroup>

        <Form.Item label={'已选会员卡'} className={'simple-form-label'} colon={false}></Form.Item>

        <ProFormGroup>
          {/*todo 样式调整*/}
          <div className={styles['choose-card']} style={{ backgroundImage: bgObj[0] }}>
            123123
          </div>
        </ProFormGroup>

        <ProFormText name={'price'} label={'需要支付金额'} readonly />

        <ProFormRadio.Group
          name="payType"
          label="选择付款方式"
          rules={[{ ...basicRule, message: '请选择支付方式' }]}
          request={async () => {
            const result = await handleDictionaryForPayType();

            if (result) {
              return result.filter((item) => item.value !== '4');
            }

            return [];
          }}
        />
      </ProForm>
    </Modal>
  );
};

export default MemberOrderPayment;
