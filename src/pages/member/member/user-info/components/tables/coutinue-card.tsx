import { columns } from '@/pages/member/list/continue-card-list/columns';
import { ProTable } from '@ant-design/pro-components';

import { clearPadding, hiddenToolBarConfig, pageSizeTen } from '@/utils/table';
import type { FC } from 'react';
import { cardNoColumn } from './utils';
import { handleContinueCardList } from '@/utils/member/list/continue-card';
import { MemberUserInfo } from '../../../../../../../types/member/member/user-info';

const ContinueCardMemberTable: FC<MemberUserInfo.MemberTableProps> = (props) => {
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
        return await handleContinueCardList({
          ...params,
          field: 'createDate',
          order: 'desc',
        });
      }}
      columns={thisColumns}
    />
  );
};

export { ContinueCardMemberTable };
