import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { TreeData, TypeUtil } from 'types/utils';
import { Role, RoleMenu, RoleUser, RoleVenue } from '../../../../types/main/main/role';

/**
 * 保存角色信息
 * @date 2022-04-02 15:00:18
 * @param data
 * @returns {Promise<unknown>}
 */
export async function saveRole(data: Role.RoleItem): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${version}/sys/role/save`, data);
}

/**
 * 根据id获取角色信息
 * @date 2021.12.26
 * @param id
 * @returns {Promise<unknown>}
 */
export async function getRoleDataById(id: string): Promise<TypeUtil.RequestResult<Role.RoleItem>> {
  return get(`/user-service/${version}/sys/role/${id}`);
}

/**
 * 获取角色信息列表
 * @date 2022-04-02 15:19:32
 * @returns {Promise<unknown>}
 */
export async function roleList(
  params: TypeUtil.RequestTableParams,
): Promise<TypeUtil.RequestResult<Role.RoleItem[]>> {
  return get(`/user-service/${version}/sys/role/list`, params);
}

/**
 * 获取角色的树列表
 * @date 2022-05-20
 * @author sssss
 */
export async function roleTree(): Promise<TreeData> {
  return get(`/user-service/${version}/sys/role/roleTree`);
}

/**
 * 保存角色的场馆权限
 * @date 2022-03-23 15:26:36
 * @param roleId
 * @param roleVenueIds
 * @returns {Promise<unknown>}
 */
export async function saveVenueAuth(
  roleId: string,
  roleVenueIds: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${version}/sys/role/saveRoleVenue`, { roleId, roleVenueIds });
}

/**
 * 获取场馆的权限配置
 * @date 2022-03-23 16:50:13
 * @param roleId
 * @param clientId
 * @returns {Promise<unknown>}
 */
export async function getVenueAuth(
  roleId: string,
  clientId: string,
): Promise<TypeUtil.RequestResult<RoleVenue.RoleVenueItem[]>> {
  return get(`/user-service/${version}/sys/role/getRoleVenueTree`, { roleId, clientId });
}

/**
 * 获取角色的菜单配置信息
 * @param roleId
 * @param clientId
 */
export async function getMenuDataByRoleId(
  roleId: string,
  clientId: string,
): Promise<TypeUtil.RequestResult<RoleMenu.RoleMenuContent>> {
  return get(`/user-service/${version}/sys/role/getRoleMenuTree`, { roleId, clientId });
}

/**
 * 保存角色对应的菜单
 * @date 2022-05-31
 * @param data
 */
export async function saveRoleMenu(
  data: RoleMenu.SaveRoleMenuParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${version}/sys/role/saveRoleMenu`, data);
}

/**
 * 根据角色信息获取用户列表
 * @param roleId
 */
export async function fetchUserListByRoleId(
  roleId: string,
): Promise<TypeUtil.RequestResult<RoleUser.RoleUserItem[]>> {
  return get(`/user-service/${version}/sys/role/findUserByRole`, { roleId });
}
