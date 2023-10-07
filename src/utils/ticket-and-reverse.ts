export const USE_ORDER = {
  //*订单状态―0，待付款﹑1:待核销―2:已取消3:已核销4:已退款5:待评价6:完成*/

  // 待付款, 待支付
  WILL_PAY_STATUS: '0',
  // 待核销
  WILL_VERIFY_STATUS: '1',
  // 已取消
  CANCEL_STATUS: '2',
  // 已核销
  VERIFIED_STATUS: '3',
  // 已退款
  BACK_PRICE_STATUS: '4',
  // 完成
  FINISH_STATUS: '6',
};

// 子订单的状态
export const USE_ORDER_DETAIL = {
  //*预定订单明细状态―0 待付款, 1 待核销 2已取消 3 已核销 6 完成*/
  // 待付款
  NEED_PAY: '0',
  // 待核销
  NEED_VERIFY: '1',
  // 已取消
  CANCELED_STATUS: '2',
  // 已核销
  VERIFIED_STATUS: '3',
  // 完成
  FINISH_STATUS: '6',
};

export const TICKET_DETAIL = {
  //*状态―0，待付款﹑1，待核销2:已取消﹑3:已核销﹐4:已退款― 5:待评价6:已完成7:已过期*/
  //待付款
  WILL_PAY_STATUS: '0',
  // 待核销
  WILL_VERIFY_STATUS: '1',
  // 已取消
  CANCEL_STATUS: '2',
  // 已核销
  VERIFIED_STATUS: '3',
  // 已退款
  BACK_PRICE_STATUS: '4',
  // 待评价
  WILL_COMMENT_STATUS: '5',
  // 已完成
  FINISH_STATUS: '6',
  // 已过期
  // OVERDUE_STATUS: '7',
};
