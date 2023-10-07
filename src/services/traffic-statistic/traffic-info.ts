import { CLIENT_VERSION as version } from '@/utils/utils';
import { get } from '@/services/request/request_tools';
import { TypeUtil } from 'types/utils';
import { TrafficInfo } from '../../../types/traffic-statistic/traffic-info';

const baseUrl = `/traffic-service/${version}/traffic`;

/**
 * 获取所有的客流数据
 * @date 2022-05-09 09:51:44
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchTrafficInfoList(
  params: TrafficInfo.SearchTrafficInfoParams,
): Promise<TypeUtil.RequestTableResult<TrafficInfo.TrafficInfoListItem[]>> {
  return get(`${baseUrl}/statistical/cameraTraffic/detail`, params);
}
