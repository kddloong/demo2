import { SearchDateRangeParams, SearchTimeRangeParams } from 'types/utils';
import { message } from 'antd';
import {
  getCurrentTraffic,
  getCurrentTrafficLine,
  getDashboardIndexOrder12MonthColumn,
  getDashboardIndexOrderStatistic,
  getIncome,
  getIncomeDetail,
  getMemberDashboardStatistic,
  getSevenDayTraffic,
} from '@/services/dashboard/dashboard';

/**
 * 处理营收数据
 */
export const handleIncome = async (data: SearchDateRangeParams) => {
  try {
    const result = await getIncome(data);

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
 * 处理营收数据
 */
export const handleIncomeResult = async (data: SearchTimeRangeParams) => {
  try {
    const result = await getIncomeDetail(data);

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
 * 处理获取的首页控制台总营收数据
 */
export const handleDashboardIndexOrderStatistic = async () => {
  try {
    const result = await getDashboardIndexOrderStatistic();

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: true, data: {} };
    }
  } catch (err) {
    return { success: true, data: {} };
  }
};

/**
 * 获取12个月的营收统计柱状图
 */
export const handleDashboardIndexOrder12MonthColumn = async () => {
  try {
    const result = await getDashboardIndexOrder12MonthColumn();

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: true, data: [] };
    }
  } catch (err) {
    return { success: true, data: [] };
  }
};

/**
 * 处理获取会员的数据
 */
export const handleMemberDashboardStatistic = async () => {
  try {
    const result = await getMemberDashboardStatistic();

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
 * 处理当日的客流量统计数据
 */
export const handleCurrentTraffic = async () => {
  try {
    const result = await getCurrentTraffic();

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
 * 获取当日客流量统计数据 折线图
 */
export const handleCurrentTrafficLine = async () => {
  try {
    const result = await getCurrentTrafficLine();

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 获取 近 7 天客流量统计
 */
export const handleSevenDayTraffic = async () => {
  try {
    const result = await getSevenDayTraffic();

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
