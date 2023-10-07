import { message } from 'antd';
import {
  cancelOccupyDetailOrder,
  cancelOccupyOrder,
  getOccupyDetailList,
  getOccupyList,
  createOccupyOrder,
} from '@/services/area/occupy';
import { CreateOccupyOrder } from '../../../types/area-and-ticket/occupy';
import { AreaOccupy } from '../../../types/area/occupy';

/**
 * 处理获取的占用订单
 * @date 2022-01-17 09:55:41
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleOccupyList = async (params: AreaOccupy.AreaOccupyDataParams) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getOccupyList(params);

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
 * 处理取消场地占用订单
 * @date 2022-01-18 21:27:15
 * @param id
 * @param reason
 * @param reasonId
 * @returns {Promise<boolean>}
 */
export const handleCancelAreaOccupyOrder = async (id: string, reason: string, reasonId: string) => {
  const hide = message.loading('正在取消！');

  try {
    const result = await cancelOccupyOrder(id, reason, reasonId);

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
 * 处理获取的占用明细订单
 * @date 2022-01-17 09:55:41
 * @param id
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleOccupyDetailList = async (id: string) => {
  if (!id) {
    return;
  }

  const hide = message.loading('正在获取数据！');

  try {
    const result = await getOccupyDetailList(id);

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
      return { success: false, data: [] };
    }
  } catch (err) {
    hide();

    return { success: false, data: [] };
  }
};

/**
 * 处理取消场地占用明细订单
 * @date 2022-01-18 21:27:15
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleCancelAreaOccupyDetailOrder = async (id: string) => {
  const hide = message.loading('正在取消！');

  try {
    const result = await cancelOccupyDetailOrder(id);

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
 * 处理创建占用订单
 * @date 2022-05-23
 * @param data
 */
export const handleCreateOccupyOrder = async (data: CreateOccupyOrder.CreateOccupyOrderItem) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await createOccupyOrder(data);

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
