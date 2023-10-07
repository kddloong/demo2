/**
 * 根据闸机区域id获取闸机列表
 * @author yu
 * @param params
 */

import {
  getMessageRecordStatistic,
  getMessageSendRecord,
} from '@/services/setting/message/config-send-record';
import { message } from 'antd';
import { RequestTableParam } from 'types/utils';

export const handleFetchMessageSendRecordList = async (params: RequestTableParam) => {
  try {
    const result = await getMessageSendRecord(params);

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 场馆短信发送记录统计
 */
export const handleFetchMessageSendRecordStatistic = async () => {
  try {
    const result = await getMessageRecordStatistic();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
      };
    } else {
      message.warning(result.msg);
      return { success: false, data: null };
    }
  } catch (err) {
    return { success: false, data: null };
  }
};
