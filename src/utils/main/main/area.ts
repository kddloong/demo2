import { message } from 'antd';
import {
  addAreaData,
  fetchAreaDataById,
  fetchAreaList,
  getChildrenSelectData,
  getProvinceSelectData,
} from '@/services/main/main/area';
import { Area } from 'types/main/main/area';
import { RequestTableParam } from 'types/utils';
import { handleDeleteRowById } from '@/utils/deleteById';
import { CLIENT_VERSION as version } from '@/utils/utils';

/**
 * 处理获取的行政区域数据
 * @date 2022-01-03 15:13:05
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handleAreaList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await fetchAreaList(params);

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
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
 * 根据id获取当前节点的子数据
 * @param id
 * @returns {Promise<*[]|*>}
 */
export const handleAreaDataById = async (id: string) => {
  try {
    const result = await fetchAreaDataById(id);

    if (result.success) {
      message.success(result.msg);
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
 * 保存数据
 * @date 2022-01-05 15:49:12
 * @param data
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleAddAreaData = async (data: Area.AreaItem, id = '') => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await addAreaData(data, id);

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
 * 处理删除区域删除
 * @date 2022-01-05 16:01:29
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleDeleteAreaData = async (id: string) => {
  return await handleDeleteRowById(`/venue-service/${version}/cgs/area/${id}`);
};

/**
 * 处理获取的省级数据，用于Select
 * @date 2022-02-18 10:46:12
 *
 */
export const handleProvinceSelectData = async () => {
  try {
    const result = await getProvinceSelectData();

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

/**
 * 处理获取的市或区的数据，用于Select
 * @date 2022-02-17 10:50:51
 * @param id
 */
export const handleChildrenSelectData = async (id: string) => {
  try {
    const result = await getChildrenSelectData(id);

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
