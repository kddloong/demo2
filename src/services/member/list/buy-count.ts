import { get } from '@/services/request/request_tools';
import { RequestTableParam, TypeUtil } from 'types/utils';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { BuyCount } from '../../../../types/member/list/buy-count';

/**
 * 获取购次记录列表
 * @date 2022-07-28
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchBuyCountList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<BuyCount.BuyCountListItem[]>> {
  return get(`/venue-service/${version}/mem/buy/list`, params);
}
