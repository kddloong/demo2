import { Dashboard } from '../../../types/dashboard/dashboard';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { SearchDateRangeParams, SearchTimeRangeParams, TypeUtil } from 'types/utils';
import { get } from '@/services/request/request_tools';

/**
 * 获取近7天客流量统计数据
 */
export async function getSevenDayTraffic(): Promise<TypeUtil.RequestSelectData> {
  return get(`/report-center/${version}/cg/index/trafficByWeek`);
}

/**
 * 获取首页控制台总营收的统计数据
 */
export async function getDashboardIndexOrderStatistic(): Promise<
  TypeUtil.RequestResult<Dashboard.IndexOrderStatisticItem>
> {
  return get(`/venue-report/${version}/venue/index/indexOrderStatistic`, {});
}

/**
 * 获取最近12个月的营收统计柱状图
 */
export async function getDashboardIndexOrder12MonthColumn(): Promise<
  TypeUtil.RequestResult<number[]>
> {
  return get(`/venue-report/${version}/venue/index/orderStatisticByMonth`, {});
}

/**
 * 获取首页的采集统计数据
 */
export async function getMemberDashboardStatistic(): Promise<
  TypeUtil.RequestResult<Dashboard.CaijiDashboardStatisticItem>
> {
  return get(`/venue-service/${version}/mem/member/totalAndNew`, {});
}

/**
 * 获取当日客流量数据
 */
export async function getCurrentTraffic(): Promise<
  TypeUtil.RequestResult<Dashboard.TrafficStatisticItem>
> {
  return get(`/traffic-service/${version}/traffic/statistical/totalTraffic/dayGrowthRate`, {});
}

/**
 * 获取当日客流量统计数据折线图
 */
export async function getCurrentTrafficLine(): Promise<TypeUtil.RequestSelectData> {
  return get(`/report-center/${version}/cg/index/trafficLineChart`, {});
}

/**
 * 获取首页的营收数据
 * @param data
 */
export async function getIncomeDetail(
  data: SearchTimeRangeParams,
): Promise<TypeUtil.RequestSelectData> {
  return get(`/venue-service/${version}/cgs/work/index/findOrderDetailPriceChart`, data);
}

/**
 * 获取首页的营收数据
 * @param data
 */
export async function getIncome(data: SearchDateRangeParams): Promise<TypeUtil.RequestSelectData> {
  return get(`/venue-report/${version}/venue/index/incomeByFromToDate`, data);
}
