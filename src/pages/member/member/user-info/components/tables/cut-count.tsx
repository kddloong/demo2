import { columns } from '@/pages/member/list/cut-count-list/columns';
import { ProTable } from '@ant-design/pro-components';

import { clearPadding, hiddenToolBarConfig, pageSizeTen } from '@/utils/table';
import type { FC } from 'react';
import { cardNoColumn } from '@/pages/member/member/user-info/components/tables/utils';
import { handleCutCountList } from '@/utils/member/list/cut-count';
import { RequestTableParam } from '../../../../../../../types/utils';
import { MemberUserInfo } from '../../../../../../../types/member/member/user-info';

const CutCountMemberTable: FC<MemberUserInfo.MemberTableProps> = (props) => {
  const thisColumns = [cardNoColumn, ...columns];

  return (
    <ProTable
      rowKey="id"
      {...hiddenToolBarConfig}
      {...clearPadding}
      {...pageSizeTen}
      search={false}
      request={async (params) => {
        return await handleCutCountList({
          ...params,
          field: 'createDate',
          order: 'desc',
          memberId: props.memberId,
        } as RequestTableParam);
      }}
      columns={thisColumns}
    />
  );
};

export { CutCountMemberTable };
