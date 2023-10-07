import { CLIENT_VERSION as version } from '@/utils/utils';
import { get, post } from '@/services/request/request_tools';
import { RequestTableParam, TypeUtil } from 'types/utils';
import { WechatUser } from '../../../../types/main/main/wx';

/**
 * 获取用户列表
 * @param params
 * @returns {Promise<unknown>}
 */
export async function getWxManageUserList(
  params: RequestTableParam & WechatUser.WeChatUserManageParams,
): Promise<TypeUtil.RequestResult<WechatUser.WechatUserItem[]>> {
  return get(`/user-service/${version}/sys/wx/user/list`, params);
}

/**
 * 根据手机号获取为
 * @param phoneNo
 * @returns {Promise<unknown>}
 */
export async function findWxManageUserByPhoneNo(
  phoneNo: string,
): Promise<TypeUtil.RequestResult<WechatUser.GetCustomerByPhoneItem>> {
  return get(`/user-service/${version}/sys/wx/user/getCustomerByPhone`, { phoneNo });
}

/**
 * 获取我的微信绑定情况
 * @date 2022-04-04 10:23:15
 * @returns {Promise<unknown>}
 */
export async function getMyWechatBinding(): Promise<
  TypeUtil.RequestResult<WechatUser.WechatUserItem>
> {
  return get(`/user-service/${version}/sys/wx/user/getWxCustomer`);
}

/**
 * 绑定管理端微信小程序用户
 * @date 2022-02-17 16:14:00
 * @param id
 */
export async function bindWeChatUser(id: string): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${version}/sys/wx/user/save`, { id });
}

/**
 * 取消绑定的接口
 * @date 2022-02-25 10:22:52
 * @param id
 */
export async function cancelBinding(id: string): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${version}/sys/wx/user/cancel`, { id });
}
