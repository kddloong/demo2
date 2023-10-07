import { message } from 'antd';
import {
  getMessageGroupList,
  messageOff,
  messageOn,
} from '@/services/system-message/message/message';

/**
 * 消息分组列表
 */
export const handleFetchMessageGroupList = async () => {
  try {
    const result = await getMessageGroupList();
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
 * 用户打开消息接受
 * @param groupId
 */
export const handleMessageOn = async (groupId: string) => {
  try {
    const result = await messageOn(groupId);
    if (result.success) {
      message.success(result.msg);
      return {
        success: true,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
      };
    }
  } catch (err) {
    return {
      success: false,
    };
  }
};

/**
 * 用户关闭消息接受
 * @param groupId
 */
export const handleMessageOff = async (groupId: string) => {
  try {
    const result = await messageOff(groupId);
    if (result.success) {
      message.success(result.msg);
      return {
        success: true,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
      };
    }
  } catch (err) {
    return {
      success: false,
    };
  }
};
