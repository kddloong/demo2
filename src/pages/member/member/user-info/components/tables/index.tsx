import { BuyCountMemberTable } from '@/pages/member/member/user-info/components/tables/buy-count';
import { ChargeMemberTable } from '@/pages/member/member/user-info/components/tables/charge';
import { ConsumeMemberTable } from '@/pages/member/member/user-info/components/tables/consume';
import { ContinueCardMemberTable } from '@/pages/member/member/user-info/components/tables/coutinue-card';
import { CutCountMemberTable } from '@/pages/member/member/user-info/components/tables/cut-count';
import { OpenCardMemberTable } from '@/pages/member/member/user-info/components/tables/open-card';
import { ProCard } from '@ant-design/pro-components';
import type { FC } from 'react';
import { useState } from 'react';
import { InvestMemberTable } from '@/pages/member/member/user-info/components/tables/invest-list';
import { MemberUserInfo } from '../../../../../../../types/member/member/user-info';

const { TabPane } = ProCard;

const MemberUserInfoTables: FC<MemberUserInfo.IBaseProps> = (props) => {
  const { memberId } = props;

  const [tab, setTab] = useState('invest-card');

  return (
    <>
      <ProCard title={'会员记录'}>
        <ProCard
          tabs={{
            tabPosition: 'top',
            activeKey: tab,
            onChange: (key) => {
              setTab(key);
            },
            type: 'card',
          }}
        >
          <TabPane key={'invest-card'} tab={'会员卡开卡记录'}>
            <OpenCardMemberTable memberId={memberId} />
          </TabPane>
          <TabPane key={'charge-card'} tab={'会员卡订单记录'}>
            <ChargeMemberTable memberId={memberId} />
          </TabPane>

          <TabPane key={'invest-list'} tab={'会员充值记录'}>
            <InvestMemberTable memberId={memberId} />
          </TabPane>
          <TabPane key={'consume'} tab={'消费记录'}>
            <ConsumeMemberTable memberId={memberId} />
          </TabPane>
          <TabPane key={'continue-card'} tab={'会员卡续期记录'}>
            <ContinueCardMemberTable memberId={memberId} />
          </TabPane>
          <TabPane key={'buy-count'} tab={'购次记录'}>
            <BuyCountMemberTable memberId={memberId} />
          </TabPane>

          <TabPane key={'cut-count'} tab={'扣次记录'}>
            <CutCountMemberTable memberId={memberId} />
          </TabPane>
        </ProCard>
      </ProCard>
    </>
  );
};

export { MemberUserInfoTables };
