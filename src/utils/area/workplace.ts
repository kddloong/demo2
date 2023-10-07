import { message } from 'antd';
import {
  doReverseToStart,
  fetchDaysCanBookInAdvance,
  fetchStartOrderByOrderNo,
  fetchStartOrderInfoByOrderId,
  fetchVenueCurrentPrice,
  fetchVenueDatePrice,
  finishAllUseOrder,
  finishUseOrder,
  getAreaManageData,
  getAreaVenueIdSelectData,
  getCurrentStartingOrder,
  getOperationTimeRange,
  getOrderInfoFromWorkplaceStatusId,
  getVenueAreaPrice,
  getVenueSchedule,
  modifyScheduleArea,
  saveAreaReverse,
} from '@/services/area/workplace';
import { CreateBookOrder } from 'types/area/workplace';
import { TypeUtil } from 'types/utils';

/**
 * 获取场地状态
 * @date 2022-05-23
 */
export const handleAreaManageData = async () => {
  try {
    const result = await getAreaManageData();

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
 * 获取当前时间 场地的情况
 * @date 2022-01-19 13:10:44
 * @param { string } id
 */
export const handleCurrentStartingOrder = async (id: string) => {
  try {
    const result = await getCurrentStartingOrder(id);

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
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

/**
 * 处理获取的根据当前场地区域id获取的场地
 * @date 2022-05-17 16:45:54
 * @param venueId
 */
export const handleAreaVenueIdSelectData = async (venueId: string) => {
  try {
    const result = await getAreaVenueIdSelectData(venueId);

    if (result.success) {
      return { data: result.data, success: result.success };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 处理获取的价格
 * @param data
 */
export const handleVenueAreaPrice = async (data: {
  venueId: string;
  timeFrom: string;
  timeTo: string;
  bookDate: string;
}) => {
  try {
    const result = await getVenueAreaPrice(data);

    if (result.success) {
      return { data: result.data, success: true };
    } else {
      message.warning(result.msg);
      return { data: null, success: false };
    }
  } catch (err) {
    return { data: null, success: false };
  }
};

/**
 *
 * @param data
 */
export const handleFinishUseOrder = async (data: TypeUtil.BaseOrderParams) => {
  const hide = message.loading('正在结束订单！');

  try {
    const result = await finishUseOrder(data);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

export const handleFinishAllUseOrder = async (data: { id: string }) => {
  const hide = message.loading('正在清场！');

  try {
    const result = await finishAllUseOrder(data);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 根据子订单id进行预定转开场
 * @param details 子订单ids
 * @param id 主订单id
 */
export const handleDoReverseToStart = async (details: string, id: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await doReverseToStart(details, id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    hide();

    return { success: false };
  }
};

/**
 * 处理更改预定订单场地
 * @date 2022-05-17 17:09:59
 * @param venueId
 * @param orderDetailId
 * @param type '0' 是 开场, '1'是 预定
 */
export const handleModifyScheduleArea = async (
  venueId: string,
  orderDetailId: string,
  type: '0' | '1',
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await modifyScheduleArea(venueId, orderDetailId, type);

    hide();

    if (result.success) {
      message.success(result.msg);
      return result.data;
    } else {
      message.warning(result.msg);
      return '';
    }
  } catch (err) {
    hide();

    return '';
  }
};

/**
 * 处理获取场馆状态
 * 升级到v2
 * @date 2022-01-20 15:35:49
 * @param date
 * @param venueId
 */
export const handleSchedule = async (date: string, venueId: string) => {
  try {
    const result = await getVenueSchedule(venueId, date);

    if (result.success) {
      return {
        success: true,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: {},
      };
    }
  } catch (err) {
    return {
      success: false,
      data: {},
    };
  }
};

// 可以选中的值
const CAN_CHOOSE_STATUS = '0';

const OCCUPY_STATUS = '1';

const REVERSE_STATUS = '2';

const START_STATUS = '3';

// 已选中的值
const CAN_USE_STATUS = '4';

const FINISH_STATUS = '7';

export {
  OCCUPY_STATUS,
  FINISH_STATUS,
  REVERSE_STATUS,
  START_STATUS,
  CAN_USE_STATUS,
  CAN_CHOOSE_STATUS,
};

/**
 *
 * @date 2022-01-18 12:22:40
 * @param venueId
 * @param currentDate
 * @param {fromSetting} type
 */
export const handleOperationTimeRange = async (
  venueId: string,
  currentDate: string,
  type: string,
) => {
  try {
    const result = await getOperationTimeRange(venueId, currentDate, type);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    return {
      success: false,
      data: {},
    };
  }
};

/**
 * 处理获取的订单详细信息, 从控制台双击打开
 * @date 2022-03-17 16:43:02
 * @param id
 * @namespace AreaWorkplaceManage
 */
export const handleOrderInfoFromWorkplace = async (id: string) => {
  try {
    const result = await getOrderInfoFromWorkplaceStatusId(id);

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
 * 处理获取的订单详细信息, 从控制台双击打开
 * @date 2022-10-11
 * @param id
 * @namespace AreaWorkplaceManage
 */
export const handleOrderInfoFromWorkplace2 = async (id: string) => {
  try {
    const result = await getOrderInfoFromWorkplaceStatusId(id);

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
 * 根据订单id获取开场订单的详细信息
 * @date 2022-01-24 15:07:51
 * @param id orderId 订单id
 * @namespace VenueStartOrder
 */
export const handleStartOrderInfoByOrderId = async (id: string) => {
  try {
    const result = await fetchStartOrderInfoByOrderId(id);

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

/**
 * 根据orderNo获取开场订单
 * @param orderNo
 */
export const handleFetchStartOrderByOrderNo = async (orderNo: string) => {
  try {
    const result = await fetchStartOrderByOrderNo(orderNo);

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

/**
 * 获取可提前几天预定场馆
 * @param venueId
 */
export const handleFetchDaysCanBookInAdvance = async (venueId: string) => {
  try {
    const result = await fetchDaysCanBookInAdvance(venueId);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: 7 };
    }
  } catch (err) {
    return { success: false, data: 7 };
  }
};

/**
 * 处理场地的预定
 * @param data
 * @param hideMessage
 */
export const handleSaveAreaReverse = async (
  data: CreateBookOrder.CreateBookOrderItem,
  hideMessage: boolean = false,
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await saveAreaReverse(data);

    hide();

    if (result.success) {
      if (!hideMessage) {
        message.success(result.msg);
      }

      return {
        success: true,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: '',
      };
    }
  } catch (err) {
    hide();

    return {
      success: false,
      data: '',
    };
  }
};

/**
 * 返回按日期的所有价格列表
 * @param venueId
 */
export const handleFetchVenueDatePrice = async (venueId: string) => {
  try {
    const result = await fetchVenueDatePrice(venueId);
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
 * 返回当前时间，可用的价格列表
 * @param venueId
 */
export const handleFetchVenueCurrentPrice = async (venueId: string) => {
  try {
    const result = await fetchVenueCurrentPrice(venueId);
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
