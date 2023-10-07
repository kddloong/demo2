import { message } from 'antd';
import {
  currentAnnouncement,
  getAdminAnnouncementList,
  getAdminCurrentAnnouncement,
  getAnnouncementInfoById,
  getReadAnnounceUser,
  getWebAnnouncementList,
  getWebCurrentAnnouncement,
  readAnnouncement,
  saveAnnouncement,
} from '@/services/system-message/announcement/announcement';
import { Announcement } from '../../../types/system-message/announcement/announcement';
import { MergeRequestTableParams, TypeUtil } from '../../../types/utils';

/***
 * 首页公告
 */
export const handleFetchCurrentAnnouncement = async () => {
  try {
    const result = await currentAnnouncement();
    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  } catch (e) {
    return {
      success: false,
      data: null,
    };
  }
};

/**
 * 读公告
 * @param id
 */
export const handleReadAnnouncementById = async (id: string) => {
  try {
    const result = await readAnnouncement(id);
    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      return {
        success: false,
        data: null,
      };
    }
  } catch (e) {
    return {
      success: false,
      data: null,
    };
  }
};

/**
 * 发公告
 * @param params
 */
export const handleSaveAnnouncement = async (params: Announcement.AnnouncementParams) => {
  try {
    const result = await saveAnnouncement(params);
    if (result.success) {
      message.success(result.msg);
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (e) {
    return {
      success: false,
    };
  }
};

/**
 * 公告管理列表 - 平台
 * @param params
 */
export const handleFetchAdminAnnouncementList = async (params: TypeUtil.RequestTableParams) => {
  try {
    const result = await getAdminAnnouncementList(params);
    if (result.success) {
      return {
        success: true,
        data: result.data,
        total: result.count,
        code: result.code,
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
 * 公告管理列表 - 企业
 * @param params
 */
export const handleFetchWebAnnouncementList = async (params: TypeUtil.RequestTableParams) => {
  try {
    const result = await getWebAnnouncementList(params);
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

// 当前公告 - 企业
// 用于填充输入框
export const handleFetchWebCurrentAnnouncement = async () => {
  try {
    const result = await getWebCurrentAnnouncement();
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

// 当前公告 - 企业
// 用于填充输入框
export const handleFetchAdminCurrentAnnouncement = async () => {
  try {
    const result = await getAdminCurrentAnnouncement();
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
 * 公告阅读记录
 * @param params
 */
export const handleFetchReadAnnounceUser = async (
  params: MergeRequestTableParams<{ id: string }>,
) => {
  try {
    const result = await getReadAnnounceUser(params);
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
 * 查看公告详情
 * @param id
 */
export const handleFetchAnnouncementInfoById = async (id: string) => {
  try {
    const result = await getAnnouncementInfoById(id);
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
