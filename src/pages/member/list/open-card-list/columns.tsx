import type { ProColumns } from '@ant-design/pro-components';

export const columns: ProColumns<OpenCard.OpenCardItem>[] = [
  {
    title: '姓名',
    dataIndex: 'memName',
    key: 'memName',
    hideInSearch: false,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '手机号',
    dataIndex: 'phoneNo',
    key: 'phoneNo',
    hideInSearch: false,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '会员卡名称',
    dataIndex: 'configName',
    key: 'configName',
    hideInSearch: true,
    hideInTable: false,
    width: '12%',
  },

  {
    title: '开卡场地名称',
    dataIndex: 'venueName',
    key: 'venueName',
    hideInSearch: true,
    hideInTable: false,
    width: '13%',
  },
  {
    title: '操作人',
    dataIndex: 'operateUser',
    key: 'operateUser',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '操作时间',
    dataIndex: 'time',
    key: 'time',
    hideInSearch: false,
    hideInTable: false,
    width: '10%',
    valueType: 'dateTimeRange',
    render: (_, record) => {
      return record.time;
    },
    search: {
      transform: (value) => {
        return {
          timeFrom: value[0],
          timeTo: value[1],
        };
      },
    },
  },
];
