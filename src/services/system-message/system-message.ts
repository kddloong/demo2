import { get, post } from '@/services/request/request_tools';
import { MergeRequestTableParams, TypeUtil } from 'types/utils';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { Announcement } from '../../../types/system-message/announcement/announcement';
import { SystemMessage } from '../../../types/system-message/system-message';

/**
 * 分页查询系统消息列表
 * @param params
 *  type 0：消息 1：通知
 */
export async function getSystemMessageList(
  params: MergeRequestTableParams<{ type: string }>,
): Promise<TypeUtil.RequestTableResult<Announcement.AnnouncementDetail[]>> {
  return get(`/biz-service/${version}/web/notice/list`, params);
}

// 分页查询系统消息列表 -  公告列表
export async function getSystemMessageAnnouncementList(
  params: MergeRequestTableParams<{ type: string }>,
): Promise<TypeUtil.RequestTableResult<Announcement.AnnouncementDetail[]>> {
  return get(`/biz-service/${version}/web/announcement/record/list`, params);
}

// 分页查询系统消息列表 -  通知列表
export async function getSystemMessageNoticeList(
  params: MergeRequestTableParams<{ type: string }>,
): Promise<TypeUtil.RequestTableResult<Announcement.AnnouncementDetail[]>> {
  return get(`/biz-service/${version}/web/notify/record/list`, params);
}

/**
 * 读消息
 * @param id
 */
export async function readMessage(id: string): Promise<TypeUtil.RequestResult> {
  return post(`/biz-service/${version}/web/notice/read`, { id });
}

/**
 * 查询未读消息条数
 * @param params
 */
export async function unreadSystemMessageCount(params: {
  type: string;
}): Promise<TypeUtil.RequestResult> {
  return get(`/biz-service/${version}/web/notice/unread/type`, params);
}

/**
 * 一键已读
 * @param type
 */
export async function readAll(type?: string): Promise<TypeUtil.RequestResult> {
  return post(`/biz-service/${version}/web/notice/read/all`, type);
}

/**
 * 查询系统消息详情
 * @param id
 */
export async function getSystemMessageDetail(
  id: string,
): Promise<TypeUtil.RequestResult<SystemMessage.SystemMessageDetail>> {
  return get(`/biz-service/${version}/web/notice/${id}`);
}

/**
 * 查询各类型消息及未读条数
 *
 */
export async function unreadDiffMessageCount(): Promise<
  TypeUtil.RequestResult<SystemMessage.UnreadDiffMessage>
> {
  return get(`/biz-service/${version}/web/notice/various`);
}
