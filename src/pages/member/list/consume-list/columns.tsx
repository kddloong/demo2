import type { ProColumns } from '@ant-design/pro-components';
import { baseMemberPhoneNoColumns, phoneNoText } from '@/utils/columnUtils';

export const columns: ProColumns<Consume.ConsumeListItem>[] = [
  {
    title: '订单号',
    dataIndex: 'orderNo',
    key: 'orderNo',
    hideInSearch: false,
    hideInTable: false,
    width: '12%',
  },
  {
    title: '会员姓名',
    dataIndex: 'memName',
    key: 'memName',
    hideInSearch: false,
    hideInTable: false,
    width: '8%',
  },
  phoneNoText(),
  {
    title: '消费金额',
    dataIndex: 'consumeAmount',
    key: 'consumeAmount',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '剩余金额',
    dataIndex: 'amount',
    key: 'amount',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '会员卡名称',
    dataIndex: 'configName',
    key: 'configName',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },

  {
    title: '充值场地名称',
    dataIndex: 'venueName',
    key: 'venueName',
    hideInSearch: true,
    hideInTable: false,
    width: '15%',
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
    dataIndex: 'consumeTime',
    key: 'consumeTime',
    hideInSearch: false,
    hideInTable: false,
    width: '13%',
    valueType: 'dateTimeRange',
    render: (_, record) => {
      return record.consumeTime;
    },
    search: {
      transform: (value: any) => {
        return {
          timeFrom: value[0],
          timeTo: value[1],
        };
      },
    },
  },

  baseMemberPhoneNoColumns,
];
