import { genOptionsFromObj, trueFalseOptions } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { genderRenderFromObj } from '@/utils/render';
import { baseMemberPhoneNoColumns, phoneNoText } from '@/utils/columnUtils';

export const columns: ProColumns<ContinueCard.ContinueCardItem>[] = [
  {
    title: '订单号',
    dataIndex: 'orderNo',
    key: 'orderNo',
    hideInSearch: false,
    hideInTable: false,
    width: '12%',
  },
  {
    title: '姓名',
    dataIndex: 'memName',
    key: 'memName',
    hideInSearch: false,
    hideInTable: false,
    width: '8%',
  },
  phoneNoText(),
  {
    title: '购买天数',
    dataIndex: 'continueDay',
    key: 'continueDay',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '赠送天数',
    dataIndex: 'dayGive',
    key: 'dayGive',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '到期时间',
    dataIndex: 'expireDay',
    key: 'expireDay',
    hideInSearch: true,
    hideInTable: false,
    width: '6%',
  },
  {
    title: '会员卡名称',
    dataIndex: 'name',
    key: 'name',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },

  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    hideInSearch: true,
    hideInTable: true,
    width: '4%',
    valueType: 'select',
    fieldProps: {
      options: genOptionsFromObj(trueFalseOptions('正常', '已取消')),
    },
    render: (_, record) => {
      return genderRenderFromObj(trueFalseOptions('正常', '已取消'), record.status);
    },
  },
  {
    title: '充值场地名称',
    dataIndex: 'venueName',
    key: 'venueName',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },

  {
    title: '操作人',
    dataIndex: 'operateUser',
    key: 'operateUser',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
  },
  {
    title: '操作时间',
    dataIndex: 'continueTime',
    key: 'continueTime',
    hideInSearch: false,
    hideInTable: false,
    width: '13%',
    valueType: 'dateTimeRange',
    render: (_, record) => {
      return record.continueTime;
    },
    search: {
      transform: (value: any) => {
        return {
          timeFrom: value[0],
          timeTo: value[1],
        };
      },
    },
  },
  baseMemberPhoneNoColumns,
];
