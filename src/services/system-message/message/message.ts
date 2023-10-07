import { TypeUtil } from '../../../../types/utils';
import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { MyMessage } from '../../../../types/system-message/message/message';

// 消息分组列表
export async function getMessageGroupList(): Promise<
  TypeUtil.RequestResult<MyMessage.GroupMessageInfo[]>
> {
  return get(`/biz-service/${version}/web/message/group/list`);
}

// 用户打开消息接受
export async function messageOn(
  groupId: string,
): Promise<TypeUtil.RequestResult<MyMessage.GroupMessageInfo[]>> {
  return post(`/biz-service/${version}/web/message/user/category/open`, { groupId });
}

// 用户关闭消息接受
export async function messageOff(
  groupId: string,
): Promise<TypeUtil.RequestResult<MyMessage.GroupMessageInfo[]>> {
  return post(`/biz-service/${version}/web/message/user/category/close`, { groupId });
}
