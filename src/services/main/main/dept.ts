import { CLIENT_VERSION as version } from '@/utils/utils';
import { Dept } from 'types/main/main/dept';
import { TreeData, TypeUtil } from 'types/utils';
import { get, post } from '@/services/request/request_tools';

/**
 * 平台创建自身的部门
 * @date 2022-05-20
 * @param values
 * @returns {Promise<unknown>}
 */
export async function saveDept(values: Dept.DeptItem): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${version}/sys/dept/save`, { ...values });
}

/**
 * 获取部门列表
 * @date 2022-04-03 20:53:32
 * @returns {Promise<unknown>}
 */
export async function deptList(): Promise<TypeUtil.RequestResult<Dept.DeptItem[]>> {
  return get(`/user-service/${version}/sys/dept/list`);
}

/**
 * 根据id获取部门数据
 * @date 2022-05-20
 * @param {String} id
 * @returns {Promise<unknown>}
 */
export async function deptDataById(id: string): Promise<TypeUtil.RequestResult<Dept.DeptItem>> {
  return get(`/user-service/${version}/sys/dept/${id}`);
}

/**
 * 获取部门的树列表
 * @date 2022-05-20 09:05:54
 * @author ssss
 */
export async function getDeptTree(): Promise<TreeData> {
  return get(`/user-service/${version}/sys/dept/deptTree`);
}

/**
 * 根据id获取部门数据
 * @date 2022-05-20
 * @param {String} id
 * @returns {Promise<unknown>}
 */
export async function getDeptDataById(id: string): Promise<TypeUtil.RequestResult<Dept.DeptItem>> {
  return get(`/user-service/${version}/sys/dept/${id}`);
}
