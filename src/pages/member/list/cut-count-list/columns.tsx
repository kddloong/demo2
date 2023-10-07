import type { ProColumns } from '@ant-design/pro-components';
import { baseMemberPhoneNoColumns, phoneNoText } from '@/utils/columnUtils';
import { consumptionTypeOptions } from '@/utils/member/list/cut-count';

export const columns: ProColumns<CutCount.CutCountListItem>[] = [
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
    title: '消费次数',
    dataIndex: 'cutNumber',
    key: 'cutNumber',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '剩余次数',
    dataIndex: 'number',
    key: 'number',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '消费类型',
    dataIndex: 'consumptionType',
    key: 'consumptionType',
    hideInSearch: true,
    hideInTable: true,
    width: '10%',
    valueType: 'select',
    fieldProps: {
      options: consumptionTypeOptions,
    },
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
    ellipsis: true,
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
    dataIndex: 'cutTime',
    key: 'cutTime',
    hideInSearch: false,
    hideInTable: false,
    width: '13%',
    valueType: 'dateTimeRange',
    render: (_, record) => {
      return record.cutTime;
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
