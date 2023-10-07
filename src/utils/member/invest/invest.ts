import { message } from 'antd';
import { PAY_PAUSE } from '@/utils/utils';
import {
  createCountOrder,
  createExpireOrder,
  createStoreOrder,
  fetchCurrentEntityCardIsUse,
  fetchIsNeedUploadFace,
  fetchMemberConfigDataByMemberId,
  fetchMemberConfigDataByVenueId,
  fetchMemberConfigDataByVenueIdAndId,
  fetchMemberConfigSelectDataByVenueId,
  openCard,
  payInvestCardOrder,
  saveMemberUserInfo,
} from '@/services/member/invest/invest';
import { MemberUser } from 'types/member/member/member';
import { InvestCard } from 'types/member/invest/invest';
import { InvestCardTypeEnum } from '@/utils/enums';

/**
 * 保存会员基本信息
 * @param data
 * @param hideMessage
 */
export const handleSaveMemberUser = async (
  data: MemberUser.SaveMemberUserInfo,
  hideMessage: boolean = false,
) => {
  const hide = message.loading('正在保存!');

  try {
    const result = await saveMemberUserInfo(data);

    hide();
    if (result.success) {
      if (!hideMessage) {
        message.success(result.msg);
      }

      return { data: result.data, success: true };
    } else {
      message.warning(result.msg);
      return { data: result.data, success: false };
    }
  } catch (err) {
    hide();

    return { data: '', success: false };
  }
};

/**
 * @author sssss
 * @param venueId
 */
export const handleFetchMemberConfigSelectDataByVenueId = async (venueId: string) => {
  try {
    const result = await fetchMemberConfigSelectDataByVenueId(venueId);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * @author sssss
 * @param venueId
 */
export const handleFetchMemberConfigDataByVenueId = async (venueId: string) => {
  try {
    const result = await fetchMemberConfigDataByVenueId(venueId);

    if (result.success) {
      return {
        success: result.success,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: [],
      };
    }
  } catch (err) {
    return {
      success: false,
      data: [],
    };
  }
};

/**
 * @description 根据场馆id 和 会员卡配置id 获取可用的卡种
 * @author sssss
 * @param venueId 场馆id
 * @param id configId
 */
export const handleFetchMemberConfigDataByVenueIdAndId = async (venueId: string, id: string) => {
  try {
    const result = await fetchMemberConfigDataByVenueIdAndId(venueId, id);

    if (result.success) {
      return {
        success: result.success,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: [],
      };
    }
  } catch (err) {
    return {
      success: false,
      data: [],
    };
  }
};

/**
 * 开卡操作
 * @param data
 * @param hideMessage
 */
export const handleOpenCard = async (
  data: InvestCard.BaseOpenCardParams,
  hideMessage: boolean = false,
  hideSuccessMessage: boolean = false,
) => {
  const hide = hideMessage
    ? (() => {
        return () => {};
      })()
    : message.loading('正在提交开卡信息!');

  try {
    const result = await openCard(data);

    hide();

    if (result.success) {
      if (!hideSuccessMessage) {
        message.success(result.msg);
      }

      return {
        success: true,
        data: [],
        msg: '',
      };
    } else {
      return {
        success: false,
        data: result.data,
        msg: result.msg,
      };
    }
  } catch (err) {
    hide();

    return {
      success: false,
      data: [],
      msg: '',
    };
  }
};

/**
 * 创建 储值卡充值订单
 * @param params
 * @param hideMessage
 */
export const handleCreateStoreOrder = async (
  params: InvestCard.CreateStoreOrderParams,
  hideMessage: boolean,
) => {
  const hide = hideMessage
    ? (() => {
        return () => {};
      })()
    : message.loading('正在创建订单！');

  try {
    const result = await createStoreOrder(params);

    hide();

    if (result.success) {
      if (!hideMessage) {
        message.success(result.msg);
      }

      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    hide();

    return { success: false, data: {} };
  }
};

/**
 * 创建 期限卡充值订单
 * @param params
 * @param hideMessage
 */
export const handleCreateExpireOrder = async (
  params: InvestCard.CreateExpireOrderParams,
  hideMessage: boolean,
) => {
  const hide = hideMessage
    ? (() => {
        return () => {};
      })()
    : message.loading('正在创建订单！');

  try {
    const result = await createExpireOrder(params);

    hide();

    if (result.success) {
      if (!hideMessage) {
        message.success(result.msg);
      }
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    hide();

    return { success: false, data: {} };
  }
};

/**
 * 创建 计次卡充值订单
 * @param params
 * @param hideMessage
 */
export const handleCreateCountOrder = async (
  params: InvestCard.CreateCountOrderParams,
  hideMessage: boolean,
) => {
  const hide = hideMessage
    ? (() => {
        return () => {};
      })()
    : message.loading('正在创建订单！');

  try {
    const result = await createCountOrder(params);

    hide();

    if (result.success) {
      if (!hideMessage) {
        message.success(result.msg);
      }
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    hide();

    return { success: false, data: {} };
  }
};

/**
 * 支付会员卡充值订单
 * @param params
 */
export const handlePayInvestCardOrder = async (params: InvestCard.PayOrderParams) => {
  try {
    const result = await payInvestCardOrder(params);

    if (result.success) {
      if (result.data?.wx_message !== PAY_PAUSE) {
        message.success(result.msg);
      }
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: null };
    }
  } catch (err) {
    return { success: false, data: null };
  }
};

/**
 * 获取当前场馆是否配置人脸设备, 如果返回是, 需要上传
 * @date 2022-12-19
 * @author ssss
 */
export const handleFetchIsNeedUploadFace = async () => {
  try {
    const result = await fetchIsNeedUploadFace();

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: false };
    }
  } catch (err) {
    return { success: false, data: false };
  }
};

/**
 * 判断当前实体卡是否已绑定会员
 * @param cardNo
 */
export const handleFetchCurrentEntityCardIsUse = async (cardNo: string) => {
  try {
    const result = await fetchCurrentEntityCardIsUse(cardNo);

    if (result.success) {
      if (result.data === '0') {
        message.warning('该实体卡已存在会员信息!');
      }

      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: '' };
    }
  } catch (err) {
    return { success: false, data: '' };
  }
};

/**
 * @description 根据会员id获取已办理的会员卡及其套餐
 * @author sssss
 * @param memberId 会员id
 * @param type 会员卡套餐
 */
export const handleFetchMemberConfigDataByMemberId = async (
  memberId: string,
  type: InvestCardTypeEnum,
) => {
  try {
    const result = await fetchMemberConfigDataByMemberId(memberId, type);

    if (result.success) {
      return {
        success: result.success,
        data: result.data || [],
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: [],
      };
    }
  } catch (err) {
    return {
      success: false,
      data: [],
    };
  }
};
