import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { TypeUtil } from 'types/utils';

type RequestSelectData = TypeUtil.RequestSelectData;

/**
 * 根据code获取数据字典
 * @date 2021.12.27
 * @param code
 * @returns {Promise<>}
 */
export async function getDictionary(code: string): Promise<RequestSelectData> {
  return get(`/user-service/${version}/sys/dic/getDicMap`, { code });
}

export async function handleFetchPayTypeArr(): Promise<RequestSelectData> {
  return get(`/venue-service/${version}/cgs/pay/config/select`, {});
}
