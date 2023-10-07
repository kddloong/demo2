export declare namespace TicketSetting {
  type BaseTicketParams = {
    //颜色区分
    backgroundColor: string;
    //使用说明
    description: string;
    //是否启用假期价格
    enableHoliday: string;
    //是否启用特殊价格设置
    enableSpecial: string;
    //主键
    id: string;
    //展示的图片
    imageUrl: string | UploadFile[];
    //是否限制人群
    isLimit: string;
    //限制人群
    limitPersonId: string | string[];
    //使用提醒
    notice: string;
    //使用人数
    people: number;
    //正常单价
    price: number;
    //排序
    sort: number;
    //票券状态不能为空 0:停用 1：正常
    status: string;
    title: string;
    configFlag: string;
  };

  type HolidayParams = {
    endTime: string;
    holidayFrom: string;
    holidayTo: string;
    holidayId: string;
    price: number;
    startTime: string;
    type: string;
    venueId: string;
  };

  type SpecialParams = {
    endDate: string;
    endTime: string;
    price: number;
    specialId: string;
    startDate: string;
    startTime: string;
    type: string;
    venueId: string;
    week: string;
  };

  type SaveParams = BaseTicketParams & {
    specials: SpecialParams[];
    holidays: HolidayParams[];
  };

  type ReturnParams = BaseTicketParams & {
    ticketDays: TicketDayItem[];
    ticketWeeks: TicketWeekItem[];
    ticketHolidays: TicketHolidayItem[];
  };

  type TicketDayItem = {
    //结束日期
    endDate: string;
    //时间到
    endTime: string;
    //主键
    id: string;
    //价格设置
    price: number;
    //开始日期
    startDate: string;
    //时间从
    startTime: string;
    //关联场馆ID
    ticketConfigId: string;
    //价格类型
    type: string;
    //关联场馆ID
    venueId: string;
  };

  type TicketHolidayItem = {
    //主键
    id: string;
    //价格设置
    price: number;
    //关联场馆ID
    ticketConfigId: string;
    //关联场馆ID
    venueId: string;
    holidayConfigId: string;
  };

  type TicketWeekItem = {
    //时间到
    endTime: string;
    //主键
    id: string;
    //价格设置
    price: number;
    //时间从
    startTime: string;
    //关联场馆ID
    ticketConfigId: string;
    //价格类型
    type: string;
    //关联场馆ID
    venueId: string;
    //星期几
    week: number;
  };
}
