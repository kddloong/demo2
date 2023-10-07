import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { RequestTableParam, TypeUtil } from 'types/utils';

/**
 * 获取会员续期记录列表
 * @date 2022-07-28
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchContinueCardList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<ContinueCard.ContinueCardListItem[]>> {
  return get(`/venue-service/${version}/mem/continue/list`, params);
}
