import type { FC } from 'react';

interface IExpire {
  data: MemberCardConfigSetting.DetailCompleteItem;
}

const Expire: FC<IExpire> = (props) => {
  const { data } = props as { data: MemberCardConfigSetting.TimesItem };

  return (
    <>
      <p>
        {data.cardName} ({data.amount}元)
      </p>
      <p style={{ fontSize: '12px' }}>
        购买{data.days}天,赠送天数：{data.daysGive}天
      </p>
    </>
  );
};

export { Expire };
