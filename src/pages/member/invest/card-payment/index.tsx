import {
  ProCard,
  ProForm,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { MyPageHeader } from '@/components/MyPageHeader';
import { Button, Form, message, RadioChangeEvent } from 'antd';
import { useEffect, useState } from 'react';
import ShowMemberCardItem from '@/components/member/ShowMemberCardItem';
import { handleFetchMemberConfigDataByMemberId } from '@/utils/member/invest/invest';
import { useSearchParams } from '@umijs/max';
import { DepositMemberContext } from '@/pages/member/invest/card-payment/context';
import { InvestCard } from 'types/member/invest/invest';
import { basicRule } from '@/utils/utils';
import { handleDictionaryForPayType } from '@/utils/main/main/dictionary';
import { memberOrderPaymentClassnames } from '@/pages/member/member/order-list/components/MemberOrderPayment/styles';
import { rechargeRemake } from '@/utils/member/member/recharge';

const CardPayment = () => {
  const [searchParams] = useSearchParams();

  const { styles } = memberOrderPaymentClassnames();

  const initValue = {
    configId: '',
    detailType: '',
    price: 0,
    detailId: '',
  };

  const memberId = searchParams.get('memberId') || '';

  const [form] = Form.useForm();

  const typeOptions = ['充值', '购次', '续期'].map((item, index) => ({
    label: item,
    value: index + '',
  }));

  const [settingData, setSettingData] = useState<MemberCardConfigSetting.SaveSettingItem[]>([]);

  const [chooseRadioValue, setChooseRadioValue] = useState('');

  const [loading, setLoading] = useState(false);

  const [baseConfigInfo, setBaseConfigInfo] = useState<InvestCard.BaseConfigInfoParams>(initValue);

  const changeRadio = (e: RadioChangeEvent) => {
    setChooseRadioValue(e?.target?.value);
  };

  const initData = () => {
    setChooseRadioValue('');

    setBaseConfigInfo(initValue);
  };

  useEffect(() => {
    form.setFieldValue('price', baseConfigInfo.price + '元');
  }, [baseConfigInfo]);

  return (
    <>
      <ProCard>
        <MyPageHeader />

        <DepositMemberContext.Provider
          value={{ setChooseConfigInfo: setBaseConfigInfo, chooseConfigInfo: baseConfigInfo }}
        >
          <ProForm
            className={styles['base-form']}
            style={{ marginTop: 8, maxWidth: 1000, margin: 'auto' }}
            name="basic"
            form={form}
            layout={'horizontal'}
            initialValues={{
              type: '0',
            }}
            onFinish={async (values) => {
              await rechargeRemake({
                venueId: '',
                memberId,
                source: 'other',
                config: baseConfigInfo,
                action: () => {
                  return () => {
                    history.back();
                  };
                },
                payType: values.payType,
              });
            }}
            submitter={{
              render: (props, doms) => {
                return [doms[1]];
              },
            }}
          >
            <Form.Item
              label={'已选充值类型'}
              className={'simple-form-label'}
              colon={false}
            ></Form.Item>
            <ProFormGroup>
              <ProFormSelect name={'type'} options={typeOptions} />
              <Form.Item label={' '} colon={false}>
                <Button
                  type={'primary'}
                  onClick={async () => {
                    if (!memberId) {
                      message.warning('获取用户信息失败!');
                      return;
                    }

                    initData();

                    setLoading(true);

                    const type = form.getFieldValue('type');

                    const result = await handleFetchMemberConfigDataByMemberId(memberId, type);

                    if (result.success) {
                      setSettingData(result.data);
                    }

                    setLoading(false);
                  }}
                >
                  查询
                </Button>
              </Form.Item>
            </ProFormGroup>

            <ShowMemberCardItem
              loading={loading}
              settingData={settingData}
              chooseRadioValue={chooseRadioValue}
              changeRadio={changeRadio}
            />

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
        </DepositMemberContext.Provider>
      </ProCard>
    </>
  );
};

export default CardPayment;
