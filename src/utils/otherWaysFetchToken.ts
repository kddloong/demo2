import {
  bindEmail,
  bindPhone,
  bindQQ,
  bindWechat,
  qqLogin,
  validEmail,
  validPhone,
  wxLogin,
} from '@/services/ant-design-pro/api';
import { history } from '@@/core/history';
import { message } from 'antd';

const loginPath = '/user/login';

// 微信扫码登录
export const handleFetchCodeByWX = async (params: {
  client_id: string;
  client_secret: string;
  appId: string;
  code: string;
}) => {
  try {
    window.localStorage.clear();
    const msg = await wxLogin(params);
    return msg;
  } catch (error) {
    history.push(loginPath);
  }
  return undefined;
};

// QQ 扫码登录
export const handleFetchCodeByQQ = async (params: {
  client_id: string;
  client_secret: string;
  appId: string;
  code: string;
}) => {
  try {
    window.localStorage.clear();
    const msg = await qqLogin(params);
    return msg;
  } catch (error) {
    history.push(loginPath);
  }
  return undefined;
};

/**
 * 绑定微信
 * @param params
 */
export const handleBindWechat = async (params: { appId: string; code: string; id: string }) => {
  try {
    const result = await bindWechat(params);

    if (result.success) {
      // message.success(result.msg)
      return {
        success: result.success,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: null,
    };
  }
};

/**
 * 绑定QQ
 * @param params
 */
export const handleBindQQ = async (params: { appId: string; code: string; id: string }) => {
  try {
    const result = await bindQQ(params);

    if (result.success) {
      message.success(result.msg);
      return {
        success: result.success,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: null,
    };
  }
};

/**
 * 绑定手机 获取手机验证码
 * @param params
 */
export const handleValidPhone = async (params: { phoneNo: string }) => {
  try {
    const result = await validPhone(params);

    if (result.success) {
      message.success(result.msg);
      return {
        success: result.success,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: null,
    };
  }
};

/**
 * 绑定手机 验证手机验证码
 * @param params
 */
export const handleBindPhone = async (params: {
  validCode: string;
  phoneNo: string;
  userId: string;
}) => {
  try {
    const result = await bindPhone(params);

    if (result.success) {
      message.success(result.msg);
      return {
        success: result.success,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: null,
    };
  }
};

/**
 * 绑定邮箱 获取邮箱验证码
 * @param params
 */
export const handleValidEmail = async (params: { mailAddress: string }) => {
  try {
    const result = await validEmail(params);

    if (result.success) {
      message.success(result.msg);
      return {
        success: result.success,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: null,
    };
  }
};

/**
 * 绑定邮箱 验证验证码
 * @param params
 */
export const handleBindEmail = async (params: {
  validCode: string;
  mailAddress: string;
  userId: string;
}) => {
  try {
    const result = await bindEmail(params);

    if (result.success) {
      message.success(result.msg);
      return {
        success: result.success,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: null,
    };
  }
};
