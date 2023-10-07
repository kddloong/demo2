import { VenueDeposit } from 'types/ticket/deposit';
import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { TypeUtil } from 'types/utils';

/**
 * 获取订单押金列表
 * @date 2022-01-21 16:14:21
 * @param params
 */
export async function getAreaDepositList(
  params: VenueDeposit.VenueDepositDataParams,
): Promise<TypeUtil.RequestTableResult<VenueDeposit.VenueDepositItem[]>> {
  return get(`/venue-service/${version}/use/order/deposit/list`, params);
}
