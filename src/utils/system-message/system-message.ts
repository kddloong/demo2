import { MergeRequestTableParams } from '../../../types/utils';
import { message } from 'antd';
import {
  getSystemMessageAnnouncementList,
  getSystemMessageDetail,
  getSystemMessageList,
  getSystemMessageNoticeList,
  readAll,
  readMessage,
  unreadDiffMessageCount,
  unreadSystemMessageCount,
} from '@/services/system-message/system-message';
import { removeHtmlTags } from '@/utils/utils';

/**
 * 分页查询系统消息列表
 * @param params
 */
export const handleFetchSystemMessageList = async (
  params: MergeRequestTableParams<{ type: string }>,
) => {
  try {
    const result = await getSystemMessageList(params);
    if (result.success) {
      return {
        success: true,
        data: result.data.map((item) => {
          return {
            ...item,
            content: removeHtmlTags(item.content),
          };
        }),
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
 * 分页系统消息列表 -  公告列表
 * @param params
 */
export const handleFetchSystemMessageAnnouncementList = async (
  params: MergeRequestTableParams<{ type: string }>,
) => {
  try {
    const result = await getSystemMessageAnnouncementList(params);
    if (result.success) {
      return {
        success: true,
        data: result.data.map((item) => {
          return {
            ...item,
            content: removeHtmlTags(item.content),
          };
        }),
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
 * 分页系统消息列表 -  通知列表
 * @param params
 */
export const handleFetchSystemMessageNoticeList = async (
  params: MergeRequestTableParams<{ type: string }>,
) => {
  try {
    const result = await getSystemMessageNoticeList(params);
    if (result.success) {
      return {
        success: true,
        data: result.data.map((item) => {
          return {
            ...item,
            content: removeHtmlTags(item.content),
          };
        }),
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
 * 读消息
 * @param id
 */
export const handleReadMessage = async (id: string) => {
  try {
    const result = await readMessage(id);
    if (result.success) {
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
 * 一键已读
 * @param type
 * 0 ===> 消息类一键已读
 * 1 ===> 通知类一键已读
 * 2 ===> 公告类一键已读
 * 不传 ===> 全部一键已读
 */
export const handleReadAll = async (type?: string) => {
  try {
    const result = await readAll(type);
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
 * 查询未读消息条数
 * @param params
 */
export const handleFetchUnreadSystemMessageCount = async (params: { type: string }) => {
  try {
    const result = await unreadSystemMessageCount(params);
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

/**
 * 查询系统消息详情
 * @param id
 */
export const handleFetchSystemMessageDetail = async (id: string) => {
  try {
    const result = await getSystemMessageDetail(id);
    if (result.success) {
      message.success(result.msg);
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
 * 查询各类型未读消息条数
 * @param
 */
export const handleFetchUnreadDiffMessageCount = async () => {
  try {
    const result = await unreadDiffMessageCount();
    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return { success: false, data: null };
    }
  } catch (err) {
    return { success: false, data: null };
  }
};
