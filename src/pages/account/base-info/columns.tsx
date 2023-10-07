import { handleDictionary } from '@/utils/main/main/dictionary';
import { whetherRender } from '@/utils/render';
import type { ProColumns } from '@ant-design/pro-components';
import { VenueBaseSetting } from 'types/account/base-info';

export const columns: ProColumns<VenueBaseSetting.VenueBaseSettingItem>[] = [
  {
    title: '场馆名称',
    dataIndex: 'name',
    key: 'name',
    width: 300,
    // ellipsis: true,
    hideInSearch: false,
  },
  {
    title: '场馆编号',
    dataIndex: 'venueNo',
    key: 'venueNo',
    width: 200,
    ellipsis: true,
    hideInSearch: true,
  },

  {
    title: '场馆类型',
    dataIndex: 'type',
    key: 'type',
    width: 150,
    ellipsis: true,
    valueType: 'select',
    hideInSearch: true,
    request: async () => {
      return await handleDictionary('venue_type');
    },
  },
  {
    title: '是否经营单位',
    dataIndex: 'isManager',
    key: 'isManager',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
    valueType: 'select',
    fieldProps: {
      options: [
        {
          value: '0',
          label: '否',
        },
        {
          value: '1',
          label: '是',
        },
      ],
    },
    render: (text, record) => {
      return whetherRender(record.isManager);
    },
  },
  {
    title: '是否运营单位',
    dataIndex: 'isOperate',
    key: 'isOperate',
    width: 150,
    ellipsis: true,
    hideInSearch: true,
    valueType: 'select',
    fieldProps: {
      options: [
        {
          value: '0',
          label: '否',
        },
        {
          value: '1',
          label: '是',
        },
      ],
    },
    render: (text, record) => {
      return whetherRender(record.isOperate);
    },
  },
  {
    title: '是否使用单位',
    dataIndex: 'isUsed',
    key: 'isUsed',
    hideInSearch: true,
    width: 150,
    ellipsis: true,
    valueType: 'select',
    fieldProps: {
      options: [
        {
          value: '0',
          label: '否',
        },
        {
          value: '1',
          label: '是',
        },
      ],
    },

    render: (text, record) => {
      return whetherRender(record.isUsed);
    },
  },
];
