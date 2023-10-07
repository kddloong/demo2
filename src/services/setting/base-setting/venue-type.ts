import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { RequestSelectData } from 'types/utils';

/**
 * 获取场地类型
 * @date 2022-01-06 09:29:08
 */
export async function getFieldTypeList(): Promise<RequestSelectData> {
  return get(`/venue-service/${version}/cgs/field/type/fieldTypeList`);
}
