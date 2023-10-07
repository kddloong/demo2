export declare namespace VenueCode {
  interface VenueCodeDetailItem {
    bookDate: string;
    bookStatus: string;
    bookTimeFrom: string;
    bookTimeTo: string;
    expireTime: string;
    id: string;
    ticketStatus: string;
    todayDate: string;
    venueName: string;
    verificationTime: string;
  }

  interface VenueCodeItem {
    actTotalPrice: number;
    createDate: string;
    details: VenueCodeDetailItem[];
    id: string;
    imageUrl: string;
    num: number;
    openId: string;
    orderItem: string;
    orderNo: string;
    payDelayTime: string;
    payStatus: string;
    status: string;
    title: string;
    totalDeposit: number;
    totalPrice: number;
    totalRefundAmount: number;
    venueId: string;
    venueName: string;
  }
}
