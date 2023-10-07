import {
  addModuleToWorkplace,
  changeCompPosition,
  fetchCurrentModuleCompShow,
  fetchWorkplaceModules,
} from '@/services/workplace_component';
import { message } from 'antd';

/**
 * 获取当前模块的排列信息
 * @param type
 */
export const handleFetchCurrentModuleCompShow = async (type: string) => {
  try {
    const result = await fetchCurrentModuleCompShow(type);

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
 * 改变模块的位置
 * @param params
 */
export const handleChangeWorkplaceCompPosition = async (
  params: WorkplaceComponent.ChangeCompParams,
) => {
  try {
    const result = await changeCompPosition(params);

    if (result.success) {
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    return { success: false };
  }
};

/**
 * 改变模块的位置
 * @param params
 */
export const handleAddModuleToWorkplace = async (params: WorkplaceComponent.AddModuleParams) => {
  try {
    const result = await addModuleToWorkplace(params);

    if (result.success) {
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    return { success: false };
  }
};

/**
 * 获取当前工作台可以使用哪些模块
 */
export const handleFetchWorkplaceModules = async (type: string) => {
  try {
    const result = await fetchWorkplaceModules(type);

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
