import { TypeUtil } from '../../types/utils';
import { get, post } from './request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';

/**
 * 根据模块名获取组件的排列信息
 * @param type
 */
export async function fetchCurrentModuleCompShow(
  type: string,
): Promise<TypeUtil.RequestResult<WorkplaceComponent.WorkplaceComponentShowItem[]>> {
  return get(`/user-service/${version}/sys/position/list`, { type });
}

/**
 * 改变工作台模块的位置
 * @param params
 */
export async function changeCompPosition(
  params: WorkplaceComponent.ChangeCompParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${version}/sys/position/updateDiv`, params);
}

/**
 *
 * 在工作台添加功能模块
 * @param params
 */
export async function addModuleToWorkplace(
  params: WorkplaceComponent.AddModuleParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${version}/sys/position/save`, params);
}

/**
 * 获取当前工作台可以使用哪些模块
 * @param type
 */
export async function fetchWorkplaceModules(
  type: string,
): Promise<TypeUtil.RequestResult<WorkplaceComponent.ChooseModuleItem[]>> {
  return get(`/user-service/${version}/sys/position/userList`, { type });
}
