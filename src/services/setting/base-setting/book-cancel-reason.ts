import { CLIENT_VERSION as version } from '@/utils/utils';
import { ChangeStatus, RequestTableParam, TypeUtil } from 'types/utils';
import { BookCancelReason } from 'types/setting/base-setting/book-cancel-reason';
import { deleteRes, get, post } from '@/services/request/request_tools';

type RequestSelectData = TypeUtil.RequestSelectData;

/**
 * 获取预订取消理由列表
 * @date 2022-01-05 09:13:48
 * @param params
 * @returns {Promise<unknown>}
 */
export async function getCancelReason(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<BookCancelReason.BookCancelReasonItem[]>> {
  return get(`/venue-service/${version}/cgs/book/cancel/reason/list`, params);
}

/**
 * 根据id获取详细的预定取消理由
 * date 2022-01-05 09:15:34
 * @param id
 * @returns {Promise<unknown>}
 */
export async function getCancelReasonDataById(
  id: string,
): Promise<TypeUtil.RequestResult<BookCancelReason.BookCancelReasonItem>> {
  return get(`/venue-service/${version}/cgs/book/cancel/reason/${id}`);
}

/**
 * 保存取消理由
 * @date 2022-01-05 09:15:17
 * @param data
 * @param id
 * @returns {Promise<unknown>}
 */
export async function saveCancelReason(
  data: BookCancelReason.BookCancelReasonItem,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/book/cancel/reason/save`, data);
}

/**
 * 删除取消理由
 * @date 2022-01-05 09:16:47
 * @param id
 * @returns {Promise<unknown>}
 */
export async function deleteCancelReason(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/book/cancel/reason/${id}`);
}

/**
 * 获取用于下拉框的预订取消理由数据
 * @date 2022-01-19 10:49:47
 * @returns {Promise<unknown>}
 */
export async function getBookCancelReasonSelectData(): Promise<RequestSelectData> {
  return get(`/venue-service/${version}/cgs/book/cancel/reason/listStart`);
}

/**
 * 修改储物柜状态
 * @author sssss
 * @date
 */
export async function actionBookCancelReasonStatus(
  id: string,
  action: ChangeStatus,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/book/cancel/reason/${action}`, { id });
}
