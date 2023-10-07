import { CLIENT_VERSION as version } from '@/utils/utils';
import { get } from '@/services/request/request_tools';
import { LabelValueItem, SearchTimeRangeParams, TypeUtil } from 'types/utils';
import { PassengerFlowCamera } from 'types/traffic-statistic/camera-workplace';

const baseUrl = `/traffic-service/${version}/traffic/statistical`;

/**
 * 获取摄像头客流信息
 * @param params
 */
export async function getCameraTrafficList(params: {
  todayDate: string;
}): Promise<TypeUtil.RequestResult<PassengerFlowCamera.CameraItem[]>> {
  return get(`/traffic-service/${version}/traffic/statistical/cameraTraffic/list`, params);
}

/**
 * 获取今日客流量统计概览数据
 */
export async function fetchTodayTrafficCameraStatistic(): Promise<
  TypeUtil.RequestResult<PassengerFlowCamera.TodayStatistic>
> {
  return get(`/traffic-service/${version}/traffic/statistical/todayTraffic`, {});
}

/**
 * 获取今日客流量统计列表
 */
export async function fetchTodayTrafficCameraStatisticList(): Promise<
  TypeUtil.RequestResult<PassengerFlowCamera.TodayStatistic[]>
> {
  return get(`/traffic-service/${version}/traffic/statistical/todayTraffic/list`, {});
}

/**
 * 获取当日客流数据的图表数据
 */
export async function fetchTodayTrafficCameraStatisticChart(): Promise<
  TypeUtil.RequestResult<LabelValueItem[]>
> {
  return get(`${baseUrl}/todayTraffic/chart`, {});
}

/**
 * 根据时间段获取客流量统计概览数据
 */
export async function fetchRangeTrafficCameraStatistic(
  params: SearchTimeRangeParams,
): Promise<TypeUtil.RequestResult<PassengerFlowCamera.TodayStatistic>> {
  return get(`/traffic-service/${version}/traffic/statistical/dateRangeTraffic`, params);
}

/**
 * 根据时间段获取客流量统计列表
 */
export async function fetchRangeTrafficCameraStatisticList(
  params: SearchTimeRangeParams,
): Promise<TypeUtil.RequestResult<PassengerFlowCamera.TodayStatistic[]>> {
  return get(`/traffic-service/${version}/traffic/statistical/dateRangeTraffic/list`, params);
}

/**
 * 根据时间段获取客流量统计图表数据
 * @param params
 */
export async function fetchRangeTrafficCameraStatisticChart(
  params: SearchTimeRangeParams,
): Promise<TypeUtil.RequestResult> {
  return get(`${baseUrl}/dateRangeTraffic/chart`, params);
}

/**
 * 获取年度客流统计数据
 * @param params
 */
export async function fetchYearTrafficCameraStatistic(
  params: SearchTimeRangeParams,
): Promise<TypeUtil.RequestResult> {
  return get(`${baseUrl}/monthTraffic`, params);
}

/**
 * 获取年度客流量统计列表
 * @param params
 */
export async function fetchYearTrafficCameraStatisticList(
  params: SearchTimeRangeParams,
): Promise<TypeUtil.RequestResult> {
  return get(`${baseUrl}/monthTraffic/list`, params);
}

/**
 * 获取年度客流量统计图表
 * @param params
 */
export async function fetchYearTrafficCameraStatisticChart(
  params: SearchTimeRangeParams,
): Promise<TypeUtil.RequestResult> {
  return get(`${baseUrl}/monthTraffic/chart`, params);
}
