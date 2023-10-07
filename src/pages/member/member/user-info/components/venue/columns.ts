import { handleDictionary } from '@/utils/main/main/dictionary';
import { trueOrFalseOptions } from '@/utils/options';
import { genOptionsFromObj } from '@/utils/utils';

const columns = [
  {
    title: '场馆名称',
    dataIndex: 'name',
    key: 'name',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '场馆编号',
    dataIndex: 'venueNo',
    key: 'venueNo',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
    span: 2,
  },
  // {
  //   title: '是否支持低免开放',
  //   dataIndex: 'isUseFree',
  //   key: 'isUseFree',
  //   hideInSearch: true,
  //   hideInTable: false,
  //   width: '10%',
  //   valueType: 'select',
  //   fieldProps: { options: genOptionsFromObj(trueOrFalseOptions) },
  // },
  {
    title: '场馆类型',
    dataIndex: 'type',
    key: 'type',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
    span: 2,
    valueType: 'select',
    request: async () => {
      return await handleDictionary('venue_type');
    },
  },
  {
    title: '详细地址',
    dataIndex: 'address',
    key: 'address',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
    span: 3,
  },
];

export { columns as userInfoVenueColumns };
