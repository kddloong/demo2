import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { RequestResult, RequestTableParam, RequestTableResult } from 'types/utils';
import type {
  WorkOrderDesc,
  WorkOrderListType,
} from '../../../../types/help-center/work-order/work-order';

/**
 * 分页查询工单列表
 */
export async function fetchWorkOrderList(
  params: RequestTableParam,
): Promise<RequestTableResult<WorkOrderListType[]>> {
  return get(`/biz-service/${version}/web/workOrder/list`, params);
}

/**
 * 保存或修改工单
 */
export async function saveWorkOrder(data: WorkOrderDesc.DescDetail): Promise<RequestResult> {
  return post(`/biz-service/${version}/web/workOrder/save`, { ...data });
}

/**
 * 查询工单信息
 * @param id
 */
export async function fetchWorkOrderProcess(
  id: string,
): Promise<RequestResult<WorkOrderDesc.DescDetailData>> {
  return get(`/biz-service/${version}/web/workOrder/${id}`, {});
}

/**
 * 工单回复内容列表
 * @param workOrderId
 */
export async function fetchWorkOrderProcessDetail(
  workOrderId: string,
): Promise<RequestResult<WorkOrderDesc.ProcessDetail[]>> {
  return get(`/biz-service/${version}/web/workOrder/detail`, { workOrderId: workOrderId });
}

/**
 * 查询工单信息
 * @param id
 */
export async function fetchSingleWorkOrder(
  id: string,
): Promise<RequestResult<WorkOrderDesc.DescDetailData>> {
  return get(`/biz-service/${version}/web/workOrder/${id}`, {});
}

/**
 * 工单追问
 *
 * @param data
 */
export async function askWorkProcess(data: WorkOrderDesc.DescDetail): Promise<RequestResult> {
  return post(`/biz-service/${version}/web/workOrder/save/detail`, { ...data });
}

/**
 * 关闭工单
 * @param id
 */
export async function closeWorkOrder(id: string): Promise<RequestResult> {
  return post(`/biz-service/${version}/web/workOrder/close`, { id });
}
