import { message } from 'antd';
import {
  actionBookCancelReasonStatus,
  deleteCancelReason,
  getBookCancelReasonSelectData,
  getCancelReason,
  getCancelReasonDataById,
  saveCancelReason,
} from '@/services/setting/base-setting/book-cancel-reason';
import { ChangeStatus, RequestTableParam } from 'types/utils';
import { BookCancelReason } from 'types/setting/base-setting/book-cancel-reason';

/**
 * 处理获取的预订取消理由列表
 * @date 2022-01-05 09:18:21
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handleCancelReasonList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getCancelReason(params);

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.error(result.msg);
      return {};
    }
  } catch (err) {
    hide();

    return {};
  }
};

/**
 * 处理根据id获取预订取消理由
 * @data 2022-01-05 09:18:59
 * @param id
 * @returns {Promise<*[]|*>}
 */
export const handleCancelReasonDataById = async (id: string) => {
  try {
    const result = await getCancelReasonDataById(id);

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
 * 处理保存预订取消理由操作
 * @date 2022-01-05 09:20:31
 * @param data
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleSaveCancelReason = async (data: BookCancelReason.BookCancelReasonItem) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await saveCancelReason(data);

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
 * 处理删除预订取消理由操作
 * @date 2022-01-05 09:21:31
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleDeleteCancelReason = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteCancelReason(id);

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
 * 处理获取的预订取消理由的下拉框数据
 * @date 2022-01-19 10:51:38
 * @returns {Promise<*[]|*>}
 */
export const handleBookCancelReasonSelectData = async () => {
  try {
    const result = await getBookCancelReasonSelectData();

    if (result.success) {
      return [...result.data, { value: 'other', label: '其他' }];
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 修改预定取消理由状态
 * @param id
 * @param action
 */
export const handleActionBookCancelReasonStatus = async (id: string, action: ChangeStatus) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await actionBookCancelReasonStatus(id, action);

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
