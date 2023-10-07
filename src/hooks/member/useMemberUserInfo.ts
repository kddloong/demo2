import { useAsyncEffect } from 'ahooks';
import { useState } from 'react';
import { handleFetchMemberUserById } from '@/utils/member/member/member';
import { MemberUser } from '../../../types/member/member/member';

const useMemberUserInfo = (memberId: string, type: string) => {
  const [thisData, setThisData] = useState({});

  useAsyncEffect(async () => {
    if (type !== 'add') {
      const result = await handleFetchMemberUserById(memberId as string);

      if (result.success) {
        const resultData = result.data as MemberUser.MemberUserListItem;
        Object.assign(resultData, {
          avatarUrl: resultData?.avatarUrl
            ? [
                {
                  url: resultData?.avatarUrl,
                  uid: '1',
                  name: 'avatar',
                  status: 'done',
                },
              ]
            : [],
        });

        setThisData(resultData);
      } else {
        setThisData({});
      }
    }
  }, [memberId]);

  return thisData;
};

export { useMemberUserInfo };
