import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { TypeUtil } from 'types/utils';
import { VenueCheck } from '../../../types/ticket/check';

/**
 * 获取订单核销列表
 * @date 2022-01-21 16:14:21
 * @param params
 */
export async function getAreaCheckList(
  params: VenueCheck.VenueCheckDataParams,
): Promise<TypeUtil.RequestTableResult<VenueCheck.VenueCheckItem[]>> {
  return get(`/venue-service/${version}/use/order/check/list`, params);
}
