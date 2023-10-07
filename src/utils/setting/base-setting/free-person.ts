import { message } from 'antd';
import { CLIENT_VERSION as version, NEGATIVE_STATUS } from '@/utils/utils';
import { handleDeleteRowById } from '@/utils/deleteById';
import {
  getFreePerson,
  getFreePersonDataById,
  getStartFreePerson,
  saveFreePerson,
} from '@/services/setting/base-setting/free-person';
import { RequestTableParam } from 'types/utils';
import { FreePerson } from '../../../../types/setting/base-setting/free-person';

/**
 * 处理获取的打折理由列表
 * @date 2021.12.26
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handleFreePerson = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getFreePerson(params);

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
export const handleFreePersonDataById = async (id: string) => {
  try {
    const result = await getFreePersonDataById(id);

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
export const handleSaveFreePerson = async (data: FreePerson.FreePersonItem) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await saveFreePerson(data);

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
export const handleDeleteFreePerson = async (id: string) => {
  return await handleDeleteRowById(`/venue-service/${version}/cgs/free/person/${id}`);
};

/**
 * 处理获取的启用的低免人群
 * @date 2022-01-06 20:51:43
 * @returns {Promise<*[]|*>}
 */
export const handleGetStartFreePerson = async (type: string = NEGATIVE_STATUS) => {
  try {
    const result = await getStartFreePerson(type);

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
