import type { ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  createDateFormDateTimePicker,
  orderNoFormText,
  payStatusFormSelect,
} from '@/utils/columnUtils';
import { genderRenderFromObj } from '@/utils/render';
import { handleFetchPayTypeFromDictionary } from '@/utils/pay/pay';
import { genOptionsFromObj, trueFalseOptions } from '@/utils/utils';

export const memberOrderColumns: ProDescriptionsItemProps<MemberOrder.MemberOrderItem>[] = [
  orderNoFormText,
  {
    title: '支付费用',
    dataIndex: 'price',
    key: 'price',
    hideInSearch: true,
    hideInTable: false,
  },
  //@ts-ignore
  payStatusFormSelect,
  //@ts-ignore
  createDateFormDateTimePicker,

  {
    title: '支付方式',
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
  {
    title: '会员余额',
    dataIndex: 'balance',
    key: 'balance',
    hideInSearch: true,
    hideInTable: false,
  },
  {
    title: '会员状态',
    dataIndex: 'memberStatus',
    key: 'memberStatus',
    hideInSearch: true,
    hideInTable: false,
    valueType: 'select',
    render: (_, record) => {
      return genderRenderFromObj(trueFalseOptions('正常', '禁用'), record.memberStatus);
    },
    fieldProps: {
      options: genOptionsFromObj(trueFalseOptions('正常', '禁用')),
    },
  },
];
