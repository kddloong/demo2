/**
 * 创建预定订单的参数
 */
export declare namespace CreateReverse {
  interface ReverseItem {
    bookDate: string;
    price: number;
    timeFrom: string;
    timeTo: string;
    venueId: string;
  }
  interface Reverse {
    contact: string;
    contactPhoneNo: string;
    details: ReverseItem[];
    memberId: string;
    // 非必填
    openId: string;
    venueId: string;
    preMobilizationNumber: number;
  }
}
