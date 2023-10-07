import { RequestTableParam } from '../../../../types/utils';
import { message } from 'antd';
import {
  fetchContractByConfigId,
  getContractModeInfoById,
  getContractModeList,
  saveContractMode,
} from '@/services/setting/base-setting/contract';
import { ContractMode } from '../../../../types/setting/base-setting/contract';
import { handleFetchSelectData } from '@/utils/select';
import { CLIENT_VERSION as version } from '@/utils/utils';

/**
 * 合同管理列表
 * @param params
 */
export const handleFetchContractModeList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getContractModeList(params);

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

/**
 * 保存或者修改合同
 * @param params
 */
export const handleSaveContractMode = async (params: ContractMode.ContractModeDetail) => {
  try {
    const result = await saveContractMode(params);

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
      };
    } else {
      message.error(result.msg);
      return {
        success: false,
      };
    }
  } catch (err) {
    return {
      success: false,
    };
  }
};

/**
 * 获取合同详细信息
 * @param id
 */
export const handleFetchContractModeInfoById = async (id: string) => {
  try {
    const result = await getContractModeInfoById(id);

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
      };
    } else {
      message.error(result.msg);
      return {
        data: null,
        success: false,
      };
    }
  } catch (err) {
    return {
      data: null,
      success: false,
    };
  }
};

/**
 * 合同下拉框显示
 * @param id
 */
export const handleFetchContractModeSelect = async () => {
  return await handleFetchSelectData(`/venue-service/${version}/cgs/contract/select`);
};

/**
 * 获取会员卡详情
 * @param configId
 */
export const handleFetchContractByConfigId = async (configId: string) => {
  try {
    const result = await fetchContractByConfigId(configId);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: null };
    }
  } catch (err) {
    return { success: false, data: null };
  }
};
