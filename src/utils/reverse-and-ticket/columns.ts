import { ProColumns } from '@ant-design/pro-components';
import {
  actTotalPriceFormDigit,
  orderNoFormText,
  totalPriceFormDigit,
  venueIdFormSelect,
} from '@/utils/columnUtils';
import { trueFalseOptions } from '@/utils/utils';
import { handleDictionary } from '@/utils/main/main/dictionary';
import { orderStatusFormSelect } from '@/utils/reverse-and-ticket/reverse-and-ticket';
import { genderRenderFromObj } from '@/utils/render';
import { UseOrder } from '../../../types/reverse-and-ticket/UseOrder';

const columns = (
  source?: 'page' | 'list',
  type: 'reverse' | 'ticket' = 'reverse',
): ProColumns<UseOrder.UseOrderItem>[] => {
  return [
    { ...(venueIdFormSelect as ProColumns), title: '场地项目名称', width: 100 },
    { ...orderNoFormText, hideInSearch: false, width: 156 },
    {
      ...orderStatusFormSelect(type),
      width: 90,
    },
    { ...totalPriceFormDigit, title: '订单价格', width: 90 },
    { ...actTotalPriceFormDigit, title: '实际支付', width: 90 },
    {
      title: '实际扣次',
      dataIndex: 'actTotalNum',
      key: 'actTotalNum',
      hideInSearch: true,
      hideInTable: false,
      width: 90,
    },
    {
      title: '会员卡名称',
      dataIndex: 'cardName',
      key: 'cardName',
      hideInSearch: true,
      hideInTable: false,
      width: 140,
    },
    {
      title: '是否享受折扣',
      dataIndex: 'isDiscount',
      key: 'isDiscount',
      hideInSearch: true,
      hideInTable: false,
      width: 110,
    },
    {
      title: '折扣理由',
      dataIndex: 'discountId',
      key: 'discountId',
      hideInSearch: true,
      hideInTable: false,
      width: 150,
    },
    {
      title: '支付方式',
      dataIndex: 'payType',
      key: 'payType',
      hideInSearch: true,
      hideInTable: false,
      width: 90,
      valueType: 'select',
      request: async () => {
        return await handleDictionary('changguan_pay_type');
      },
    },

    {
      title: '订单来源',
      dataIndex: 'source',
      key: 'source',
      hideInSearch: true,
      hideInTable: false,
      width: 96,
      valueType: 'select',
      request: async () => {
        return await handleDictionary('order_source');
      },
    },
    {
      title: '退款状态',
      dataIndex: 'refundStatus',
      key: 'refundStatus',
      hideInSearch: true,
      hideInTable: false,
      width: 90,
      render: (_, record) => {
        return genderRenderFromObj(
          trueFalseOptions('已退款', '未退款', 'blue', 'green'),
          record?.refundStatus,
        );
      },
    },
    {
      title: '退款金额',
      dataIndex: 'totalRefundAmount',
      key: 'totalRefundAmount',
      hideInSearch: true,
      hideInTable: false,
      width: 80,
    },
    {
      title: '已退次数',
      dataIndex: 'totalRefundNum',
      key: 'totalRefundNum',
      hideInSearch: true,
      hideInTable: false,
      width: 80,
    },
    {
      title: '退款原因',
      dataIndex: 'refundReason',
      key: 'refundReason',
      hideInSearch: true,
      hideInTable: false,
      width: 156,
      ellipsis: true,
    },
    {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
      hideInSearch: true,
      hideInTable: false,
      width: 90,
      ellipsis: true,
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhoneNo',
      key: 'contactPhoneNo',
      hideInSearch: false,
      hideInTable: false,
      width: 100,
    },
    {
      title: '身份证号',
      dataIndex: 'cardNo',
      key: 'cardNo',
      hideInSearch: true,
      hideInTable: true,
      width: 150,
    },
    {
      title: '创建人',
      dataIndex: 'createName',
      key: 'createName',
      hideInSearch: true,
      hideInTable: false,
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      hideInSearch: true,
      hideInTable: false,
      width: 156,
    },
    {
      title: '更新人',
      dataIndex: 'updateName',
      key: 'updateName',
      hideInSearch: true,
      hideInTable: false,
      width: 120,
    },
    {
      title: '更新时间',
      dataIndex: 'updateDate',
      key: 'updateDate',
      hideInSearch: true,
      hideInTable: false,
      width: 156,
    },
  ];
};

export { columns as reverseAndTicketColumns };
