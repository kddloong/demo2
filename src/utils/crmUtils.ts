/**
 * CRM 是否关注
 */
export class CRMStar {
  // 已关注
  static STAR = 1;
  // 未关注
  static UN_STAR = 0;
}

/**
 * 发票状态
 */
export class CRMInvoiceStatus {
  // 未开票
  static UN_INVOICED = '0';
  // 已开票
  static INVOICING = '1';
}

/**
 * CRM 各个列表类型
 */
export class CRMListType {
  // 全部
  static ALL = '1';
  // 我负责的
  static MINE = '2';
  // 下属负责的
  static UNDERLING = '3';
  // 我关注的
  static FOCUSING = '4';
}
