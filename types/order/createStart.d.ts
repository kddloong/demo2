/**
 * 创建开场订单的参数
 */
export declare namespace CreateStart {
  interface StartItem {
    startDate: string;
    timeFrom: string;
    timeTo: string;
    venueId: string;
  }

  interface Start {
    contact: string;
    contactPhoneNo: string;
    details: StartItem[];
    memberId: string;
    memo: string;
    // 开场类型 '0' 立即开场   '1'选择开场
    type: string;
    venueId: string;
    mobilizationNumber: number;
  }
}
