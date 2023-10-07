import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { RequestTableParam, TypeUtil } from 'types/utils';
import { StoreRecord } from '../../../types/locker-store/record-list';

/**
 * 获取储物柜开箱列表
 * @date 2022-11-28
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchStoreRecordList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<StoreRecord.StoreRecordListItem[]>> {
  return get(`/locker-service/${version}/lck/locker/record/list`, params);
}
