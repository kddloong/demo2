import { LabelValueItem, TypeUtil } from '../../types/utils';
import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';

/**
 * 获取登录次数变化情况
 * @param params
 */
export async function fetchLoginNum(
  params: TypeUtil.ChartTimeRange,
): Promise<TypeUtil.RequestResult<LabelValueItem[]>> {
  return get(`/user-service/${version}/sys/statistics/loginNum`, params);
}

/**
 * 获取用户增长变化情况
 * @param params
 */
export async function fetchUserIncrease(
  params: TypeUtil.ChartTimeRange,
): Promise<TypeUtil.RequestResult<LabelValueItem[]>> {
  return get(`/user-service/${version}/sys/statistics/newUserNum`, params);
}

/**
 * 获取首页概览数据
 * @param tenantId
 */
export async function fetchWelcomeData(tenantId: string): Promise<TypeUtil.RequestResult> {
  return get(`/user-service/${version}/sys/statistics/overview`, { tenantId });
}
