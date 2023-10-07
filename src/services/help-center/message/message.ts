import { get, post } from '@/services/request/request_tools';
import { MergeRequestTableParams, TypeUtil } from 'types/utils';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { AuditRecordType, MessageListType } from '../../../../types/help-center/message/messsage';

/**
 * 查询未读消息条数
 */
export async function queryUnreadMessage(): Promise<TypeUtil.RequestResult> {
  return get(`/biz-service/${version}/web/notice/unread`, {});
}

/**
 * 一键已读
 *
 */
export async function readAll(): Promise<TypeUtil.RequestResult> {
  return post(`/biz-service/${version}/web/notice/read/all`, {});
}

// 查询系统消息详情 (单个)
export async function querySingleMessage(
  id: string,
): Promise<TypeUtil.RequestResult<MessageListType>> {
  return get(`/biz-service/${version}/web/notice/${id}`, {});
}

/**
 * 分页查询系统消息列表
 * @param params
 */
export async function queryMessagesList(
  params: MergeRequestTableParams<{ type: string }>,
): Promise<TypeUtil.RequestTableResult<MessageListType[]>> {
  return get(`/biz-service/${version}/web/notice/list`, params);
}

/**
 * 读消息
 * @param params
 */
export async function readMessage(params: { ids: string }): Promise<TypeUtil.RequestResult> {
  return post(`/biz-service/${version}/web/notice/read`, params);
}

/**
 * 查询公告详情
 * @param id
 */
export async function queryAfficheByID(id: string): Promise<TypeUtil.RequestResult> {
  return get(`/biz-service/${version}/web/notice/${id}`, {});
}

/**
 * 查询审核记录
 * @param id
 */
export async function queryAuditById(id: string): Promise<TypeUtil.RequestResult<AuditRecordType>> {
  return get(`/biz-service/${version}/web/audit/log/${id}`, {});
}
