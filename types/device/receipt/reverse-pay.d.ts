export declare module ReverseAndTicketReceipt {
  export interface Detail {
    bookDate?: any;
    bookStatus: string;
    bookTimeFrom: string;
    bookTimeTo: string;
    id: string;
    num: number;
    orderCode: string;
    people: number;
    price: number;
    ticketStatus: string;
    timeFrom: string;
    timeTo: string;
    title: string;
    useDate: string;
    venueName: string;
    verificationTime?: any;
  }

  export interface ReverseAndTicketReceipt {
    actCutNum: number;
    actTotalPrice: number;
    address: string;
    clientId: string;
    createDate: string;
    details: Detail[];
    fieldTypeName: string;
    id: string;
    imageUrl: string;
    num: number;
    openId: string;
    orderCode: string;
    orderItem: string;
    orderNo: string;
    payDelayTime: string;
    payStatus: string;
    payType: string;
    phoneNo: string;
    preMobilizationNumber: number;
    status: string;
    tenantId: string;
    title: string;
    totalDeposit: number;
    totalPrice: number;
    totalRefundAmount: number;
    venueBaseImageUrl: string;
    venueBaseName: string;
    venueId: string;
    venueName: string;

    source: string;
  }
}
