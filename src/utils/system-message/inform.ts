import { TypeUtil } from '../../../types/utils';
import { message } from 'antd';
import {
  getInformAudit,
  getInformList,
  readInform,
  readMessage,
} from '@/services/system-message/inform/inform';

/**
 * 企业通知列表
 * @param params
 */
export const handleFetchInformList = async (params: TypeUtil.RequestTableParams) => {
  try {
    const result = await getInformList(params);
    if (result.success) {
      return {
        success: true,
        data: result.data,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: [],
        total: 0,
      };
    }
  } catch (err) {
    return {
      success: false,
      data: [],
      total: 0,
    };
  }
};

/**
 * 读通知
 * @param id
 */
export const handleReadInformById = async (id: string) => {
  try {
    const result = await readInform(id);
    if (result.success) {
      return {
        success: true,
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
 * 读消息
 * @param id
 */
export const handleReadMessageById = async (id: string) => {
  try {
    const result = await readMessage(id);
    if (result.success) {
      return {
        success: true,
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
 * 通知跳转查询审核记录
 *
 * @param id
 */
export const handleFetchInformAudit = async (id: string) => {
  try {
    const result = await getInformAudit(id);
    if (result.success) {
      return {
        success: true,
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
