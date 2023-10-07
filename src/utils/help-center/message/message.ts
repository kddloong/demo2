import {
  queryAfficheByID,
  queryAuditById,
  queryMessagesList,
  querySingleMessage,
  queryUnreadMessage,
  readAll,
  readMessage,
} from '@/services/help-center/message/message';
import { message } from 'antd';
import { MergeRequestTableParams } from '../../../../types/utils';

/**
 * 分页查询系统消息列表
 * @param params
 */
export const fetchMessageList = async (params: MergeRequestTableParams<{ type: string }>) => {
  try {
    const result = await queryMessagesList(params);
    if (result.success) {
      return {
        success: result.success,
        data: result.data,
        total: result.count,
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
 * 查询系统消息详情 (单个)
 * @param id
 */
export const getSingleMessageById = async (id: string) => {
  try {
    const result = await querySingleMessage(id);
    if (result.success) {
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
 * 一键已读
 */
export const handleReadAll = async () => {
  try {
    const result = await readAll();
    if (result.success) {
      message.success(result.msg);
      return {
        success: result.success,
      };
    } else {
      message.error(result.msg);
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
 * 查询未读消息
 */
export const handleFetchUnreadMessage = async () => {
  try {
    const result = await queryUnreadMessage();
    if (result.success) {
      return {
        success: result.success,
        data: result.data,
      };
    } else {
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
 * 将消息状态改为已读
 */
export const handleReadMessage = async (params: { ids: string }) => {
  try {
    const result = await readMessage(params);
    if (result.success) {
      // message.success(result.msg);
      return {
        success: result.success,
      };
    } else {
      message.error(result.msg);
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
 * 查询公告详情
 * @param id
 */
export const getAfficheById = async (id: string) => {
  try {
    const result = await queryAfficheByID(id);
    if (result.success) {
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
 * 查询审核记录
 * @param id
 */
export const getAuditRecordById = async (id: string) => {
  try {
    const result = await queryAuditById(id);
    if (result.success) {
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
 * 系统消息类型
 */
export class MessageClassType {
  // 消息
  static MESSAGE = '0';
  // 通知
  static NOTICE = '1';
  // 公告
  static ANNOUNCEMENT = '2';
}
