import type { ProColumns } from '@ant-design/pro-components';
import { genderRenderFromObj } from '@/utils/render';
import { genOptionsFromObj } from '@/utils/utils';
import { memberTypeObj } from '@/utils/member/setting/setting';
import { handleFetchPayTypeFromDictionary } from '@/utils/pay/pay';
import { memberOrderStatusObj } from '@/utils/member/member/order';
import { baseMemberSearchColumns, phoneNoText } from '@/utils/columnUtils';

export const columns: ProColumns<MemberOrder.OrderListItem>[] = [
  {
    title: '用户编号',
    dataIndex: 'code',
    key: 'code',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '订单号',
    dataIndex: 'orderNo',
    key: 'orderNo',
    hideInSearch: false,
    hideInTable: false,
    width: '9%',
  },
  {
    title: '姓名',
    dataIndex: 'memName',
    key: 'memName',
    hideInSearch: false,
    hideInTable: false,
    width: '6%',
  },

  phoneNoText(),

  {
    title: '会员卡名称',
    dataIndex: 'configName',
    key: 'configName',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
    ellipsis: true,
  },
  {
    title: '会员卡类型',
    dataIndex: 'type',
    key: 'type',
    hideInSearch: true,
    hideInTable: false,
    width: '5%',
    valueType: 'select',
    render: (_, record) => {
      return genderRenderFromObj(memberTypeObj, record.type);
    },
  },
  {
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
    hideInSearch: true,
    hideInTable: false,
    width: '5%',
    valueType: 'select',
    fieldProps: { options: genOptionsFromObj(memberOrderStatusObj) },
    render: (_, record) => {
      return genderRenderFromObj(memberOrderStatusObj, record.status);
    },
  },
  {
    title: '支付金额',
    dataIndex: 'price',
    key: 'price',
    hideInSearch: true,
    hideInTable: false,
    width: '5%',
  },
  {
    title: '付款方式',
    dataIndex: 'payType',
    key: 'payType',
    hideInSearch: true,
    hideInTable: false,
    width: '5%',
    valueType: 'select',
    request: async () => {
      const result = await handleFetchPayTypeFromDictionary();

      return result.data;
    },
  },

  ...baseMemberSearchColumns,
  {
    title: '退款金额',
    dataIndex: 'refundPrice',
    key: 'refundPrice',
    hideInSearch: true,
    hideInTable: false,
    width: '7%',
    ellipsis: true,
  },
  {
    title: '退款原因',
    dataIndex: 'refundReason',
    key: 'refundReason',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
    ellipsis: true,
  },
  {
    title: '操作人',
    dataIndex: 'operateUser',
    key: 'operateUser',
    hideInSearch: true,
    hideInTable: false,
    width: '7%',
  },
  {
    title: '操作时间',
    dataIndex: 'orderTime',
    key: 'orderTime',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
];

const childrenColumns: ProColumns<MemberOrder.OrderListItem>[] = [
  {
    title: '充值金额',
    dataIndex: 'amount',
    key: 'amount',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '赠送金额',
    dataIndex: 'amountGive',
    key: 'amountGive',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },

  {
    title: '购买天数',
    dataIndex: 'day',
    key: 'day',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '赠送天数',
    dataIndex: 'dayGive',
    key: 'dayGive',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },

  {
    title: '购买次数',
    dataIndex: 'number',
    key: 'number',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '赠送次数',
    dataIndex: 'numberGive',
    key: 'numberGive',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
];

export { childrenColumns };
