import { deleteRes, get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { TypeUtil } from 'types/utils';

/**
 * 获取打折理由列表
 * @date 2022-01-04 17:02:45
 * @param params
 * @returns {Promise<unknown>}
 */
export async function getDiscountReason(
  params: DiscountReason.DiscountReasonDataParams,
): Promise<TypeUtil.RequestResult<DiscountReason.DiscountReasonItem[], number>> {
  return get(`/venue-service/${version}/cgs/discount/reason/list`, params);
}

/**
 * 根据id获取打折理由
 * @date 2022-01-04 17:03:03
 * @param id
 * @returns {Promise<unknown>}
 */
export async function getDiscountReasonDataById(
  id: string,
): Promise<TypeUtil.RequestResult<DiscountReason.DiscountReasonItem>> {
  return get(`/venue-service/${version}/cgs/discount/reason/${id}`);
}

/**
 * 保存或修改打折理由
 * @date 2022-01-04 17:04:35
 * @param data
 * @param id
 * @returns {Promise<unknown>}
 */
export async function saveDiscountReason(
  data: DiscountReason.DiscountReasonItem,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/discount/reason/save`, data);
}

/**
 * 删除打折理由
 * @date 2022-01-04 17:05:04
 * @param id
 * @returns {Promise<unknown>}
 */
export async function deleteDiscountReason(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/discount/reason/${id}`);
}

/**
 * 启用打折理由
 * @date 2022-01-04 17:07:02
 * @param id
 * @returns {Promise<unknown>}
 */
export async function startDiscountReason(id: string): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/discount/reason/start`, { id });
}

/**
 * 暂停打折理由
 * @date 2022-01-04 17:09:42
 * @param id
 * @returns {Promise<unknown>}
 */
export async function endDiscountReason(id: string): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/discount/reason/end`, { id });
}

/**
 * 获取可用的打折理由
 * @date 2022-01-10 17:23:51
 * @returns {Promise<unknown>}
 */
export async function getUsefulDiscountReason(): Promise<
  TypeUtil.RequestResult<DiscountReason.DiscountReasonItem[]>
> {
  return get(`/venue-service/${version}/cgs/discount/reason/listStart`);
}
