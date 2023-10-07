import { ContentStatusEnum } from '@/pages/area/workplace2/components/BookSiteContent/typs';

export declare namespace StartOrderTable {
  interface WorkPlaceStartOrderItem {
    /** 时间戳格式 */
    createDate: number;
    id: string;
    name: string;
    /**开场订单id*/
    orderId: string;
    price: number;
    /**开场订单状态
     * StartOrderStatusEnum
     * */
    status: string;
    timeFrom: string;
    /**已开场时长*/
    timeShow: string;
    timeTo: string;
    venueName: string;
  }
}

export declare namespace AreaWorkplace {
  // 本场馆的场管区域为场地的列表, 作为tab页
  interface AreaTabItem {
    bookType: string;
    chargingType: string;
    enableHoliday: string;
    enableSpecial: string;
    id: string;
    isBook: string;
    isOvertime: string;
    opBeginTime: string;
    opEndTime: string;
    overTimePrice: number;
    overTimeUnit: number;
    parentId: string;
    price: number;
    status: string;
    type: string;
    useType: string;
    useUnit: number;
    venueId: string;
    venueName: string;
    venueNo: string;
    weekOrDay: string;
  }

  type SourceEnum =
    | ContentStatusEnum.REVERSE_AND_PAY
    | ContentStatusEnum.START_AND_PAY
    | ContentStatusEnum.USE;

  type CurrentType<T> = T extends ContentStatusEnum.REVERSE_AND_PAY
    ? StartWorkplaceItem
    : ScheduleWorkplaceItem;

  type CurrentDetailType<T> = T extends ContentStatusEnum.REVERSE_AND_PAY
    ? StartWorkplaceDetailItem
    : ScheduleWorkplaceDetailItem;

  interface StartWorkplaceDetailItem extends BaseResponseField {
    actNum: number;
    actPrice: number;
    discountId: string;
    id: string;
    isDiscount: string;
    orderCode: string;
    orderId: string;
    payStatus: string;
    payType: string;
    price: number;
    status: string;
    timeFrom: string;
    timeTo: string;
    type: string;
    useDate: string;
    venueId: string;
    venueName: string;
  }

  interface StartWorkplaceItem extends BaseResponseField {
    actNum: number;
    actTotalPrice: number;
    alreadyActPrice: number;
    alreadyPrice: number;
    billNo: string;
    bookNo: string;
    buyerId: string;
    contact: string;
    contactPhoneNo: string;
    deposit: number;
    details: StartWorkplaceDetailItem[];
    id: string;
    memberId: string;
    memo: string;
    mobilizationNumber: number;
    orderCode: string;
    orderNo: string;
    payStatus: string;
    payType: string;
    status: string;
    todayDate: string;
    totalPrice: number;
    totalRefundAmount: number;
    venueId: string;

    source: string;
  }

  interface ScheduleWorkplaceDetailItem extends BaseResponseField {
    actNum: number;
    actPrice: number;
    bookDate: string;
    bookTimeFrom: string;
    bookTimeTo: string;
    cancelReason: string;
    cancelReasonId: string;
    discountReasonId: string;
    freePersonId: string;
    id: string;
    isFree: string;
    orderCode: string;
    orderId: string;
    price: number;
    refundAmount: number;
    status: string;
    venueId: string;
    venueName: string;
    verificationUser: string;
  }

  interface ScheduleWorkplaceItem extends BaseResponseField {
    actNum: number;
    actTotalPrice: number;
    actualMobilizationNumber: number;
    backOrderNo: string;
    billNo: string;
    details: ScheduleWorkplaceDetailItem[];
    id: string;
    memberId: string;
    name: string;
    num: number;
    openId: string;
    orderCode: string;
    orderItem: string;
    orderNo: string;
    orderType: string;
    payDelayTime: string;
    payStatus: string;
    payTime: string;
    payType: string;
    phoneNo: string;
    preMobilizationNumber: number;
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
}

export declare namespace BookSiteContent {
  /* Times 是 从 beginTime 到 endTime , 每隔 step 取一次值
                                    假设 beginTime 是 08:00,  endTime 是 09:30
                                    step 是 30 (单位是分)

                                    那么 Times = "08:00" | "08:30" | "09:00" | "09:30";
                                 */

  interface TimesItemContent {
    id?: string;
    time?: string;
    phone?: string;
    status: string;
    type: string;
    thisIndex?: number;
  }

  // 在页面上表格的数据源
  interface ShowContentItem {
    name: string;
    venueId: string;
    [p in Times]: TimesItemContent;
  }

  interface AreasValueItem {
    time: string;
    name: string;
    info: ShowContentItem;
  }

  export interface TableItem {
    venueAreaName: string;
    venueAreaId: string;
    sort: number;

    [time: string]: ContentCell;
  }

  type BaseContentCell = {
    cellTime: string;
    // ContentStatusEnum
    status: string;
  };

  type CellTime = {
    cellTime: string;
  };

  /**
   * 表格每一个单元格里面的值
   */
  type ContentCell = BaseContentCell & {
    // 选定的日期
    bookDate?: string;
    //订单id , 通过 handleOrderInfoFromWorkplace 获取订单数据
    id?: string;
    phone: string;
    name: string;
    orderId: string;
    //0：PC   1：微信  2：全民运动码 3:售票机 4:全民健身小程序
    source: string;
    /** 如果 收费时长为60，那么这60分钟的收费就为groupPrice */
    groupPrice: number;
    sortWeight: number;
    sortInGroup: number;
    // 这个订单占几个格子
    orderLength?: number;
    // 之前的状态， 用于还原
    beforeStatus?: string;
  };

  /**
   * 场地使用数据 返回的数据格式
   */
  type AreaStatusInfo = {
    currentDate: string;
    venueId: string;
    venueName: string;
    uses: AreaStatusInfoUses[];

    // 0停业 1正常营业
    venueStatus: string;
  };

  type AreaStatusInfoUses = {
    sort: number;
    // 场地id
    venueId: string;
    //场地名称
    venueName: string;

    info: AreaStatusInfoUsesInfo[];
  };

  type AreaStatusInfoUsesInfo = {
    name: string;
    phone: string;
    //0：PC   1：微信  2：全民运动码 3:售票机 4:全民健身小程序
    source: string;
    // ContentStatusEnum
    status: string;
    timeFrom: string;
    timeTo: string;
  };
}

export declare namespace BookSite {
  interface Item {
    timeFrom: string;
    timeTo: string;
    price: number;
  }

  interface OperateTimeRangeItem {
    beginTime: string;
    endTime: string;
    step: number;
    //V2特有
    configUnit?: number;
    mapPrice: Record<string, {price: number}>;
    lstPrice: Item[],
  }
}

export declare namespace CreateBookOrder {
  interface CreateBookDetailOrderItem {
    bookDate: string;
    freePersonId?: string | string[];
    isFree: string;
    price: number;
    timeFrom: string;
    timeTo: string;
    venueId: string; //场地id
  }

  interface CreateBookOrderItem {
    deposit: number;
    details: CreateBookDetailOrderItem[];
    name: string;
    openId: string;
    phoneNo: string;
    venueId: string;
    memberId: string;
    preMobilizationNumber: number;
  }
}
