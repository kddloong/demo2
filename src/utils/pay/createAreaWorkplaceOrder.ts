import { ChooseVenueTimeRanges } from '@/pages/area/workplace2/components/AreaWorkplace/context';
import { handleCreateAreaStartOrder, StartType } from '@/utils/area/start';
import { sendLog } from '@/utils/utils';
import { message } from 'antd';
import { handleCreateReverseOrder } from '@/utils/area/schedule';
import { handleCreateOccupyOrder } from '@/utils/area/occupy';

type AreaWorkplaceBaseInfo = {
  venueId: string;
  operationType: 'start' | 'reverse' | 'occupy';

  contact: string;
  contactPhoneNo: string;
  memberId: string;

  isOnlyExecutePay: boolean;
};

type StartParams = {
  memo: string;
  type: string;
  mobilizationNumber: number;
} | null;

type ReverseParams = {
  openId: string;
  preMobilizationNumber: number;
} | null;

type OccupyParams = {
  reason: string;
} | null;

/**
 * 创建场馆工作台 的 预定及开场订单
 * todo 可能还有占用订单
 */
export const createAreaWorkplaceOrder = async (
  details: ChooseVenueTimeRanges[],
  baseOrderParams: AreaWorkplaceBaseInfo,
  startParams: StartParams,
  reverseParams: ReverseParams,
  occupyParams: OccupyParams,
  successCallback: (orderId: string) => void,
) => {
  const { venueId, operationType, contact, contactPhoneNo, memberId, isOnlyExecutePay } =
    baseOrderParams;

  if (isOnlyExecutePay) {
    successCallback('');

    return;
  }

  if (details?.length && details.length <= 0) {
    message.warning('请选择场地进行操作!');
    return;
  }

  debugger;

  if (operationType === 'start') {
    if (!startParams) {
      sendLog(`获取创建开场订单失败, 缺失必要参数`);
      return;
    }

    const startDetails = details.map((detail) => ({
      startDate: detail.bookDate,
      timeFrom: detail.timeFrom,
      timeTo: detail.timeTo,
      venueId: detail.venueId,
    }));

    const result = await handleCreateAreaStartOrder({
      venueId,
      contact,
      contactPhoneNo,
      memberId,
      memo: startParams.memo,
      // type: startParams.type,
      type: StartType.CHOOSE_START,
      mobilizationNumber: startParams.mobilizationNumber,
      details: startDetails,
    });

    if (result.success) {
      successCallback(result.data);
    }
  }

  if (operationType === 'reverse') {
    if (!reverseParams) {
      sendLog(`获取创建预定订单失败, 缺失必要参数`);
      return;
    }

    const reverseDetails = details.map((detail) => ({
      bookDate: detail.bookDate,
      timeFrom: detail.timeFrom,
      timeTo: detail.timeTo,
      venueId: detail.venueId,
      price: detail.price,
    }));

    const result = await handleCreateReverseOrder({
      details: reverseDetails,
      contact,
      contactPhoneNo,
      memberId,
      venueId,
      openId: reverseParams.openId,
      preMobilizationNumber: reverseParams.preMobilizationNumber,
    });

    if (result.success) {
      successCallback(result.data);
    }
  }

  if (operationType === 'occupy') {
    if (!occupyParams) {
      sendLog(`获取创建占用订单失败, 缺失必要参数`);
      return;
    }

    const occupyDetails = details.map((detail) => ({
      occupyDate: detail.bookDate,
      timeFrom: detail.timeFrom,
      timeTo: detail.timeTo,
      venueId: detail.venueId,
    }));

    const result = await handleCreateOccupyOrder({
      details: occupyDetails,
      contact,
      contactPhoneNo,
      venueId,
      businessId: '',
      reason: occupyParams.reason,
      content: '',
    });

    if (result.success) {
      successCallback('');
    }
  }

  return;
};
