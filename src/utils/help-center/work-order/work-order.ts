import {
  askWorkProcess,
  closeWorkOrder,
  fetchSingleWorkOrder,
  fetchWorkOrderList,
  fetchWorkOrderProcess,
  fetchWorkOrderProcessDetail,
  saveWorkOrder,
} from '@/services/help-center/work-order/work-order';

import { message } from 'antd';
import { WorkOrderDesc } from '../../../../types/help-center/work-order/work-order';
import { RequestTableParam } from 'types/utils';

/**
 * 查询工单信息
 * @param id
 */
export const handleFetchWorkOrderProcessById = async (id: string) => {
  try {
    const result = await fetchWorkOrderProcess(id);
    if (result.success) {
      return {
        data: result.data,
        success: result.success,
      };
    } else {
      message.warning(result.msg);
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
 * 工单回复内容列表
 * @param workOrderId
 */
export const handleFetchWorkOrderProcessDetailById = async (workOrderId: string) => {
  try {
    const result = await fetchWorkOrderProcessDetail(workOrderId);
    if (result.success) {
      return {
        data: result.data,
        success: result.success,
      };
    } else {
      message.warning(result.msg);
      return {
        data: [],
        success: false,
      };
    }
  } catch (err) {
    return {
      data: [],
      success: false,
    };
  }
};

/**
 * 关闭工单
 * @param id
 */
export const handleCloseWorkOrderById = async (id: string) => {
  const hide = message.loading('正在关闭');
  try {
    const result = await closeWorkOrder(id);
    hide();

    if (result.success) {
      message.success(result.msg);
      return {
        success: result.success,
      };
    } else {
      message.error(result.msg);
      return {
        success: false,
      };
    }
  } catch (err) {
    hide();
    return {
      data: null,
      success: false,
    };
  }
};

/**
 * 保存或修改工单
 * @param data
 */
export const handleSaveWorkOrder = async (data: WorkOrderDesc.DescDetail) => {
  const hide = message.loading('正在提交工单描述');

  try {
    const result = await saveWorkOrder(data);
    hide();
    if (result) {
      message.success(result.msg);
      return {
        success: result.success,
      };
    } else {
      message.error('保存失败，请稍后重试');
      return {
        success: false,
      };
    }
  } catch (err) {
    hide();
    return {
      success: false,
    };
  }
};

/**
 * 查询工单信息
 * @param id
 */
export const handleFetchSingleWorkOrderById = async (id: string) => {
  try {
    const result = await fetchSingleWorkOrder(id);
    if (result.success) {
      return {
        data: result.data,
        success: result.success,
      };
    } else {
      message.warning(result.msg);
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
 * 工单追问
 * @param data
 */
export const handleAskWorkProcessById = async (data: WorkOrderDesc.DescDetail) => {
  const hide = message.loading('正在提交');
  try {
    const result = await askWorkProcess(data);
    hide();

    if (result.success) {
      return {
        success: result.success,
      };
    } else {
      return {
        success: false,
      };
    }
  } catch (err) {
    hide();
    return {
      success: false,
    };
  }
};

/**
 * 分页查询工单列表
 * @param params
 */
export const handleFetchWorkOrderList = async (params: RequestTableParam) => {
  try {
    const result = await fetchWorkOrderList(params);
    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {
        data: [],
        success: result.success,
      };
    }
  } catch (err) {
    return {
      data: [],
      success: false,
    };
  }
};
