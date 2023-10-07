import { TypeUtil } from '../../types/utils';
import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { AlertResp } from '../../types/alert-info';

/**
 * 根据code获取页面的配置信息
 * @param code
 */
export async function fetchAlertByCode(code: string): Promise<TypeUtil.RequestResult<AlertResp>> {
  return get(`/user-service/${version}/sys/info/findInfo`, { code });
}
