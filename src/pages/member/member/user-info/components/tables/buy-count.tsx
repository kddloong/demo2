import { columns } from '@/pages/member/list/buy-count-list/columns';
import { ProTable } from '@ant-design/pro-components';
import type { FC } from 'react';
import { cardNoColumn } from '@/pages/member/member/user-info/components/tables/utils';
import { handleBuyCountList } from '@/utils/member/list/buy-count';
import { MemberUserInfo } from '../../../../../../../types/member/member/user-info';
import { clearPadding, hiddenToolBarConfig, pageSizeTen } from '@/utils/table';

const BuyCountMemberTable: FC<MemberUserInfo.MemberTableProps> = (props) => {
  const thisColumns = [cardNoColumn, ...columns];

  return (
    <ProTable
      rowKey="id"
      search={false}
      {...hiddenToolBarConfig}
      {...clearPadding}
      {...pageSizeTen}
      params={{
        memberId: props.memberId,
      }}
      request={async (params) => {
        return await handleBuyCountList({
          ...params,
          field: 'createDate',
          order: 'desc',
        });
      }}
      columns={thisColumns}
    />
  );
};
export { BuyCountMemberTable };
