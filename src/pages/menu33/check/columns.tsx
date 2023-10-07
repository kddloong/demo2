import { createDateFormDateTimePicker, orderNoFormText } from '@/utils/columnUtils';
import type { ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { handleDictionary } from '@/utils/main/main/dictionary';
import { VenueCheck } from '../../../../types/ticket/check';

export const columns: ProColumns<VenueCheck.VenueCheckItem>[] = [
  { ...orderNoFormText, width: '12%' },
  {
    title: '订单名称',
    dataIndex: 'title',
    key: 'title',
    hideInSearch: true,
    hideInTable: true,
    width: '8%',
  },
  {
    title: '核销场地',
    dataIndex: 'xxxx',
    key: 'xxxx',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '核销方式',
    dataIndex: 'xxxx',
    key: 'xxxx',
    hideInSearch: false,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '核销人员',
    dataIndex: 'verificationUser',
    key: 'verificationUser',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },

  {
    title: '核销时间',
    dataIndex: 'verificationTime',
    key: 'verificationTime',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
    render: (text, record) => {
      return record.createDate && String(dayjs(record.createDate).format('YYYY-MM-DD HH:mm:ss'));
    },
  },

  {
    title: '联系方式',
    dataIndex: 'phoneNo',
    key: 'phoneNo',
    hideInSearch: false,
    hideInTable: false,
    width: '10%',
  },

  {
    title: '来源',
    dataIndex: 'source',
    key: 'source',
    hideInSearch: true,
    hideInTable: true,
    width: '10%',
    valueType: 'select',
    request: async () => {
      return await handleDictionary('order_source');
    },
  },

  { ...createDateFormDateTimePicker, width: '10%' },
];
