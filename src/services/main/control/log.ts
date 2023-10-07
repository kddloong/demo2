import { Log } from 'types/main/control/log';
import { TypeUtil } from 'types/utils';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { get } from '@/services/request/request_tools';

/**
 * 获取日志的数据
 * @date 2021.12.26
 * @param params
 * @returns {Promise<unknown>}
 */
export async function fetchLogList(
  params: Log.LogDataParams,
): Promise<TypeUtil.RequestTableResult<Log.LogItem[]>> {
  return get(`/log-center/${version}/log/list`, params);
}
