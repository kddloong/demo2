import { CLIENT_VERSION as version } from '@/utils/utils';
import { get } from '@/services/request/request_tools';
import { RequestTableParam, TypeUtil } from 'types/utils';
import { AllTraffic } from 'types/traffic-statistic/statistic-list';

const baseUrl = `/traffic-service/${version}/traffic/statistical`;

/**
 * 获取所有的客流数据
 * @date 2022-05-09 09:51:44
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchAllTrafficList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<AllTraffic.ALLTrafficListItem[]>> {
  return get(`${baseUrl}/list`, params);
}
