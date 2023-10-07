import {
  actPriceFormDigit,
  createDateFormDateTimePicker,
  depositFormDigit,
  payStatusFormSelect,
  priceFormDigit,
} from '@/utils/columnUtils';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { genderRenderFromObj } from '@/utils/render';
import { handleFetchPayTypeFromDictionary } from '@/utils/pay/pay';
import { raceSignUpStatusObj } from '@/utils/race/manage/race-arrange';

/**
 * 套餐订单退款
 */
export const backLessonComboColumns: ProDescriptionsItemProps<ComboOrder.ComboOrderItem>[] = [
  {
    title: '订单号',
    dataIndex: 'orderNo',
    key: 'orderNo',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  priceFormDigit,
  actPriceFormDigit,
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    hideInSearch: true,
    hideInTable: false,
    render: (_, record) => {
      return genderRenderFromObj(raceSignUpStatusObj, record.status);
    },
  },
  //@ts-ignore
  payStatusFormSelect,
  depositFormDigit,
  //@ts-ignore
  createDateFormDateTimePicker,
  {
    title: '付款方式',
    dataIndex: 'payType',
    key: 'payType',
    hideInSearch: true,
    hideInTable: false,
    valueType: 'select',
    request: async () => {
      const result = await handleFetchPayTypeFromDictionary();

      if (result.success) {
        return result.data;
      }

      return [];
    },
  },
];
