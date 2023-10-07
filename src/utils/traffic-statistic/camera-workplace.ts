import { message } from 'antd';
import {
  fetchRangeTrafficCameraStatistic,
  fetchRangeTrafficCameraStatisticChart,
  fetchRangeTrafficCameraStatisticList,
  fetchTodayTrafficCameraStatistic,
  fetchTodayTrafficCameraStatisticChart,
  fetchTodayTrafficCameraStatisticList,
  fetchYearTrafficCameraStatistic,
  fetchYearTrafficCameraStatisticChart,
  fetchYearTrafficCameraStatisticList,
  getCameraTrafficList,
} from '@/services/traffic-statistic/camera-workplace';
import { TypeUtil } from 'types/utils';

type SearchTimeRangeParams = TypeUtil.SearchTimeRangeParams;

/**
 * 获取客流摄像头概览信息
 * @param data
 */
export const handleFetchTrafficCameraList = async (data: { todayDate: string }) => {
  try {
    const result = await getCameraTrafficList(data);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};
/**
 * 获取今日客流量统计数据列表
 */
export const handleFetchTodayTrafficCameraStatisticList = async () => {
  try {
    const result = await fetchTodayTrafficCameraStatisticList();

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 获取今日客流量统计数据列表
 */
export const handleFetchTodayTrafficCameraStatistic = async () => {
  try {
    const result = await fetchTodayTrafficCameraStatistic();

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    return {};
  }
};

/**
 * @author ssss
 */
export const handleFetchTodayTrafficCameraStatisticChart = async () => {
  try {
    const result = await fetchTodayTrafficCameraStatisticChart();

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 根据时段获取客流量统计数据列表
 */
export const handleFetchRangeTrafficCameraStatisticList = async (params: SearchTimeRangeParams) => {
  try {
    const result = await fetchRangeTrafficCameraStatisticList(params);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 根据时段获取客流量统计数据列表
 */
export const handleFetchRangeTrafficCameraStatistic = async (params: SearchTimeRangeParams) => {
  try {
    const result = await fetchRangeTrafficCameraStatistic(params);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    return {};
  }
};

/**
 * @author ssss
 */
export const handleFetchRangeTrafficCameraStatisticChart = async (
  params: SearchTimeRangeParams,
) => {
  try {
    const result = await fetchRangeTrafficCameraStatisticChart(params);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 根据时段获取客流量统计数据列表
 */
export const handleFetchYearTrafficCameraStatisticList = async (params: SearchTimeRangeParams) => {
  try {
    const result = await fetchYearTrafficCameraStatisticList(params);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 根据时段获取客流量统计数据列表
 */
export const handleFetchYearTrafficCameraStatistic = async (params: SearchTimeRangeParams) => {
  try {
    const result = await fetchYearTrafficCameraStatistic(params);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    return {};
  }
};

/**
 * @author ssss
 */
export const handleFetchYearTrafficCameraStatisticChart = async (params: SearchTimeRangeParams) => {
  try {
    const result = await fetchYearTrafficCameraStatisticChart(params);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};
