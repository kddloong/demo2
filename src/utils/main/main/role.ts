import { message } from 'antd';
import {
  fetchUserListByRoleId,
  getMenuDataByRoleId,
  getRoleDataById,
  getVenueAuth,
  roleList,
  roleTree,
  saveRole,
  saveRoleMenu,
  saveVenueAuth,
} from '@/services/main/main/role';
import { CLIENT_ID } from '@/utils/utils';
import { Role, RoleMenu } from '../../../../types/main/main/role';
import { TypeUtil } from '../../../../types/utils';

/**
 * 添加角色
 * @param fields
 * @returns {Promise<{msg, success: boolean}|boolean>}
 */
export const handleSaveRole = async (fields: Role.RoleItem) => {
  const hide = message.loading('正在添加');

  try {
    const result = await saveRole({ ...fields });

    hide();

    if (result.success) {
      return result.success;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 根据id获取角色信息、
 * @date 2021.12.26
 * @param id
 * @returns {Promise<{}|*>}
 */
export const handleRoleDataById = async (id: string) => {
  try {
    const result = await getRoleDataById(id);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (error) {
    return {};
  }
};

export const handleRoleList = async (params: TypeUtil.RequestTableParams) => {
  try {
    const result = await roleList(params);

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
 * 处理获取的角色树列表
 * @date 2021.12.24
 * @returns {Promise<*>}
 */
export const handleRoleTree = async () => {
  try {
    const requestResult = await roleTree();
    if (requestResult.success) {
      return requestResult.data;
    } else {
      message.warning(requestResult.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 处理保存角色有权限的场馆
 * @date 2022-03-23 15:28:00
 * @param roleId
 * @param roleVenueIds
 * @returns {Promise<boolean>}
 */
export const handleSaveVenueAuth = async (roleId: string, roleVenueIds: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await saveVenueAuth(roleId, roleVenueIds);

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
 * 获取角色的场馆权限菜单
 * @date 2022-03-23 16:52:17
 * @param roleId
 * @param clientId
 */
export const handleGetVenueAuth = async (roleId: string, clientId: string = CLIENT_ID) => {
  try {
    const result = await getVenueAuth(roleId, clientId);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 处理根据角色的id获取对应菜单的配置信息
 * @date 2022-05-31
 * @param roleId
 * @param clientId
 */
export const handleMenuDataByRoleId = async (roleId: string, clientId: string = CLIENT_ID) => {
  try {
    const result = await getMenuDataByRoleId(roleId, clientId);

    if (result.success) {
      return { data: result.data, success: true };
    } else {
      message.warning(result.msg);
      return { data: [], success: false };
    }
  } catch (err) {
    return { data: [], success: false };
  }
};

/**
 * 处理保存菜单信息
 * @param data
 */
export const handleSaveRoleMenu = async (data: RoleMenu.SaveRoleMenuParams) => {
  const hide = message.loading('正在保存！');

  try {
    const result = await saveRoleMenu(data);

    hide();

    if (result.success) {
      message.success(`${result.msg}, 请刷新页面`);
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
 * @author sssss
 * @param roleId
 */
export const handleFetchUserListByRoleId = async (roleId: string) => {
  try {
    const result = await fetchUserListByRoleId(roleId);

    if (result.success) {
      return { success: true, data: result.data, total: result.data.length, code: result.code };
    } else {
      message.warning(result.msg);
      return { success: false, data: [], total: 0, code: result.code };
    }
  } catch (err) {
    return { success: false, data: [], total: 0, code: 0 };
  }
};
