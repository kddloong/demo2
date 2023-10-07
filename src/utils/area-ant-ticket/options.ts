import { TICKET_DETAIL, USE_ORDER_DETAIL } from '@/utils/ticket-and-reverse';

/**
 * 预定订单子订单状态显示
 */
export const reverseDetailOrderStatusOptions = {
  [USE_ORDER_DETAIL.NEED_PAY]: {
    label: '待付款',
    color: 'green',
  },
  [USE_ORDER_DETAIL.NEED_VERIFY]: {
    label: '待核销',
    color: 'green',
  },
  [USE_ORDER_DETAIL.FINISH_STATUS]: {
    label: '已完成',
    color: 'blue',
  },
  [USE_ORDER_DETAIL.CANCELED_STATUS]: {
    label: '已取消',
    color: 'grey',
  },
  [USE_ORDER_DETAIL.FINISH_STATUS]: {
    label: '完成',
    color: 'green',
  },
};

/**
 * 售票订单子订单的状态
 */
export const ticketDetailOrderStatusObj = {
  [TICKET_DETAIL.WILL_PAY_STATUS]: {
    label: '待支付',
    color: 'green',
  },
  [TICKET_DETAIL.WILL_VERIFY_STATUS]: {
    label: '待核销',
    color: 'green',
  },
  [TICKET_DETAIL.CANCEL_STATUS]: {
    label: '已取消',
    color: 'red',
  },
  [TICKET_DETAIL.BACK_PRICE_STATUS]: {
    label: '已退款',
    color: 'grey',
  },
  [TICKET_DETAIL.WILL_COMMENT_STATUS]: {
    label: '待评价',
    color: 'geekblue',
  },
  [TICKET_DETAIL.FINISH_STATUS]: {
    label: '已完成',
    color: 'lime',
  },
};
