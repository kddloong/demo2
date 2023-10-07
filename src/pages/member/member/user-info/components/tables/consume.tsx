import { columns } from '@/pages/member/list/consume-list/columns';
import { ProTable } from '@ant-design/pro-components';

import { clearPadding, hiddenToolBarConfig, pageSizeTen } from '@/utils/table';
import type { FC } from 'react';
import { cardNoColumn } from '@/pages/member/member/user-info/components/tables/utils';
import { MemberUserInfo } from '../../../../../../../types/member/member/user-info';
import { handleConsumeList } from '@/utils/member/list/consume';

const ConsumeMemberTable: FC<MemberUserInfo.MemberTableProps> = (props) => {
  const thisColumns = [cardNoColumn, ...columns];
  return (
    <ProTable
      rowKey="id"
      search={false}
      {...hiddenToolBarConfig}
      {...pageSizeTen}
      {...clearPadding}
      params={{
        memberId: props.memberId,
      }}
      request={async (params) => {
        return await handleConsumeList({
          ...params,
          field: 'createDate',
          order: 'desc',
        });
      }}
      columns={thisColumns}
    />
  );
};

export { ConsumeMemberTable };
