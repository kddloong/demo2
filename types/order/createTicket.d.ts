/**
 * 创建售票订单的参数
 */
export declare namespace CreateTicket {
  interface TicketItem {
    num: number;
    price: number;
    ticketId: string;
    timeFrom: string;
    timeTo: string;
    useDate: string;
  }

  interface Ticket {
    // 身份证号
    cardNo: string;
    contact: string;
    contactPhoneNo: string;
    memberId: string;
    openId: string;
    venueId: string;
    details: TicketItem[];
  }
}
