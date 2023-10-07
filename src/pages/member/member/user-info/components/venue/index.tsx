import { getBaseBase } from '@/services/account/base-info';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { userInfoVenueColumns } from './columns';

/**
 * 获取场馆信息
 * @constructor
 */
const UserInfoVenueInfo = () => {
  return (
    <ProCard title={'场馆信息'}>
      <ProDescriptions
        request={async () => {
          return await getBaseBase();
        }}
        columns={userInfoVenueColumns}
      />
    </ProCard>
  );
};

export { UserInfoVenueInfo };
