import {
  deleteReceiptModel,
  fetchReceiptModelList,
  getReceiptModelById,
  saveReceiptModel,
} from '@/services/setting/receipt/model';
import { RequestTableParam } from 'types/utils';
import { message } from 'antd';
import { ReceiptModel } from '../../../../types/setting/receipt/model';

/**
 * 获取小票模板列表
 * @param params
 */
export const handleFetchReceiptModelList = async (params: RequestTableParam) => {
  try {
    const result = await fetchReceiptModelList(params);
    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};
/**
 * 根据id获取小票模板
 * @param id
 */
export const handleFetchReceiptModelById = async (id: string) => {
  try {
    const result = await getReceiptModelById(id);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};
/**
 * 保存小票模板信息
 * @param params
 */
export const handleSaveReceiptModel = async (params: ReceiptModel.ModelItem) => {
  const hide = message.loading('正在保存！');

  try {
    const result = await saveReceiptModel(params);

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

/**
 * 删除小票模板
 * @param id
 */
export const handleDeleteReceiptModel = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteReceiptModel(id);

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
