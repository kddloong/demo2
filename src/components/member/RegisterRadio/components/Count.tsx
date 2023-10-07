import type { FC } from 'react';

interface ICount {
  data: MemberCardConfigSetting.DetailCompleteItem;
}

const Count: FC<ICount> = (props) => {
  const { data } = props as { data: MemberCardConfigSetting.NumberItem };

  return (
    <>
      <p>
        {data.cardName} ({data.amount}元)
      </p>
      <p style={{ fontSize: '12px' }}>
        购买{data.number}次,赠送次数：{data.numberGive}次
      </p>
    </>
  );
};

export { Count };
