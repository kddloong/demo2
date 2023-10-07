export declare namespace AllTraffic {
  type AllTrafficItem = {
    todayDate: string;
    trafficEnter: number;
    trafficOut: number;

    //年龄未知人数
    ageUnknown: number;
    cameraId: string;
    cameraName: string;
    // 小孩人次
    child: number;
    // 女性
    female: number;
    // 性别未知
    genderUnknown: number;
    id: string;
    // 男性人次
    male: number;
    // 盛年
    middle: number;
    // 中年
    middleAged: number;
    // 老年
    old: number;
    // 重复
    pass: number;
    // 壮年
    prime: number;
    // 青少年
    teenager: number;
    // 青年
    young: number;
  } & SearchTimeRangeParams;

  type ALLTrafficListItem = AllTrafficItem & NormalResponseField;
}
