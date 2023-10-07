/**
 * 修改和配置微信小程序参数配置
 *  @author yu
 * @date 2022-09-21 16:26:08
 */
import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION_V2 as version } from '@/utils/utils';
import { TypeUtil } from 'types/utils';
import { WeappSetting } from '../../../../types/setting/applets/wx-app';

export async function saveWxAppConfig(
  values: WeappSetting.WeappSettingItem,
): Promise<TypeUtil.RequestResult> {
  // return post(`/venue-service/${version}/app/wx/param/save`, { ...values });
  return post(`/third-service/${version}/third/wx/param/save`, { ...values });
}

/**
 * 获取微信小程序参数配置
 *  @author yu
 * @date 2022-09-21 16:29:22
 */
export async function fetchWxAppConfig(): Promise<TypeUtil.RequestResult> {
  // return get(`/venue-service/${version}/app/wx/param/get`, {});
  return get(`/third-service/${version}/third/wx/param/info`, {});
}
