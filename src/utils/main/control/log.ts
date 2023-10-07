import { fetchLogList } from '@/services/main/control/log';
import { message } from 'antd';
import { Log } from 'types/main/control/log';

/**
 * 处理获取的日志数据
 * @date 2021.12.26
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handleLogList = async (params: Log.LogDataParams) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await fetchLogList(params);

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.error(result.msg);
      return {};
    }
  } catch (err) {
    hide();

    return {};
  }
};
