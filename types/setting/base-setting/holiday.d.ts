export declare namespace Holiday {
  interface HolidayItem {
    days: number;
    //假期开始时间
    holidayFrom: number;
    //假期结束时间
    holidayTo: number;
    //主键
    id: string;
    //备注
    memo: string;
  }

  interface HolidayCalendarParams {
    clientId: string;
    tenantId: string;
    date: string;
  }
}
