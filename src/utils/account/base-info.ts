import { message } from 'antd';
import {
  deleteVenueData,
  getBaseBase,
  getVenueDataById,
  getVenueSelectData,
  getVenueTree,
  getVenueTreeAnon,
  saveVenueBaseData,
} from '@/services/account/base-info';
import { BaseBaseSetting } from 'types/account/base-info';

/**
 * 处理获取当前场地的信息
 * @date 2022-01-04 13:48:46
 * @param id
 * @returns {Promise<{}|*>}
 */
export const handleGetVenueDataById = async (id: string) => {
  try {
    const result = await getVenueDataById(id);

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
 * 处理添加或修改基础设置数据
 * @date 2022-01-04 11:12:47
 * @param data
 * @param text
 * @returns {Promise<boolean|*>}
 */
export const handleSaveVenueData = async (
  data: BaseBaseSetting.BaseBaseSettingItem,
  text: { notice: string; precaution: string },
) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await saveVenueBaseData(data, text);

    hide();

    if (result.success) {
      message.success(result.msg);
      return result.success;
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
 * 处理删除场地信息
 * @date 2022-01-04 14:17:41
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleDeleteVenueData = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteVenueData(id);

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
 * 处理获取的场地树列表
 * @param {string} type type === '0' 查询 的结果不返回 场地 , 为空 查询的结果场地场地
 * @returns {Promise<*[]|*>}
 */
export const handleVenueTree = async (type = '') => {
  try {
    const result = await getVenueTree(type);

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
 * 处理获取的场地树列表
 * @param {string} type type === '0' 查询 的结果不返回 场地 , 为空 查询的结果场地场地
 * @returns {Promise<*[]|*>}
 */
export const handleVenueTreeAnon = async (type = '') => {
  try {
    const result = await getVenueTreeAnon(type);

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
 * 处理获取的场地信息， 用于Select
 * @date 2022-01-12 13:35:47
 * @returns {Promise<*[]|*>}
 */
export const handleGetVenueSelectData = async () => {
  try {
    const result = await getVenueSelectData();

    if (result?.success) {
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
 * 处理根据场馆id获取的它之下场地的数据， 用于Select
 * @date 2022-01-20 13:06:31
 * @param id
 * @returns {Promise<*[]|*>}
 */
// export const handleVenueChangDiSelectData = async (id) => {
//   try {
//     const result = await getVenueChangDiSelectData(id);
//
//     if (result.success) {
//       return result.data;
//     } else {
//       message.warning(result.msg);
//       return [];
//     }
//   } catch (err) {
//     message.error(`get fail`);
//     return [];
//   }
// };

/**
 * 获取基本信息
 * @date 2022-05-27
 */
export const handleBaseBase = async () => {
  try {
    const result = await getBaseBase();

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: result.data };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};
