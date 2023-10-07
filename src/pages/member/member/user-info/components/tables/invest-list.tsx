import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { columns as userListColumns } from '@/pages/member/list/invest-list/columns';
import type { FC } from 'react';
import { useRef } from 'react';
import { clearPadding, hiddenToolBarConfig, pageSizeTen } from '@/utils/table';
import { cardNoColumn } from './utils';
import { handleInvestList } from '@/utils/member/list/invest';
import { MemberUserInfo } from '../../../../../../../types/member/member/user-info';

/**
 * 充值记录列表
 * @constructor
 */
const InvestMemberTable: FC<MemberUserInfo.MemberTableProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<Invest.InvestListItem>[] = [cardNoColumn, ...userListColumns];

  return (
    <ProTable
      actionRef={actionRef}
      rowKey="id"
      search={false}
      {...pageSizeTen}
      {...clearPadding}
      {...hiddenToolBarConfig}
      params={{
        memberId: props.memberId,
      }}
      request={async (params) => {
        return await handleInvestList({
          ...params,
          field: 'createDate',
          order: 'desc',
        });
      }}
      columns={columns}
    />
  );
};

export { InvestMemberTable };
