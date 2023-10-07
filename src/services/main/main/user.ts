import { CLIENT_VERSION as version } from '@/utils/utils';
import { RequestTableParam, TypeUtil } from 'types/utils';
import { deleteRes, get, post } from '@/services/request/request_tools';
import { User } from '../../../../types/main/main/user';

/**
 * 保存用户信息
 * @date 2022-04-03 21:03:31
 * @param values
 * @returns {Promise<unknown>}
 */
export async function saveUser(values: User.UserItem): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${version}/sys/user/save`, values);
}

/**
 * 获取用户信息
 * @date 2021.12.27
 * @param id
 * @returns {Promise<unknown>}
 */
export async function getUserDataById(id: string): Promise<TypeUtil.RequestResult<User.UserItem>> {
  return get(`/user-service/${version}/sys/user/user/${id}`);
}

/**
 * 获取用户列表
 * @date 2022-05-20
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchUserList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestResult<User.UserItem[], number>> {
  return get(`/user-service/${version}/sys/user/list`, params);
}

/**
 * 删除用户
 * @date 2021.12.26
 * @param id
 * @returns {Promise<unknown>}
 */
export async function deleteUser(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/user-service/${version}/sys/user/${id}`);
}

/**
 * 获取用户的角色信息, 因为用户可能有多个角色
 * @param userId
 */
export async function getRoleByUserId(
  userId: string,
): Promise<TypeUtil.RequestResult<User.UserRole>> {
  return get(`/user-service/${version}/sys/user/roleByUserId/${userId}`, {});
}

/**
 * 重置密码调用
 * @param data
 * @returns {Promise<unknown>}
 */
export async function resetPwd(data: User.UserPassWord): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${version}/sys/user/initPwd`, data);
}

/**
 * 修改密码
 * @date 2022-01-06 15:26:20
 * @param data
 * @returns {Promise<unknown>}
 */
export async function updatePassword(
  data: User.ChangeUserPassword,
): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${version}/sys/user/savepwd`, data);
}
