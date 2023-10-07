import { ticketDetailColumns } from '@/pages/menu33/order/columns';
import { ProTable } from '@ant-design/pro-components';
import type { FC } from 'react';
import { TicketsDetailTableProps } from './data';

const TicketsDetailTable: FC<TicketsDetailTableProps> = (props) => {
  const { data, set } = props;

  return (
    <ProTable
      columns={ticketDetailColumns}
      headerTitle={false}
      search={false}
      options={false}
      dataSource={data}
      pagination={false}
      scroll={{ x: 1398 }}
      onRow={() => {
        return {
          onClick: () => {
            set({});
          },
        };
      }}
    />
  );
};

export { TicketsDetailTable };
