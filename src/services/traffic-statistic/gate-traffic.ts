import { get } from '@/services/request/request_tools';
import { RequestTableParam, TypeUtil } from 'types/utils';
import { baseRequestUrl } from '@/utils/traffic-statistic/gate-traffic';

/**
 * 获取统计数据
 * @param path
 * @param params
 */
export async function fetchBaseRequest(
  path: string,
  params: { timeFrom?: string; timeTo?: string } = {},
): Promise<TypeUtil.RequestResult<{ totalEnter: number }>> {
  return get(`${baseRequestUrl}${path}`, params);
}

/**
 * 获取闸机客流列表
 * @date 2022-02-28 14:13:30
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchGateTrafficList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<GateTraffic.GateTrafficItem[]>> {
  return get<TypeUtil.RequestTableResult<GateTraffic.GateTrafficItem[]>>(
    `${baseRequestUrl}list`,
    params,
  );
}
