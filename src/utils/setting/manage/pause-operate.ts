import { message } from 'antd';
import {
  addPauseOperate,
  deletePauseOperate,
  fetchPauseOperateById,
  getPauseOperateList,
} from '@/services/setting/manage/pause-operate';
import { RequestTableParam } from 'types/utils';
import { PauseOperate } from '../../../../types/setting/manage/pause-operate';

/**
 * 处理获取的使用设置列表
 * @date 2022-01-05 10:03:44
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handlePauseOperateList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getPauseOperateList(params);

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
      return [];
    }
  } catch (err) {
    hide();

    return [];
  }
};

/**
 * 处理删除使用设置
 * @date 2022-04-28 17:20:51
 * @param id
 */
export const handleDeletePauseOperate = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deletePauseOperate(id);

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
 * 处理根据id获取使用设置
 * @date 2022-01-05 10:05:08
 * @param id
 * @returns {Promise<{}|*>}
 */
export const handleFetchPauseOperateById = async (id: string) => {
  try {
    const result = await fetchPauseOperateById(id);

    if (result.success) {
      return { data: result.data, success: true };
    } else {
      message.warning(result.msg);
      return { data: null, success: false };
    }
  } catch (err) {
    return { data: null, success: false };
  }
};

/**
 * 处理编辑使用设置操作
 * @date 2022-01-05 10:06:23
 * @param data
 * @returns {Promise<boolean>}
 */
export const handleAddPauseOperate = async (data: PauseOperate.PauseOperateItem) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await addPauseOperate(data);

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
