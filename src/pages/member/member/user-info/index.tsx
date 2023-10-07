import { MemberCardList } from '@/pages/member/member/user-info/components/member-card-list';
import { ProCard } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Space } from 'antd';
import { MemberUserInfoTables } from './components/tables';
import { UserInfoDescription } from './components/user-info-description';
import { MyPageHeader } from '@/components/MyPageHeader';

const UserInfo = () => {
  const [searchParams] = useSearchParams();

  const memberId = searchParams.get('memberId');

  return (
    <>
      <Space direction={'vertical'}>
        <MyPageHeader />

        <ProCard title={'会员基本信息'}>
          <UserInfoDescription memberId={memberId as string} />
        </ProCard>

        <MemberCardList memberId={memberId as string} noChoseEffect={true} />

        <MemberUserInfoTables memberId={memberId as string} />
      </Space>
    </>
  );
};
export default UserInfo;
