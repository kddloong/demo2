import { get } from '@/services/request/request_tools';
import { MergeRequestTableParams, TypeUtil } from 'types/utils';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { WechatUser } from 'types/setting/applets/user';

/**
 * 获取当前场馆的小程序用户列表
 * @param params
 */
export async function fetchWechatProgramUserList(
  params: MergeRequestTableParams<{ phoneNo: string }>,
): Promise<TypeUtil.RequestTableResult<WechatUser.WechatUserItem[]>> {
  return get(`/venue-service/${version}/app/wx/customer/list`, params);
}
