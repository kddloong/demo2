import { trueFalseOptions } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { baseMemberSearchColumns, phoneNoText } from '@/utils/columnUtils';
import { genderRenderFromObj } from '@/utils/render';

export const columns: ProColumns<Invest.InvestListItem>[] = [
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
    title: '充值金额',
    dataIndex: 'chargeAmount',
    key: 'chargeAmount',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '赠送金额',
    dataIndex: 'chargeGive',
    key: 'chargeGive',
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
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    hideInSearch: true,
    hideInTable: true,
    width: '10%',
    valueType: 'select',
    render: (_, record) => {
      return genderRenderFromObj(trueFalseOptions('正常', '已取消'), record.status);
    },
  },
  {
    title: '充值场地名称',
    dataIndex: 'venueName',
    key: 'venueName',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
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
    dataIndex: 'chargeTime',
    key: 'chargeTime',
    hideInSearch: true,
    hideInTable: false,
    width: '13%',
  },
  ...baseMemberSearchColumns,
];
