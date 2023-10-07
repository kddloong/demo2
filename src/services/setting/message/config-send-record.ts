import { RequestTableParam, TypeUtil } from 'types/utils';
import { MessageRecord } from '../../../../types/setting/message/config-send-record';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { get } from '@/services/request/request_tools';

/**
 * yu
 * @param params
 * @param params.current
 * @param params.pageSize
 */
export async function getMessageSendRecord(
  params: RequestTableParam,
): Promise<TypeUtil.RequestTableResult<MessageRecord.MessageRecordItem[]>> {
  return get(`/third-service/${version}/sms/record/list`, params);
}

/**
 * 场馆短信发送记录统计
 */
export async function getMessageRecordStatistic(): Promise<
  TypeUtil.RequestTableResult<MessageRecord.MessageRecordStatistic>
> {
  return get(`/third-service/${version}/sms/record/statistic`);
}
