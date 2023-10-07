import { DATE_TIME_FORMAT, genOptionsFromObj } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { genderRenderFromObj } from '@/utils/render';
import { WCardWarehouse } from '../../../../types/device/encrypted-card/write-card';
import { cardTypeObj, whiteCardStatusObj } from '@/utils/device/encrypted-card/card';

export const columns: ProColumns<WCardWarehouse.WCardWarehouseListItem>[] = [
  {
    title: '序列号',
    dataIndex: 'sequenceNo',
    key: 'sequenceNo',
    hideInSearch: false,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '设备类型',
    dataIndex: 'type',
    key: 'type',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
    valueType: 'select',
    fieldProps: { options: genOptionsFromObj(cardTypeObj) },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    hideInSearch: true,
    hideInTable: false,
    width: '5%',
    valueType: 'select',
    fieldProps: { options: genOptionsFromObj(whiteCardStatusObj) },
    render: (_, record) => {
      return genderRenderFromObj(whiteCardStatusObj, record.status);
    },
  },
  {
    title: '入库时间',
    dataIndex: 'inTime',
    key: 'inTime',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
    render: (text, record) => {
      return record.inTime && String(dayjs(record.inTime).format(DATE_TIME_FORMAT));
    },
  },

  {
    title: '出库时间',
    dataIndex: 'outTime',
    key: 'outTime',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
];
