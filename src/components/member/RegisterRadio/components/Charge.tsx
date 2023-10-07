import type { FC } from 'react';
import { moneyText } from '@/utils/utils';

interface ICharge {
  data: MemberCardConfigSetting.DetailCompleteItem;
}

const Charge: FC<ICharge> = (props) => {
  const { data } = props as { data: MemberCardConfigSetting.ChargeDataItem };

  return (
    <>
      <p>{moneyText(data)}</p>

      <p style={{ fontSize: '12px' }}>
        {data?.amountGive ? <>赠送: {data.amountGive}元</> : ''}
        {data?.sales ? <>, 消费折扣: {data.sales}%</> : ''}
      </p>
    </>
  );
};

export { Charge };
