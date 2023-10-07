import { createDateFormDateTimePicker, venueIdFormSelect } from '@/utils/columnUtils';
import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import { AreaStart } from 'types/area/start';
import { handleFetchPayTypeFromDictionary } from '@/utils/pay/pay';
import { genOptionsFromObj, trueFalseOptions } from '@/utils/utils';

export const orderColumns: ProDescriptionsItemProps<AreaStart.AreaStartItem>[] = [
  // @ts-ignore
  venueIdFormSelect,
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    hideInSearch: true,
    hideInTable: false,
    valueType: 'select',
    fieldProps: {
      options: genOptionsFromObj(trueFalseOptions('完成', '开场', 'green', 'blue')),
    },
  },
  {
    title: '订单价格',
    dataIndex: 'price',
    key: 'price',
    hideInSearch: true,
    hideInTable: false,
  },
  {
    title: '实际支付',
    dataIndex: 'actPrice',
    key: 'actPrice',
    hideInSearch: true,
    hideInTable: false,
  },
  {
    title: '扣除次数',
    dataIndex: 'actNum',
    key: 'actNum',
    hideInSearch: true,
    hideInTable: false,
  },
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
  createDateFormDateTimePicker,
];
