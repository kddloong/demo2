import { get } from '@/services/request/request_tools';
import { RequestTableParam, TypeUtil } from 'types/utils';
import { CLIENT_VERSION as version } from '@/utils/utils';

/**
 * 获取充值记录列表
 * @date 2022-07-28
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchCutCountList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<CutCount.CutCountListItem[]>> {
  return get(`/venue-service/${version}/mem/cut/list`, params);
}
