import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { TreeData, TypeUtil } from 'types/utils';
import { RoleMenu } from '../../../../types/main/main/role';
import MenuItem = BMapGL.MenuItem;

/**
 * 获取菜单列表
 * @date 2022-04-02 11:16:06
 * @returns {Promise<unknown>}
 * @version 0.0.1 去掉参数
 */
export async function menuList(): Promise<TypeUtil.RequestResult<MenuItem[]>> {
  return get(`/user-service/${version}/sys/menu/list`);
}

/**
 * 获取场馆(采集系统)的菜单列表
 * @date 2022-05-19
 * @param {string} clientId
 * @author sssss
 */
export async function getMenuListByClientId(
  clientId: string,
): Promise<TypeUtil.RequestResult<MenuItem[]>> {
  return get(`/user-service/${version}/sys/menu/client/${clientId}`);
}

/**
 * 修改和查看时， 根据id获取信息
 * @date 2022-04-02 13:36:41
 * @param id
 * @returns {Promise<unknown>}
 */
export async function getMenuById(id: string): Promise<TypeUtil.RequestResult<MenuItem>> {
  return get(`/user-service/${version}/sys/menu/${id}`);
}

/**
 * 获取菜单的树列表
 * @date 2022-05-19
 * @param clientId
 * @author sssss
 */
export async function getMenuTreeDataForParentId(clientId: string): Promise<TreeData> {
  return get(`/user-service/${version}/sys/menu/menuTreeSelect/${clientId}`);
}

/**
 * 获取当前用户可以看到的菜单
 * @param roleId
 * @param clientId
 */
export async function fetchCurrentUserMenuData(
  roleId: string,
  clientId: string,
): Promise<TypeUtil.RequestResult<RoleMenu.RoleTable>> {
  return get(`/user-service/${version}/sys/menu/menuListByRole`, { roleId, clientId });
}
