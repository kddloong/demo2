import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { CreateOccupyOrder } from 'types/area-and-ticket/occupy';
import { TypeUtil } from 'types/utils';
import { AreaOccupy } from 'types/area/occupy';

/**
 * 获取占用订单列表
 * @date 2022-01-17 09:53:52
 * @param params
 */
export async function getOccupyList(
  params: AreaOccupy.AreaOccupyDataParams,
): Promise<TypeUtil.RequestTableResult<AreaOccupy.AreaOccupyItem[]>> {
  return get(`/venue-service/${version}/use/occupy/orderList`, params);
}

/**
 * 取消占用订单
 * @date 2022-01-18 21:26:06
 * @param id
 * @param reason
 * @param reasonId
 */
export async function cancelOccupyOrder(
  id: string,
  reason: string,
  reasonId: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/occupy/cancelOccupyOrder`, {
    cancelReason: reason,
    cancelReasonId: reasonId,
    id,
  });
}

/**
 * 获取占用明细订单列表
 * @date 2022-01-18 21:30:56
 * @param id
 */
export async function getOccupyDetailList(
  id: string,
): Promise<TypeUtil.RequestResult<AreaOccupy.AreaOccupyDetailItem[]>> {
  return get(`/venue-service/${version}/use/occupy/orderDetailList/${id}`);
}

/**
 * 取消占用订单子订单
 * @date 2022-01-18 21:26:06
 * @param id
 */
export async function cancelOccupyDetailOrder(id: string): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/occupy/cancelOccupyOrderDetail`, {
    id,
  });
}

/**
 * 保存占用订单
 * @date 2022-05-23
 * @param data
 */
export async function createOccupyOrder(
  data: CreateOccupyOrder.CreateOccupyOrderItem,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/use/occupy/createPcOccupyOrder`, data);
}
