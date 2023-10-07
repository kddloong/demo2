import { TypeUtil } from 'types/utils';
import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION } from '@/utils/utils';
import { CurrentUserInfo } from '../../../types/account/center';

/**
 * @date 2022-01-20 20:24:05
 * 获取用户基本信息
 *
 */
export async function fetchCurrentBasicInfo(): Promise<TypeUtil.RequestResult<CurrentUserInfo>> {
  return get(`/user-service/${CLIENT_VERSION}/sys/user/info`);
}
