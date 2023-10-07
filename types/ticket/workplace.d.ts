import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

export interface TagType {
  key: string;
  label: string;
}

export type GeographicType = {
  province: {
    label: string;
    key: string;
  };
  city: {
    label: string;
    key: string;
  };
};

export type NoticeType = {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
};

export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export declare namespace SellTicketSpace {
  interface CreatePcOrderFreeItem {
    freeNum: number;
    freePersonId?: string;
    freePrice: number;
    freeIntervalId?: string;
  }

  type CreatePCOrderDetailItem = {
    num: number;
    price: number;
    ticketId: string;
    timeFrom: string;
    timeTo: string;
    useDate: string;
  };

  interface CreatePcOrderParams {
    timeFlag: string;
    venueId: string;
    memberId: string;
    phoneNo: string;
    deposit: number;
    name: string;
    details: CreatePCOrderDetailItem[];
  }

  /**
   * 返回的票的基本信息
   */
  type VenueTicketPriceBaseItem = {
    //展示的图片
    imageUrl: string;
    //是否限制人群
    isLimit: string;
    //限制人群
    limitPersonId: string;
    //限制人群
    limitPersonStr: string;
    //使用提醒
    notice: string;
    //使用人数
    people: number;
    //排序
    sort: number;
    //票券名称
    title: string;
    //关联场馆ID
    venueId: string;
    //场馆名称
    venueName: string;
    description: string;

    isKu: string;

    realTimeInventory: number;
  };

  //用于显示 TicketSettingBaseCard
  type VenueTicketPriceBaseItemForCard = VenueTicketPriceBaseItem & {
    // 统计setting里面设置了几种票
    ticketsLength: number;
    isHavaLowFree: boolean;
  };

  // price/list 接口实际返回的信息
  type VenueTicketPriceItem = VenueTicketPriceBaseItem & {
    details: VenueTicketPriceDetailItem[];
  };

  // 票的价格设置
  type VenueTicketPriceDetailItem = {
    //
    price: number;
    //
    ticketId: string;
    //
    timeFrom: string;
    //
    timeTo: string;
    //
    type: string;
    //
    useDate: string;
    //
    week: number;

    timeId: string;

    realTimeInventory: number;
  };

  type ShowChooseTicketItem = {
    title?: string;
    num: number;
    price: number;
    ticketId: string;
    timeFrom: string;
    timeTo: string;
    useDate: string;
    timeId: string;
  };
}

export declare namespace OrderDetailSpace {
  interface DetailItem {
    type: string;
    num: number;
    price: number;
    actPrice: number;
  }
}

export declare namespace BookOrder {
  interface BookOrderItem {
    actNum: number;
    actTotalPrice: number;
    actualMobilizationNumber: number;
    backOrderNo: string;
    billNo: string;
    id: string;
    memberId: string;
    name: string;
    nationMemberName: string;
    nationOrderId: string;
    nationSportType: number;
    num: number;
    openId: string;
    orderCode: string;
    orderItem: string;
    orderNo: string;
    orderType: string;
    payDelayTime: string;
    payStatus: string;
    payTime?: any;
    payType: string;
    phoneNo: string;
    preMobilizationNumber: number;
    refundReason: string;
    source: string;
    status: string;
    timingFlag: string;
    title: string;
    todayDate: string;
    totalDeposit: number;
    totalPrice: number;
    totalRefundAmount: number;
    venueId: string;
  }

  interface BookOrderItemParams {
    orderNo?: string;
    phoneNo?: string;
    status?: string;
    orderItem: string;
  }

  interface BookOrderItemParamsForWorkplace extends BookOrderItemParams {
    todayDate?: string;
    venueId?: string;
  }

  type BookOrderDataParams = RequestTableParam & BookOrderItemParams;

  type BookOrderDataParamsForWorkplace = RequestTableParam & BookOrderItemParamsForWorkplace;
}

export declare namespace BookDetailOrderManage {
  interface BookDetailOrderItem {
    actPrice: number;
    createDate: string;
    createName: string;
    expireTime: string;
    freePersonId: string | string[];
    id: string;
    isFree: string;
    orderId: string;
    price: number;
    refundAmount: number;
    status: string;
    todayDate: string;
    updateDate: string;
    updateName: string;
    versions: number;

    bookDate?: string;
    bookTimeFrom?: string;
    bookTimeTo?: string;
    venueId?: string;
  }
}

export declare namespace VenueTodayPriceManage {
  interface VenueTodayPriceItem {
    chargeType: string;
    currentDate: string;
    freePerson: string;
    freePersons: LabelValueItem[];
    isFree: string; //是否限制地面人群
    price: number;
    timeFrom: string;
    timeInterval: string;
    timeIntervalId: string;
    timeTo: string;
    type: string; //0：正常价格   1：低价  2：免费价格  3:假期价格
    week: number;
  }
}

export declare namespace UserVenueManage {
  interface UserVenueItem {
    beginTime: string;
    bookType: string;
    chargingType: string;
    enableHoliday: string;
    enableSpecial: string;
    endTime: string;
    fieldTypeId: string;
    fieldTypeName: string;
    id: string;
    isBook: string;
    isOvertime: string;
    overTimePrice: number;
    overTimeUnit: number;
    price: number;
    status: string;
    useType: string;
    useUnit: number;
    venueId: string;
    venueName: string;
    weekOrDay: string;
  }
}

export declare namespace VenueView {
  interface VenueViewItem {
    amount: number;
    checkAmount: number;
    checkOrderNum: number;
    hello: string;
    orderNum: number;
    useOrderAmount: number;
    useOrderNum: number;
    venueName: string;
  }
}

export declare namespace VenueWorkplace {
  interface BaseSellTicketsItem {
    id: string;
    num?: number;
    price: number;
    type: string | priceType;
    freePerson?: string;
    chargeType: string;
    currentDate: string;
    currentTimeFrom: string;
    currentTimeTo: string;
    isFree: string;
  }

  type SellTicketsItem = Partial<BaseSellTicketsItem>;
}
