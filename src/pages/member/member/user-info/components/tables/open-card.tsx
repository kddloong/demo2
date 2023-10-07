import { columns } from '@/pages/member/list/open-card-list/columns';
import { ProTable } from '@ant-design/pro-components';
import { clearPadding, hiddenToolBarConfig, pageSizeTen } from '@/utils/table';
import type { FC } from 'react';
import { cardNoColumn } from '@/pages/member/member/user-info/components/tables/utils';
import { handleOpenCardList } from '@/utils/member/list/open-card';
import { MemberUserInfo } from '../../../../../../../types/member/member/user-info';

/**
 * 个人的开卡记录
 * @param props
 * @constructor
 */
const OpenCardMemberTable: FC<MemberUserInfo.MemberTableProps> = (props) => {
  const thisColumns = [cardNoColumn, ...columns];

  return (
    <ProTable
      rowKey="id"
      search={false}
      {...hiddenToolBarConfig}
      params={{
        memberId: props.memberId,
      }}
      request={async (params) => {
        return await handleOpenCardList({
          ...params,
          field: 'createDate',
          order: 'desc',
        });
      }}
      {...clearPadding}
      {...pageSizeTen}
      columns={thisColumns}
    />
  );
};

export { OpenCardMemberTable };
