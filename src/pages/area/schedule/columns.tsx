import { handleDictionary } from '@/utils/main/main/dictionary';
import { actPriceFormDigit, priceFormDigit, venueIdFormSelect } from '@/utils/columnUtils';
import { DATE_FORMAT, trueFalseOptions } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { USE_ORDER } from '@/utils/ticket-and-reverse';
import { handleBookCancelReasonSelectData } from '@/utils/setting/base-setting/book-cancel-reason';
import { genderRenderFromObj, tagRender } from '@/utils/render';
import { reverseDetailOrderStatusOptions } from '@/utils/area-ant-ticket/options';
import { ReverseDetailOrder } from 'types/area/schedule';

/**
 * 2023-01-03 删除待评价
 */
export const statusFormSelect: ProColumns = {
  title: '订单状态',
  dataIndex: 'status',
  key: 'status',
  hideInSearch: false,
  hideInTable: false,
  width: 80,
  valueType: 'select',
  request: async () => {
    return await handleDictionary('changguan_order_status');
  },
  render: (text, record) => {
    if (
      [
        USE_ORDER.WILL_PAY_STATUS,
        USE_ORDER.WILL_VERIFY_STATUS,
        '5',
        USE_ORDER.FINISH_STATUS,
        USE_ORDER.VERIFIED_STATUS,
      ].includes(record.status)
    ) {
      let note = '';
      switch (record.status) {
        case USE_ORDER.WILL_VERIFY_STATUS:
          note = '待核销';
          break;
        case USE_ORDER.WILL_PAY_STATUS:
          note = '待付款';
          break;

        case USE_ORDER.VERIFIED_STATUS:
          note = '已核销';
          break;
        case USE_ORDER.FINISH_STATUS:
          note = '已完成';
          break;
        default:
          note = '';
      }

      return tagRender('green', note);
    } else if ([USE_ORDER.CANCEL_STATUS, USE_ORDER.BACK_PRICE_STATUS].includes(record.status)) {
      let note = '';
      switch (record.status) {
        case USE_ORDER.CANCEL_STATUS:
          note = '已取消';
          break;
        case USE_ORDER.BACK_PRICE_STATUS:
          note = '已退款';
          break;

        default:
          note = '';
      }
      return tagRender('red', note);
    } else {
      return tagRender('blue', '已核销');
    }
  },
};

export const scheduleDetailColumns: ProColumns<ReverseDetailOrder.OrderItem>[] = [
  { ...(venueIdFormSelect as ProColumns), title: '场地片区名称' },
  {
    title: '预定日期',
    dataIndex: 'bookDate',
    key: 'bookDate',
    hideInSearch: false,
    hideInTable: false,
    width: 60,
    render: (text, record) => {
      return record.bookDate && String(dayjs(record.bookDate).format(DATE_FORMAT));
    },
  },
  {
    title: '预定开始时间',
    dataIndex: 'bookTimeFrom',
    key: 'bookTimeFrom',
    hideInSearch: true,
    hideInTable: false,
    width: 60,
  },
  {
    title: '预定结束时间',
    dataIndex: 'bookTimeTo',
    key: 'bookTimeTo',
    hideInSearch: true,
    hideInTable: false,
    width: 60,
  },
  {
    ...statusFormSelect,
    width: 40,
    render: (_, record) => {
      return genderRenderFromObj(reverseDetailOrderStatusOptions, record.status);
    },
  },
  { ...priceFormDigit, title: '场地费用' },
  actPriceFormDigit,
  {
    title: '实际扣次',
    dataIndex: 'actNum',
    key: 'actNum',
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
    width: 120,
  },
  {
    title: '是否享受折扣',
    dataIndex: 'isDiscount',
    key: 'isDiscount',
    hideInSearch: true,
    hideInTable: false,
    width: 60,
  },
  {
    title: '折扣理由',
    dataIndex: 'discountId',
    key: 'discountId',
    hideInSearch: true,
    hideInTable: false,
    width: 120,
  },
  {
    title: '取消理由',
    dataIndex: 'cancelReasonId',
    key: 'cancelReasonId',
    hideInSearch: true,
    hideInTable: false,
    width: 120,
    valueType: 'select',
    request: async () => {
      return await handleBookCancelReasonSelectData();
    },
  },
  {
    title: '退款状态',
    dataIndex: 'refundStatus',
    key: 'refundStatus',
    hideInSearch: true,
    hideInTable: true,
    width: 50,
    render: (_, record) => {
      return genderRenderFromObj(
        trueFalseOptions('已退款', '未退款', 'blue', 'green'),
        record?.refundStatus,
      );
    },
  },
  {
    title: '退款金额',
    dataIndex: 'refundAmount',
    key: 'refundAmount',
    hideInSearch: true,
    hideInTable: true,
    width: 50,
  },
  {
    title: '已退次数',
    dataIndex: 'refundNum',
    key: 'refundNum',
    hideInSearch: true,
    hideInTable: true,
    width: 50,
  },
  {
    title: '退款原因',
    dataIndex: 'refundReason',
    key: 'refundReason',
    hideInSearch: true,
    hideInTable: true,
    width: 120,
    ellipsis: true,
  },
];
