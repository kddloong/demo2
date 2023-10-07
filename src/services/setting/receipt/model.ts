import { deleteRes, get, post } from '@/services/request/request_tools';
import { RequestTableParam, TypeUtil } from 'types/utils';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { ReceiptModel } from '../../../../types/setting/receipt/model';

const deleteAndGetStr = (id: string) => `/venue-service/device/${version}/print/doc/${id}`;

/**
 * @author ssss
 * @param params
 */
export async function fetchReceiptModelList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<ReceiptModel.ModelListItem[]>> {
  return get(`/venue-service/device/${version}/print/doc/list`, params);
}

/**
 * @author sssss
 * @param id
 */
export async function getReceiptModelById(
  id: string,
): Promise<TypeUtil.RequestResult<ReceiptModel.ModelListItem>> {
  return get(deleteAndGetStr(id));
}

/**
 * @author sssss
 * @param params
 */
export async function saveReceiptModel(
  params: ReceiptModel.ModelItem,
): Promise<TypeUtil.RequestResult<boolean>> {
  return post(`/venue-service/device/${version}/print/doc/save`, params);
}

/**
 * @author ssss
 * @param id
 */
export async function deleteReceiptModel(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(deleteAndGetStr(id), {});
}
