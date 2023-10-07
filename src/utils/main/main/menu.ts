import { CLIENT_ID } from '@/utils/utils';
import {
  fetchCurrentUserMenuData,
  getMenuById,
  getMenuListByClientId,
  getMenuTreeDataForParentId,
  menuList,
} from '@/services/main/main/menu';
import { message } from 'antd';

/**
 * 处理 场馆(第三方)的菜单列表
 * @date 2022-05-19
 * @param clientId
 * @author sssss
 */
export const handleMenuListByClientId = async (clientId: string) => {
  try {
    const result = await getMenuListByClientId(clientId);

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.data.length,
      };
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 获取菜单树列表的数据， 用于新增数据和修改数据
 * @date 2022-04-02 13:34:13
 * @returns {Promise<*>}
 */
export const handleMenuTreeForParentId = async (clientId: string = CLIENT_ID) => {
  try {
    const result = await getMenuTreeDataForParentId(clientId);
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
 * 格式化处理获取的菜单数据
 * @date 2022-04-02 13:36:59
 * @param {String} menuId
 * @returns {Promise<void>}
 */
export const getMenuDataById = async (menuId: string) => {
  try {
    const result = await getMenuById(menuId);
    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (error) {
    return false;
  }
};

/**
 * 处理获取的菜单数据
 * @date 2022-04-02 11:26:17
 * @returns {Promise<*[]|{total, code, data, success}>}
 * @version 0.0.1 去掉参数
 */
export const handleMenuList = async () => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await menuList();

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
      return {};
    }
  } catch (err) {
    hide();

    return {};
  }
};

/**
 * 处理获取当前用户可以看到的菜单数据
 * @date 2023-06-15
 * @returns {Promise<*[]|{total, code, data, success}>}
 * @version 0.0.1 去掉参数
 */
export const handleFetchCurrentUserMenuData = async (roleId: string, clientId: string) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await fetchCurrentUserMenuData(roleId, clientId);

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
      };
    } else {
      message.warning(result.msg);
      return { data: [], success: false };
    }
  } catch (err) {
    hide();

    return { data: [], success: false };
  }
};
