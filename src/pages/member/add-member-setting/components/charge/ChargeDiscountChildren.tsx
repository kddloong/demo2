import { basicRule } from '@/utils/utils';
import { ProFormDigit, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import { MemberSettingBasicRule } from '@/utils/member/setting/setting';

const IsChargeDiscountCom = () => (
  <ProFormGroup>
    <ProFormDigit
      name={'amountGive'}
      fieldProps={{
        addonAfter: '元',
      }}
      width={150}
      min={0}
      rules={[basicRule]}
      label={'赠送金额'}
    />
  </ProFormGroup>
);

const ChargeDiscountChildren = (props: {
  isChargeDiscount: string;
  isConsumeDiscount: string;
  isLevel: string;
}) => {
  const { isChargeDiscount, isConsumeDiscount, isLevel } = props;

  return (
    <>
      <ProFormGroup>
        <ProFormDigit
          rules={[basicRule]}
          fieldProps={{
            addonAfter: '元',
          }}
          width={150}
          min={0}
          name={'amount'}
          label={'充值金额'}
        />

        {isChargeDiscount === '1' && <IsChargeDiscountCom />}
        {isConsumeDiscount === '1' && (
          <ProFormDigit
            tooltip={'百分制, 如想要打八折, 输入80'}
            width={150}
            fieldProps={{
              addonAfter: '%',
            }}
            min={0}
            max={100}
            name="sales"
            label={'折扣'}
            rules={MemberSettingBasicRule}
          />
        )}
        {isLevel === '1' && (
          <ProFormText
            rules={MemberSettingBasicRule}
            width={150}
            name={'levelName'}
            label={'等级名称'}
          />
        )}
      </ProFormGroup>
    </>
  );
};

export { ChargeDiscountChildren };
