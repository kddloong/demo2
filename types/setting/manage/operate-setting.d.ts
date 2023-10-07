import { TypeUtil } from '../../utils';

export declare namespace OperateSetting {
  interface OperateSettingItem {
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
    opBeginTime: string;
    opEndTime: string;
  }

  /**
   * 场地类型的基本信息
   */
  type OperateBaseSettingInfo = {
    address: string;
    clientId: string;
    contact: string;
    fieldTypeId: string;
    id: string;
    imageUrl: BaseImageType;
    name: string;
    parentId: string;
    phoneNo: string;
    sort: number;
    specialLabel: string;
    type: string;
    venueNo: string;
  };
}

export declare namespace OperateBaseSetting {
  interface PcBook {
    afterCancelBookMinutePc: number;
    createDate: string;
    createName: string;
    id: string;
    isDepositPc: string;
    isRemindPc: string;
    limitDayPc: number;
    minutePc: number;
    pcBackDepositRatio: number;
    pcDepositRatio: number;
    preCancelBookMinutePc: number;
    preUpdateBookMinutePc: number;
    remindTypePc: string;
    venueId: string;
  }

  interface WxBook {
    afterCancelBookMinuteWx: number;
    createDate: string;
    createName: string;
    id: string;
    isRemindWx: string;
    limitDayWx: number;
    minuteWx: number;
    preCancelBookMinuteWx: number;
    preUpdateBookMinuteWx: number;
    remindTypeWx: string;
    venueId: string;
    versions: number;
    wxBackRatio: number;
  }

  interface MachineBook {
    createDate: string;
    createName: string;
    id: string;
    limitDayMachine: number;
    machineBookDescription: string;
    machineBookNotice: string;
    venueId: string;
    tenantId: string;
  }

  interface OperateBaseSettingItem {
    afterCancelBookMinutePc: number;
    afterCancelBookMinuteWx: number;
    beginTime: string;
    bookType: string | string[];
    chargingType: string;
    endTime: string;
    isBook: string;
    isDepositPc: string;
    isRemindPc: string;
    isRemindWx: string;
    limitDayPc: number;
    limitDayWx: number;
    pcBackDepositRatio: number;
    preCancelBookMinutePc: number;
    preCancelBookMinuteWx: number;
    preUpdateBookMinutePc: number;
    preUpdateBookMinuteWx: number;
    status: string;
    useType: string;
    venueId: string;
    wxBackRatio: number;
    enableHoliday: string;
    enableSpecial: string;
    id: string;
    isOvertime: string;
    minutePc: number;
    minuteWx: number;
    overTimePrice: number;
    overTimeUnit: number;
    pcDepositRatio: number;
    price: number;
    remindTypePc: string | string[];
    remindTypeWx: string | string[];
    useUnit: number;
    weekOrDay: string;
    wxBookDescription: string;
    wxBookNotice: string;
    pcBook?: PcBook;
    wxBook?: WxBook;
    machineBook?: MachineBook;
  }
}

export declare namespace OperatePriceSetting {
  interface Holidays {
    venueId: string;
    type: string;
    endTime: string;
    holiday: string;
    holidayId: string;
    price: string;
    startTime: string;
    timeIntervalId: string;
  }

  //todo 这个需要拆分
  interface Specials {
    endDate?: string;
    endTime: string;
    price: string;
    specialId: string;
    startDate: string;
    startTime: string;
    timeIntervalId: string;
    type: string;
    venueId: string;
    week?: string;
  }

  interface OperatePriceSettingItem {
    holidays: Holidays[];
    specials: Specials[];
    beginTime: string;
    bookType: string;
    chargingType: string;
    dateType: string;
    endTime: string;
    fieldTypeIdID: string;
    isBook: string;
    status: string;
    title: string;
    useType: string;
    venueId: string;
    days: number;
    description: string;
    enableHoliday: string;
    enableSpecial: string;
    expireTime: string;
    id: string;
    isKu: string;
    isOvertime: string;
    notice: string;
    overTimePrice: number;
    overTimeUnit: number;
    price: number;
    quantity: number;
    useUnit: number;
    restTimeFrom: string;
    restTimeTo: string;
    weekOrDay: string;
    timeDays?: TimeDaysItem[];
    timeWeeks?: TimeWeeksItem[];
    timeHolidays?: TimeHolidaysItem[];
    numberDays?: NumberDaysItem[];
    numberWeeks?: NumberWeeksItem[];
    numberHolidays?: NumberHolidaysItem[];
    ticketDays?: TicketDaysItem[];
    ticketWeeks?: TicketWeeksItem[];
    ticketHolidays?: TicketHolidayItem[];
    ticket?: TicketItem;
  }

  interface TimeDaysItem extends TypeUtil.NormalResponseField {
    endDate: string;
    endTime: string;
    id: string;
    isFree: string;
    price: number;
    startDate: string;
    startTime: string;
    type: string;
    venueId: string;
    freePersonId?: string | string[];
  }

  interface TimeWeeksItem extends TypeUtil.NormalResponseField {
    endTime: string;
    id: string;
    isFree: string;
    price: number;
    startTime: string;
    type: string;
    venueId: string;
    week: number;
    freePersonId?: string | string[];
  }

  interface TimeHolidaysItem extends TypeUtil.NormalResponseField {
    endTime: string;
    holiday: number; //时间戳
    id: string;
    price: number;
    startTime: string;
    venueId: string;
  }

  interface NumberDaysItem extends TypeUtil.NormalResponseField {
    endDate: string;
    id: string;
    isFree: string;
    price: number;
    startDate: string;
    timeIntervalId: string;
    type: string;
    venueId: string;
    freePersonId?: string | string[];
  }

  interface NumberWeeksItem extends TypeUtil.NormalResponseField {
    id: string;
    isFree: string;
    price: number;
    timeIntervalId: string;
    type: string;
    venueId: string;
    week: number;
    freePersonId?: string | string[];
  }

  interface NumberHolidaysItem extends TypeUtil.NormalResponseField {
    holiday: number; // 时间戳
    id: string;
    price: number;
    timeIntervalId: string;
    venueId: string;
  }

  interface TicketDaysItem extends TypeUtil.NormalResponseField {
    freePersonId?: string | string[];
    endDate: number;
    id: string;
    isFree: string;
    price: number;
    startDate: number;
    type: string;
    venueId: string;
  }

  interface TicketWeeksItem extends TypeUtil.NormalResponseField {
    id: string;
    isFree: string;
    price: number;
    type: string;
    venueId: string;
    week: number;
    freePersonId?: string | string[];
  }

  interface TicketHolidayItem extends TypeUtil.NormalResponseField {
    holiday: number;
    id: string;
    price: number;
    venueId: string;
  }

  interface TicketItem extends TypeUtil.NormalResponseField {
    beginTime: number;
    dateType: string;
    days: number;
    description: string;
    endTime: number;
    expireTime: string;
    id: string;
    isKu: string;
    notice: string;
    title: string;
    venueId: string;
  }

  type HolidaysSaveItem = TicketHolidayItem | NumberHolidaysItem | TimeHolidaysItem;

  type TimeSaveItem = TimeWeeksItem | TimeDaysItem;

  type TicketSaveItem = TicketWeeksItem | TicketDaysItem;

  type NumberSaveItem = NumberWeeksItem | NumberDaysItem;
}
