import { MessageGlobalConfig } from 'types/setting/message/config-setting';
import { RequestTableParam, TypeUtil } from 'types/utils';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { get, post } from '@/services/request/request_tools';

export async function fetchGlobalMessageConfig(): Promise<
  TypeUtil.RequestResult<MessageGlobalConfig.MessageConfig>
> {
  return get(`/third-service/${version}/set/sms/config/infoByUser`, {});
}

export async function saveGlobalMessageConfig(
  params: MessageGlobalConfig.MessageConfig,
): Promise<TypeUtil.RequestResult> {
  return post(`/third-service/${version}/set/sms/config/saveByUser`, params);
}

/**
 * 场馆获取运营平台定义的短信模板
 * @param params
 * @param action
 */
export async function fetchMessageTemplate(
  params: RequestTableParam,
  action: string,
): Promise<TypeUtil.RequestTableResult<MessageGlobalConfig.TemplateListItem[]>> {
  return get(`/third-service/${version}/set/sms/template/list${action}`, params);
}

/**
 * 操作短信 启用状态
 * @param messageId
 * @param action
 */
export async function changeModelStartUsing(
  messageId: string,
  action: 'Start' | 'End',
): Promise<TypeUtil.RequestResult> {
  return post(`/third-service/${version}/set/sms/template/venue${action}`, { id: messageId });
}

/**
 * 场馆获取运营平台定义的短信模板
 * @param params
 * @param action
 */
export async function fetchCustomizeMessageTemplate(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<MessageGlobalConfig.TemplateListItem[]>> {
  return get(`/third-service/${version}/set/sms/template/listDefine`, params);
}

/**
 * 保存自定义短信模板
 * @param params
 */
export async function saveCustomizeMessage(
  params: MessageGlobalConfig.TemplateItem,
): Promise<TypeUtil.RequestResult<boolean>> {
  return post(`/third-service/${version}/set/sms/template/saveByUser`, params);
}

/**
 * 操作短信 启用状态
 * @param messageId
 * @param action
 */
export async function changeCustomizeModelStartUsing(
  messageId: string,
  action: 'Start' | 'End',
): Promise<TypeUtil.RequestResult> {
  return post(`/third-service/${version}/set/sms/template/venueDefine${action}`, { id: messageId });
}

/**
 * 根据id获取模板详细信息
 * @param id
 */
export async function getSingleMessageTemplateById(
  id: string,
): Promise<TypeUtil.RequestTableResult<MessageGlobalConfig.TemplateListItem>> {
  return get(`/third-service/${version}/set/sms/template/${id}`, {});
}

// 企业账户
export async function getEntAccount(): Promise<
  TypeUtil.RequestTableResult<MessageGlobalConfig.TemplateListItem>
> {
  return get(`/third-service/${version}/sms/record/account`, {});
}
