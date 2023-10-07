import { message } from 'antd';
import {
  deleteDiscountReason,
  endDiscountReason,
  getDiscountReason,
  getDiscountReasonDataById,
  getUsefulDiscountReason,
  saveDiscountReason,
  startDiscountReason,
} from '@/services/setting/base-setting/discount-reason';

/**
 * 处理获取的打折理由列表
 * @date 2021.12.26
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handleDiscountReason = async (params: DiscountReason.DiscountReasonDataParams) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getDiscountReason(params);

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
  } catch (err) {
    hide();

    return {};
  }
};

/**
 * 处理根据id获取打折理由
 * @data 2021.12.28
 * @param id
 * @returns {Promise<*[]|*>}
 */
export const handleDiscountReasonDataById = async (id: string) => {
  try {
    const result = await getDiscountReasonDataById(id);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    return {};
  }
};

/**
 * 处理提交打折理由
 * @date 2022-01-04 17:19:10
 * @param data
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleSaveDiscountReason = async (data: DiscountReason.DiscountReasonItem) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await saveDiscountReason(data);

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
 * 处理删除打折理由
 * @date 2022-01-04 17:20:23
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleDeleteDiscountReason = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteDiscountReason(id);

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
 * 处理启动打折理由操作
 * @date 2022-01-04 17:21:21
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleStartDiscountReason = async (id: string) => {
  const hide = message.loading('正在启用！');

  try {
    const result = await startDiscountReason(id);

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
 * 处理停用打折理由
 * @date 2022-01-04 17:22:16
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleEndDiscountReason = async (id: string) => {
  const hide = message.loading('正在停用！');

  try {
    const result = await endDiscountReason(id);

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
 * 处理获取的可用的打折理由
 * @date 2022-01-10 17:24:59
 * @returns {Promise<*[]|*>}
 */
export const handleGetUsefulDiscountReason = async () => {
  try {
    const result = await getUsefulDiscountReason();

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
