import { MergeRequestTableParams } from '../../types/utils';
import { message } from 'antd';
import {
  deleteUploadFile,
  getUploadFileList,
  privateDownload,
  saveOrUpdateFileName,
} from '@/services/file';
import { File } from '../../types/file';

/**
 * 文件下载(私有下载)：预签名方式 生成临时访问url
 * @param key
 */
export const handlePrivateDownload = async (key: string) => {
  try {
    const result = await privateDownload(key);

    window.open(result);
  } catch (err) {}
};

/**
 * 已上传文件分页查询
 * @param params
 */
export const handleFetchUploadFileList = async (
  params: MergeRequestTableParams<{ relatedId: string }>,
) => {
  try {
    const result = await getUploadFileList(params);
    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {
        data: [],
        success: result.success,
      };
    }
  } catch (err) {
    return {
      data: [],
      success: false,
    };
  }
};

/**
 * 保存-修改已上传文件
 * @param params
 */
export const handleSaveOrUpdateFileName = async (params: File.FileInfo) => {
  try {
    const result = await saveOrUpdateFileName(params);
    if (result.success) {
      message.success(result.msg);
      return {
        success: result.success,
      };
    } else {
      message.warning(result.msg);
      return {
        success: result.success,
      };
    }
  } catch (err) {
    return {
      success: false,
    };
  }
};

/**
 * 删除已上传文件记录
 * @param ids
 */
export const handleDeleteUploadFile = async (ids: string) => {
  try {
    const result = await deleteUploadFile(ids);
    if (result.success) {
      message.success(result.msg);
      return {
        success: result.success,
      };
    } else {
      message.warning(result.msg);
      return {
        success: result.success,
      };
    }
  } catch (err) {
    return {
      success: false,
    };
  }
};
