import { message } from 'antd';
import { fetchTrafficInfoList } from '@/services/traffic-statistic/traffic-info';
import { TrafficInfo } from 'types/traffic-statistic/traffic-info';

/**
 * 处理获取的数据
 * @date 2022-05-09 09:52:46
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleFetchTrafficInfoList = async (params: TrafficInfo.SearchTrafficInfoParams) => {
  const hide = message.loading('正在获取数据');

  try {
    const result = await fetchTrafficInfoList(params);

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (e) {
    return {};
  }
};
