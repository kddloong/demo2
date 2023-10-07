import { message } from 'antd';
import { DATE_FORMAT } from '@/utils/utils';
import dayjs from 'dayjs';
import {
  fetchVenueCurrentTicketPrice,
  getVenueListByCurrentLogin,
  getVenueOpenInfo,
  getVenuePrice,
  getWorkPlaceView,
  orderDetailRefund,
  payAndCheckPcOrder,
  scheduleOrderRefund,
} from '@/services/ticket/workplace';

/**
 * 处理根据当前登录的userId 来获取可管理的场馆
 * @date 2022-01-12 16:54:12
 * @namespace UserVenueManage
 */
export const handleVenueListByCurrentLogin = async () => {
  try {
    const result = await getVenueListByCurrentLogin();

    if (result.success) {
      return result.data || [];
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 处理场馆概览数据
 * @date 2022-02-23 13:18:29
 * @param {String} type 0场地， 2售票
 * @namespace VenueView
 */
export const handleWorkPlaceView = async (type: string) => {
  try {
    const result = await getWorkPlaceView(type);

    if (result.success) {
      return result.data || [];
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    return {};
  }
};

/**
 * 处理预定订单退款请求
 * @date 2022-01-13 13:24:39
 * @param orderNo
 * @param price
 */
export const handleOrderRefund = async (orderNo: string, price: number, refundReason: string) => {
  const hide = message.loading('正在提交退款请求！');

  try {
    const result = await scheduleOrderRefund(orderNo, price, refundReason);

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
 * 处理订单明细退款
 * @date 2022-01-13 13:57:30
 * @param detail
 */
export const handleOrderDetailRefund = async (detail: string) => {
  const hide = message.loading('正在提交退款信息！');

  try {
    const result = await orderDetailRefund(detail);

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
 * 处理获取的场馆开放信息
 * @date 2022-04-14 08:58:17
 * @param id
 * @param date
 * @namespace VenueTodayPriceManage
 */
export const handleGetVenueOpenInfo = async (id: string, date = dayjs().format('YYYY-MM-DD')) => {
  try {
    const result = await getVenueOpenInfo(id, date);

    if (result.success) {
      return result.data || [];
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 处理手动提交并核销订单
 * @date 2022-01-13 09:25:09
 * @param checkType 核销方式
 * @param id 订单ID
 * @param payType 付款方式
 * @param discountReasonId 折扣方式
 */
export const handlePayAndCheckPcOrder = async (
  checkType: string,
  id: string,
  payType: string,
  discountReasonId: string,
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await payAndCheckPcOrder(checkType, id, payType, discountReasonId);

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
 * 处理获取的票务信息， 用于工作台售票
 * @version 0.0.2 调整调用的接口
 * @namespace SellTicketSpace
 * @date 2022-09-20
 * @param venueId 场馆ID
 * @param currentDate
 */
export const handleGetVenuePrice = async (
  venueId: string,
  currentDate: string = dayjs().format(DATE_FORMAT),
) => {
  try {
    const result = await getVenuePrice(venueId, currentDate);

    if (result.success) {
      return result.data || [];
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 获取按日期查询的票价列表
 * @param venueId
 */
export const handleFetchVenueCurrentPrice = async (venueId: string, date: string) => {
  try {
    const result = await fetchVenueCurrentTicketPrice(venueId, date);
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
