import type { ProColumns } from '@ant-design/pro-components';
import { genderRenderFromObj } from '@/utils/render';
import { genOptionsFromObj, sexOptions } from '@/utils/utils';
import { normalAndDisabledObj } from '@/utils/options';
import { MemberUser } from '../../../../../types/member/member/member';
import { renderPhysicalCardStatus } from '@/utils/member/member/member';

export const columns: ProColumns<MemberUser.MemberUserListItem>[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    hideInSearch: false,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
    valueType: 'select',
    fieldProps: { options: sexOptions },
  },

  {
    title: '会员状态',
    dataIndex: 'status',
    key: 'status',
    hideInSearch: true,
    hideInTable: false,
    width: '8%',
    valueType: 'select',
    fieldProps: { options: genOptionsFromObj(normalAndDisabledObj) },
    render: (_, record) => {
      return (
        <>
          {genderRenderFromObj(normalAndDisabledObj, record.status)}{' '}
          {(record.encryptionCardNo || record.physicalCardStatus) && (
            <>{renderPhysicalCardStatus(record.physicalCardStatus)}</>
          )}
        </>
      );
    },
  },
  {
    title: '序列号',
    dataIndex: 'encryptionCardNo',
    key: 'encryptionCardNo',
    hideInSearch: true,
    hideInTable: false,
    width: '9%',
  },
  {
    title: '手机号',
    dataIndex: 'phoneNo',
    key: 'phoneNo',
    hideInSearch: false,
    hideInTable: false,
    width: '10%',
    copyable: true,
  },
  {
    title: '已办会员卡',
    dataIndex: 'balance',
    key: 'balance',
    hideInSearch: true,
    hideInTable: false,
    width: '15%',
    ellipsis: true,
    render: (_, record) => {
      return `${record.balance} ${record.number} ${record?.expireDay || ''}`;
    },
  },
  {
    title: '最近活跃时间',
    dataIndex: 'lastLoginTime',
    key: 'lastLoginTime',
    hideInSearch: true,
    hideInTable: false,
    width: '16%',
  },
];
