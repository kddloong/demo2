import { message } from 'antd';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { RequestTableParam } from 'types/utils';
import { fetchBaseRequest, fetchGateTrafficList } from '@/services/traffic-statistic/gate-traffic';

export const baseRequestUrl = `/traffic-service/${version}/gate/traffic/`;

/**
 * 获取闸机客流
 * @author sssss
 * @param path
 * @param params
 */
export const handleFetchBaseRequest = async (path: string, params = {}) => {
  try {
    const result = await fetchBaseRequest(path, params);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};

/**
 * 处理获取的炸鸡客流信息
 * @date 2022-02-28 14:08:51
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handleFetchGateTrafficList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await fetchGateTrafficList(params);

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
      return { success: false, data: [] };
    }
  } catch (err) {
    hide();

    return { success: false, data: [] };
  }
};
