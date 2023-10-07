import type {ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {handleGetVenueSelectData} from '@/utils/account/base-info';

/**
 * 复用表格中的列
 */
export const venueIdFormSelect: ProColumns | ProDescriptionsItemProps = {
  title: '场馆名称',
  dataIndex: 'venueId',
  key: 'venueId',
  hideInSearch: true,
  hideInTable: false,
  width: '9%',
  valueType: 'select',
  request: async () => {
    //可以查到场馆设置-场馆管理-场馆管理的所有数据
    return await handleGetVenueSelectData();
  },
};

export const createDateFormDateTimePicker = {
  title: '订单创建时间',
  dataIndex: 'createDate',
  key: 'createDate',
  hideInSearch: true,
  hideInTable: false,
  width: '7%',
};

export const priceFormDigit = {
  title: '费用',
  dataIndex: 'price',
  key: 'price',
  hideInSearch: true,
  hideInTable: false,
  width: '6%',
};



export const orderNoFormText = {
  title: '订单号',
  dataIndex: 'orderNo',
  key: 'orderNo',
  hideInSearch: false,
  hideInTable: false,
  width: '9%',
};



export const totalPriceFormDigit = {
  title: '订单总价',
  dataIndex: 'totalPrice',
  key: 'totalPrice',
  hideInSearch: true,
  hideInTable: false,
  width: '5%',
};


export const actTotalPriceFormDigit = {
  title: '实际价格',
  dataIndex: 'actTotalPrice',
  key: 'actTotalPrice',
  hideInSearch: true,
  hideInTable: false,
  width: '6%',
};

export const actPriceFormDigit = {
  title: '实际费用',
  dataIndex: 'actPrice',
  key: 'actPrice',
  hideInSearch: true,
  hideInTable: false,
  width: '6%',
};




export const baseMemberPhoneNoColumns: ProColumns = {
  title: '手机号',
  dataIndex: 'phoneNo',
  key: 'phoneNo',
  hideInSearch: false,
  hideInTable: true,
  width: '10%',
};

export const baseMemberSearchColumns: ProColumns[] = [
  baseMemberPhoneNoColumns,
  {
    title: '下单时间',
    dataIndex: 'time',
    key: 'time',
    hideInSearch: false,
    hideInTable: true,
    width: '1%',
    valueType: 'dateTimeRange',
    search: {
      transform: (value: any) => {
        return {
          timeFrom: value[0],
          timeTo: value[1],
        };
      },
    },
  },
];

