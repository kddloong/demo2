import { childrenColumns, columns } from '@/pages/member/member/order-list/columns';
import { ProTable } from '@ant-design/pro-components';
import { clearPadding, hiddenToolBarConfig, pageSizeTen } from '@/utils/table';
import type { FC, Key } from 'react';
import { useState } from 'react';
import { cardNoColumn } from '@/pages/member/member/user-info/components/tables/utils';
import { MemberUserInfo } from 'types/member/member/user-info';
import { handleOrderList } from '@/utils/member/member/order';

const ChargeMemberTable: FC<MemberUserInfo.MemberTableProps> = (props) => {
  const [expandedRowKeys, setExpandedRowKeys] = useState<Key[]>([]);

  const thisColumns = [cardNoColumn, ...columns];

  function onExpand(expand: boolean, record: MemberOrder.OrderListItem) {
    if (expand) {
      setExpandedRowKeys([record.orderNo]);
    } else {
      setExpandedRowKeys([]);
    }
  }

  const expandedRowRender = (record: MemberOrder.OrderListItem) => {
    return (
      <ProTable
        columns={childrenColumns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={[record]}
        pagination={false}
      />
    );
  };

  return (
    <ProTable
      rowKey="orderNo"
      search={false}
      {...hiddenToolBarConfig}
      params={{
        memberId: props.memberId,
      }}
      request={async (params) => {
        return await handleOrderList({
          ...params,
          field: 'createDate',
          order: 'desc',
        });
      }}
      {...pageSizeTen}
      {...clearPadding}
      expandable={{ expandedRowRender, expandedRowKeys, onExpand }}
      columns={thisColumns}
    />
  );
};

export { ChargeMemberTable };
