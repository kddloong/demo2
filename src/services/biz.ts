import { TypeUtil } from '../../types/utils';
import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';

/**
 * 获取当前场馆的企业信息
 * @param id
 */
export async function fetchBizInfo(id: string): Promise<TypeUtil.RequestResult<EnterpriseItem>> {
  return get(`/biz-service/${version}/admin/account/${id}`, {});
}
