import { InputNumber } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { Access } from '@umijs/max';
import { SellTicketSpace } from '../../../types/ticket/workplace';
import { ticketsSalesColumns } from '@/pages/menu33/workplace/components/VenueWorkPlace/columns';

const getTableColumns = (
  numFunc: (value: string, index: number) => void,
  optionFunc: (index: number) => void,
  access: string,
): ProColumns<SellTicketSpace.ShowChooseTicketItem>[] => {
  return [
    ...ticketsSalesColumns,
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
      hideInSearch: true,
      hideInTable: false,
      width: '25%',
      align: 'center',
      render: (_, row, index) => {
        return (
          <InputNumber
            type={'number'}
            min={0}
            precision={0}
            defaultValue={row.num}
            key={`${index}${new Date().getTime()}`}
            onChange={(value) => {
              numFunc(value as unknown as string, index);
            }}
          />
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      hideInTable: false,
      align: 'center',
      width: '25%',
      render: (_, row, index) => {
        return (
          <Access key={'delete'} accessible={!!access}>
            <a
              onClick={() => {
                optionFunc(index);
              }}
            >
              删除
            </a>
          </Access>
        );
      },
    },
  ];
};

export { getTableColumns };
