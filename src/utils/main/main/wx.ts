import { message } from 'antd';
import { tagRender } from '@/utils/render';
import { RequestTableParam } from 'types/utils';
import {
  bindWeChatUser,
  cancelBinding,
  findWxManageUserByPhoneNo,
  getMyWechatBinding,
  getWxManageUserList,
} from '@/services/main/main/wx';
import { WechatUser } from '../../../../types/main/main/wx';

/**
 * 处理获取的数据
 * @date 2021.12.26
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleWxManageUserList = async (
  params: RequestTableParam & WechatUser.WeChatUserManageParams,
) => {
  const hide = message.loading('正在获取数据');

  try {
    const result = await getWxManageUserList(params);

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.data.length,
      };
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (e) {
    return {};
  }
};

/**
 * 获取根据手机号查找到的用户信息
 * @param phoneNo
 * @returns {Promise<{}>}
 */
export const handleFindWxManageUserByPhoneNo = async (phoneNo: string) => {
  try {
    const result = await findWxManageUserByPhoneNo(phoneNo);

    if (result.success) {
      if (result.data) {
        return result.data;
      } else {
        message.warning(result.msg);
        return {};
      }
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    return {};
  }
};

/**
 * 处理获取关于当前账号的微信绑定情况
 * @date 2022-02-48 14:41:08
 * @returns {Promise<boolean|*>}
 */
export const handleMyWechatBinding = async () => {
  try {
    const result = await getMyWechatBinding();

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
 * 处理绑定微信管理端小程序
 * @date 2022-02-17 16:20:02
 * @param id
 */
export const handleBindWeChatUser = async (id: string) => {
  const hide = message.loading('正在绑定！');

  try {
    const result = await bindWeChatUser(id);

    hide();

    if (result.success) {
      message.success(`绑定成功`);
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
 * 取消绑定管理端小程序的操作
 * @date 2022-02-25 10:23:41
 * @param id
 */
export const handleCancelBinding = async (id: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await cancelBinding(id);

    hide();

    if (result.success) {
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

export const bindStatusRender = (sysUserId: string) => {
  if (sysUserId) {
    return tagRender('green', '已绑定');
  }

  return tagRender('red', '未绑定');
};
