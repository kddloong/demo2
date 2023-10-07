import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { handleFetchInvestCardInfoByPhoneNoAndVenueId } from '@/utils/member/member/member';

type ExistingOrderInfoType = {
  orderId: string;
  signUpNo: string;
};

/**
 * 根据手机号 和 场地类型id 获取当前场馆的当前客户的会员卡信息
 * @param phone
 * @param venueId
 */
const useMemberInfoByPhoneNo = (phone: string, venueId: string) => {
  const [memberInfo, setMemberInfo] = useState({});

  useAsyncEffect(async () => {
    const result = await handleFetchInvestCardInfoByPhoneNoAndVenueId({
      venueId,
      param: phone,
    });

    if (result.success) {
      setMemberInfo(result.data);
    }
  }, []);

  return memberInfo;
};

export { useMemberInfoByPhoneNo, ExistingOrderInfoType };
