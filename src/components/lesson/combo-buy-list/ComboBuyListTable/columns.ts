import type { ProColumns } from '@ant-design/pro-components';
import { actPriceFormDigit, payStatusFormSelect } from '@/utils/columnUtils';
import { handleFetchPayTypeFromDictionary } from '@/utils/pay/pay';
import { comboOrderStatusOptions, comboOrderStatusRender } from '@/utils/lesson/combo/combo-order';

/**
 * 套餐订单表格列
 */
export const columns: ProColumns<ComboOrder.ComboOrderItem>[] = [
  {
    title: '订单号',
    dataIndex: 'orderNo',
    key: 'orderNo',
    hideInSearch: false,
    hideInTable: false,
    width: '11%',
  },
  {
    title: '套餐',
    dataIndex: 'comboName',
    key: 'comboName',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '课时数',
    dataIndex: 'classNum',
    key: 'classNum',
    hideInSearch: true,
    hideInTable: false,
    width: '5%',
  },
  {
    title: '购买人姓名',
    dataIndex: 'name',
    key: 'name',
    hideInSearch: true,
    hideInTable: false,
    width: '7%',
  },
  {
    title: '联系电话',
    dataIndex: 'phoneNo',
    key: 'phoneNo',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '微信昵称',
    dataIndex: 'nickName',
    key: 'nickName',
    hideInSearch: true,
    hideInTable: true,
    width: '10%',
  },

  {
    title: '订单时间',
    dataIndex: 'orderTime',
    key: 'orderTime',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    hideInSearch: false,
    hideInTable: false,
    width: '6%',
    valueType: 'select',
    fieldProps: {
      options: comboOrderStatusOptions,
    },
    render: (_, record) => {
      return comboOrderStatusRender(record.status);
    },
  },
  payStatusFormSelect as ProColumns,
  {
    title: '支付方式',
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

  {
    title: '订单金额',
    dataIndex: 'price',
    key: 'price',
    hideInSearch: true,
    hideInTable: false,
    width: '5%',
  },
  { ...actPriceFormDigit, width: '5%' },
  {
    title: '退款金额',
    dataIndex: 'refundPrice',
    key: 'refundPrice',
    hideInSearch: true,
    hideInTable: false,
    width: '5%',
  },
  {
    title: '退款理由',
    dataIndex: 'refundReason',
    key: 'refundReason',
    hideInSearch: true,
    hideInTable: false,
    width: '7%',
    ellipsis: true,
  },
  {
    title: '退款时间',
    dataIndex: 'refundTime',
    key: 'refundTime',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },

  {
    title: '套餐有效期',
    dataIndex: 'validFrom',
    key: 'validFrom',
    hideInSearch: true,
    hideInTable: false,
    width: '15%',
    render: (_, record) => {
      return `${record.validFrom} - ${record.validTo}`;
    },
  },
];
