import { columns as InfoCol } from '@/pages/member/member/user-list/columns';
import { ProColumns, ProDescriptions } from '@ant-design/pro-components';
import type { FC } from 'react';
import React from 'react';
import { MemberUserInfo } from 'types/member/member/user-info';
import { fetchMemberUserById } from '@/services/member/member/member';
import { Avatar, Divider, Space } from 'antd';
import { MemberUser } from '../../../../../../../types/member/member/member';

const UserInfoDescription: FC<MemberUserInfo.IBaseProps> = (props) => {
  const { memberId } = props;

  const columns: ProColumns<MemberUser.MemberUserListItem>[] = [
    ...InfoCol,

    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      hideInSearch: false,
      hideInTable: false,
      width: '10%',
      copyable: true,
    },
    {
      title: '会员民族',
      dataIndex: 'nation',
      key: 'nation',
      hideInSearch: false,
      hideInTable: false,
      width: '10%',
      copyable: true,
    },
    {
      title: '籍贯',
      dataIndex: 'nativePlace',
      key: 'nativePlace',
      hideInSearch: false,
      hideInTable: false,
      width: '10%',
      copyable: true,
    },

    {
      title: '学历',
      dataIndex: 'educationBackground',
      key: 'educationBackground',
      hideInSearch: false,
      hideInTable: false,
      width: '10%',
      copyable: true,
    },

    {
      title: '毕业院校',
      dataIndex: 'graduateSchool',
      key: 'graduateSchool',
      hideInSearch: false,
      hideInTable: false,
      width: '10%',
      copyable: true,
    },

    {
      title: '兴趣爱好',
      dataIndex: 'interest',
      key: 'interest',
      hideInSearch: false,
      hideInTable: false,
      width: '10%',
      copyable: true,
    },
    {
      title: '婚姻状况',
      dataIndex: 'matrimony',
      key: 'matrimony',
      hideInSearch: false,
      hideInTable: false,
      width: '10%',
      copyable: true,
    },
  ];

  return (
    <div style={{ textAlign: 'center' }}>
      <Space size={'large'}>
        <Avatar
          shape={'square'}
          size={104}
          src={'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
        />
        <Divider />
        <ProDescriptions
          request={async () => {
            return await fetchMemberUserById(memberId);
          }}
          // @ts-ignore
          columns={columns}
          column={3}
          contentStyle={{
            maxWidth: 130,
          }}
        />
      </Space>
    </div>
  );
};

export { UserInfoDescription };
