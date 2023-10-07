import { TypeUtil } from '../../../../types/utils';
import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { ContractMode } from '../../../../types/setting/base-setting/contract';

// 合同管理列表
export async function getContractModeList(
  params: TypeUtil.RequestTableParams,
): Promise<TypeUtil.RequestTableResult<ContractMode.ContractModeDetail[]>> {
  return get(`/venue-service/${version}/cgs/contract/list`, params);
}

// 保存或者修改合同
export async function saveContractMode(
  params: ContractMode.ContractModeDetail,
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/contract/saveOrUpdate`, params);
}

// 获取合同详细信息
export async function getContractModeInfoById(
  id: string,
): Promise<TypeUtil.RequestResult<ContractMode.ContractModeDetail>> {
  return get(`/venue-service/${version}/cgs/contract/${id}`);
}

/**
 * 根据会员卡id获取会员卡配置的协议和合同
 * @param configId
 */
export async function fetchContractByConfigId(
  configId: string,
): Promise<TypeUtil.RequestResult<{ agree: string; description: string }>> {
  return get(`/venue-service/${version}/cgs/contract/memContract`, { configId });
}
