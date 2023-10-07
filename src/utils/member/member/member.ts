import {message} from 'antd';
import {splitByType} from '@/utils/member/member/user-info';
import {
  balanceConsumption,
  deleteMemberUser,
  executeEntityCardAction,
  fetchInvestCardInfoByPhoneNoAndVenueId,
  fetchInvestCardInfoByPhoneNoAndVenueIdNew,
  fetchMemberInfoByParams,
  fetchMemberUserById,
  getCookieRestTime,
  getMemberUserList,
  getReadCardListSelect,
  saveEntityCardConfig,
  searchUserInfoByPhoneNo,
  updateFace,
} from '@/services/member/member/member';
import {Member, MemberUser} from 'types/member/member/member';
import {RequestTableParam} from 'types/utils';

/**
 * 处理获取的数据
 * @date 2021.12.26
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleMemberUserList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据');

  try {
    const result = await getMemberUserList(params);

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (e) {
    message.error(`get /mem/member/list fail`);
    return {};
  }
};

/**
 * @author sssss
 * @param id
 */
export const handleDeleteMemberUser = async (id: string) => {
  const hide = message.loading('正在删除!');

  try {
    const result = await deleteMemberUser(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};
/**
 * 处理 实体会员卡操作
 * @param data
 * @param type
 */
export const handleExecuteEntityCardAction = async (
  data: MemberUser.EntityCardActionParams,
  type: MemberUser.EntityCardActionType,
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await executeEntityCardAction(data, type);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    hide();

    return { success: false };
  }
};



/**
 * 更新人脸
 * @param data
 */
export const handleUpdateFace = async (data: MemberUser.UpdateFaceParams) => {
  try {
    const result = await updateFace(data);

    if (result.success) {
      message.success(result.msg);
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    return { success: false };
  }
};

/**
 * 根据 卡号, 加密卡号, 手机号 获取 会员基本信息
 * @param params
 */
export const handleGetMemberInfoByParams = async (
  params: string,
  hideInMessage: boolean = false,
) => {
  try {
    const result = await fetchMemberInfoByParams(params);

    if (result.success) {
      if (!result.data && !hideInMessage) {
        message.warning(result.msg);
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
 * 根据id获取会员信息
 * @author sssss
 * @param id
 */
export const handleFetchMemberUserById = async (id: string) => {
  try {
    const result = await fetchMemberUserById(id);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};

/**
 * 会员卡余额支付
 * @param data
 * @param hideMessage
 */
export const handleBalanceConsumption = async (
  data: MemberUser.BalanceConsumptionParams,
  hideMessage: boolean = false,
) => {
  const hide = hideMessage
    ? (() => {
        return () => {};
      })()
    : message.loading('正在提交！');

  try {
    const result = await balanceConsumption(data);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true, data: null };
    } else {
      message.warning(result.msg);
      return { success: false, data: null };
    }
  } catch (err) {
    hide();

    return { success: false, data: null };
  }
};

/**
 * 根据(手机号或者会员编号)和 场馆id 获取当前会员可用的会员卡
 * @param data
 */
export const handleFetchInvestCardInfoByPhoneNoAndVenueId = async (
  data: Member.SearchInvestCardInfoParams,
) => {
  try {
    const result = await fetchInvestCardInfoByPhoneNoAndVenueId(data);

    if (result.success) {
      if (!result.data) {
        message.warning(result.msg);
      }

      return {
        success: true,
        data: !result.data ? {} : { ...result.data, ...splitByType(result.data) },
      };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};

/**
 * 根据(手机号或者会员编号)和 场馆id 获取当前会员可用的会员卡
 * @param data
 */
export const handleFetchInvestCardInfoByPhoneNoAndVenueIdNew = async (
  data: Member.SearchInvestCardInfoParams,
) => {
  try {
    const result = await fetchInvestCardInfoByPhoneNoAndVenueIdNew(data);

    if (result.success) {
      if (!result.data) {
        message.warning('会员在当前场馆无可用会员卡!');
      }

      if (result.data?.length === 0) {
        message.warning('会员在当前场馆无可用会员卡!');
      }

      return {
        success: true,
        data:
          result.data?.length > 0
            ? result.data.map((item) => {
                return {
                  ...item,
                  ...splitByType(item),
                };
              })
            : [],
      };
    } else {
      message.warning(result.msg);

      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 根据手机号查询会员信息
 * @param phone
 */
export const handleSearchUserInfoByPhoneNo = async (phone: string) => {
  const hide = message.loading('查询中!');
  try {
    const result = await searchUserInfoByPhoneNo(phone);

    hide();

    if (result.success) {
      if (result.data) {
        message.success('系统已经查询出会员信息');
      } else {
        message.warning('该手机号暂未注册会员');
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
 * 读卡器设备下拉框显示
 */
export const handleFetchReadCardListSelect = async () => {
  try {
    const result = await getReadCardListSelect();
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 同步企业读卡器配置
 * @param params
 */
export const handleSaveEntityCardConfig = async (params: MemberUser.EntityConfigParams) => {
  try {
    const result = await saveEntityCardConfig(params);
    if (result.success) {
      // message.success(result.msg);
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    return { success: false };
  }
};

/**
 * 查看读卡器配置的cookie剩余时间
 *
 * 调同步企业读卡器配置这个接口时，服务器会存入调该接口的时间，
 * 服务器设置一个固定的有效期，比如300天，以倒计时的形式在这个接口里返回，
 * 用户每次进入系统都会调该接口，如果倒计时小于0则需要重新存储cookie，
 * （后台设置的有效期必须与要比本地cookie的有效期时间短）
 */
export const handleFetchCookieRestTime = async () => {
  try {
    const result = await getCookieRestTime();
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: null };
    }
  } catch (err) {
    return { success: false, data: null };
  }
};
