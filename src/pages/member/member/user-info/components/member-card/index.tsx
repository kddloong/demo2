import type { FC } from 'react';
import './style.css';
import { CheckOutlined } from '@ant-design/icons';
import { TypeUtil } from 'types/utils';
import { MemberUserInfo } from 'types/member/member/user-info';
import { InvestCardTypeEnum } from '@/utils/enums';

interface IMemberCard {
  name: string;
  value: string;
  label: string;
  background: string;
  clickCard?: TypeUtil.SetState<MemberUserInfo.BaseUserInfoItem | undefined>;
  card: MemberUserInfo.BaseUserInfoItem;

  chooseStatus: any;
}

const MemberCard: FC<IMemberCard> = (props) => {
  const { name, value, label, background = '#57aaf8', clickCard, card, chooseStatus } = props;

  return (
    <>
      <div
        className={'card'}
        style={{ backgroundColor: background }}
        onClick={() => clickCard?.(card as MemberUserInfo.BaseUserInfoItem)}
      >
        <div className={'name-box'}>
          {name}
          {chooseStatus?.value === value && chooseStatus?.name === name && (
            <div className={'show'}>
              <CheckOutlined />
            </div>
          )}
        </div>
        <div className={'value'}>
          {card.type === InvestCardTypeEnum.STORE_CARD
            ? `折扣:${card.sales === 0 ? 100 : card.sales}%`
            : ''}{' '}
          {label}:{value}
        </div>
      </div>
    </>
  );
};

export { MemberCard };
