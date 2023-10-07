import { get, post } from '@/services/request/request_tools';
import { MergeRequestTableParams, TypeUtil } from 'types/utils';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { Announcement } from '../../../../types/system-message/announcement/announcement';

/***
 * 首页公告
 * @param
 */
export async function currentAnnouncement(): Promise<
  TypeUtil.RequestResult<Announcement.AnnouncementCate>
> {
  return get(`/biz-service/${version}/web/announcement/record/current`);
}

/**
 *  读公告
 * @param id
 */
export async function readAnnouncement(id: string): Promise<TypeUtil.RequestResult> {
  return post(`/biz-service/${version}/web/announcement/record/read`, { id });
}

// 保存或修改公告
// 发布公告
export async function saveAnnouncement(
  params: Announcement.AnnouncementParams,
): Promise<TypeUtil.RequestResult> {
  return post(`/biz-service/${version}/web/announcement/save`, params);
}

// 公告管理列表 (平台公告)
export async function getAdminAnnouncementList(
  params: TypeUtil.RequestTableParams,
): Promise<TypeUtil.RequestTableResult<Announcement.AnnouncementDetail[]>> {
  return get(`/biz-service/${version}/admin/announcement/list`, params);
}

// 公告管理列表 (企业公告)
export async function getWebAnnouncementList(
  params: TypeUtil.RequestTableParams,
): Promise<TypeUtil.RequestTableResult<Announcement.AnnouncementDetail[]>> {
  return get(`/biz-service/${version}/web/announcement/list`, params);
}

// 当前公告 - 企业
// 用于填充输入框
export async function getWebCurrentAnnouncement(): Promise<
  TypeUtil.RequestResult<Announcement.AnnouncementDetail>
> {
  return get(`/biz-service/${version}/web/announcement/current`);
}

// 当前公告 - 平台
// 用于填充输入框
export async function getAdminCurrentAnnouncement(): Promise<
  TypeUtil.RequestResult<Announcement.AnnouncementDetail>
> {
  return get(`/biz-service/${version}/admin/announcement/current`);
}

// 公告阅读记录
export async function getReadAnnounceUser(
  params: MergeRequestTableParams<{ id: string }>,
): Promise<TypeUtil.RequestResult<Announcement.ReaderType>> {
  return get(`/biz-service/${version}/web/announcement/record/read/log`, params);
}

// 查看公告详情
export async function getAnnouncementInfoById(
  id: string,
): Promise<TypeUtil.RequestResult<Announcement.AnnouncementDetail>> {
  return get(`/biz-service/${version}/admin/announcement/${id}`);
}
