import { deleteRes, get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { LabelValueItem, RequestTableParam, TypeUtil } from 'types/utils';

/**
 * 获取会员卡设置列表
 * @param {object} params
 * @date 2022-05-05 09:29:52
 * @returns {Promise<unknown>}
 * @author ssss
 */
export async function getMemberSettingList(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<MemberCardConfigSetting.SettingListItem[]>> {
  return get(`/venue-service/${version}/mem/config/list`, params);
}

/**
 * 保存会员卡设置信息
 * @date 2022-05-05 09:34:33
 * @param {object} data
 * @author ssss
 */
export async function saveMemberSetting(
  data: MemberCardConfigSetting.SaveSettingItem,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/mem/config/save`, data);
}

/**
 * 获取会员卡设置信息
 * @date 2022-05-05 09:40:05
 * @param {string} id
 * @author ssss
 */
export async function getMemberSettingInfoById(
  id: string,
): Promise<TypeUtil.RequestResult<MemberCardConfigSetting.SettingItem>> {
  return get(`/venue-service/${version}/mem/config/info/${id}`);
}

/**
 * 获取场地类型和商店
 */
export async function fetchOperateSettingAndShop(
  tenantId: string,
): Promise<TypeUtil.RequestResult<LabelValueItem[]>> {
  return get(`/venue-service/${version}/cgs/venue/venueAndShop`, {
    tenantId,
    clientId: 'changguan',
  });
}

/**
 * 删除储值卡套餐配置
 * @author sssss
 * @date
 */
export async function deleteChargeDetail(id: string): Promise<TypeUtil.RequestResult<boolean>> {
  return deleteRes(`/venue-service/${version}/mem/config/charge/${id}`, {});
}

/**
 * 删除计次卡套餐配置
 * @author sssss
 * @date
 */
export async function deleteCountDetail(id: string): Promise<TypeUtil.RequestResult<boolean>> {
  return deleteRes(`/venue-service/${version}/mem/config/num/${id}`, {});
}

/**
 * 删除期限卡套餐配置
 * @author sssss
 * @date
 */
export async function deleteExpireDetail(id: string): Promise<TypeUtil.RequestResult<boolean>> {
  return deleteRes(`/venue-service/${version}/mem/config/time/${id}`, {});
}

/**
 * 会员卡种列表
 * @param params
 */
export async function getMemberCardList(
  params: MemberCardConfigSetting.MemberCardListParams,
): Promise<TypeUtil.RequestResult<MemberCardConfigSetting.MemberCardListInfo[]>> {
  return get(`/venue-service/${version}/mem/config/cardList`, params);
}

/**
 * 保存或者修改会员认证方式
 * @param params
 */
export async function saveMemberTransact(
  params: MemberCardConfigSetting.MemberTransactionParams,
): Promise<TypeUtil.RequestResult<string>> {
  return post(`/venue-service/${version}/mem/auth/save`, params);
}

/**
 * 获取会员认证方式详情
 */
export async function getMemberTransactInfo(): Promise<
  TypeUtil.RequestResult<MemberCardConfigSetting.MemberTransactionInfo>
> {
  return get(`/venue-service/${version}/mem/auth/detail`);
}
