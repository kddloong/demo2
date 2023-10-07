import { message } from 'antd';
import { SellTicketSpace } from 'types/ticket/workplace';
import { handleCreateTicketOrder } from '../ticket/order';

type TicketWorkplaceBaseInfo = {
  venueId: string;
  contact: string;
  contactPhoneNo: string;
  memberId: string;

  isOnlyExecutePay: boolean;
};

type TicketParams = {
  openId: string;
  preMobilizationNumber: number;
};

/**
 * 创建售票工作台的售票订单
 */
export const createTicketWorkplaceOrder = async (
  details: SellTicketSpace.ShowChooseTicketItem[],
  baseOrderParams: TicketWorkplaceBaseInfo,
  ticketParams: TicketParams,
  successCallback: (orderId: string) => void,
) => {
  const { venueId, contact, contactPhoneNo, memberId, isOnlyExecutePay } = baseOrderParams;

  if (isOnlyExecutePay) {
    successCallback('');

    return;
  }

  if (details?.length && details.length <= 0) {
    message.warning('请选择场地进行操作!');
    return;
  }

  const reverseDetails = details.map((detail) => ({
    useDate: detail.useDate,
    timeFrom: detail.timeFrom,
    timeTo: detail.timeTo,
    ticketId: detail.ticketId,
    price: detail.price,
    num: detail.num,
  }));

  const result = await handleCreateTicketOrder({
    details: reverseDetails,
    contact,
    contactPhoneNo,
    memberId,
    venueId,
    cardNo: '',
    openId: ticketParams.openId,
  });

  if (result.success) {
    successCallback(result.data);
  }
  return;
};
