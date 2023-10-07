import { TypeUtil } from '../../../../types/utils';
import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { Inform } from '../../../../types/system-message/inform/inform';

// 企业通知列表
export async function getInformList(
  params: TypeUtil.RequestTableParams,
): Promise<TypeUtil.RequestResult<Inform.InformDetail[]>> {
  return get(`/biz-service/${version}/web/notify/record/list`, params);
}

// 读通知
export async function readInform(id: string): Promise<TypeUtil.RequestResult<Inform.InformDetail>> {
  return post(`/biz-service/${version}/web/notify/record/read`, { id });
}

// 读消息
export async function readMessage(
  id: string,
): Promise<TypeUtil.RequestResult<Inform.InformDetail>> {
  return post(`/biz-service/${version}/web/notice/read`, { id });
}

// 通知跳转查询审核记录
export async function getInformAudit(
  id: string,
): Promise<TypeUtil.RequestResult<Inform.InformLogType>> {
  return get(`/biz-service/${version}/web/account/audit/record/${id}`);
}
