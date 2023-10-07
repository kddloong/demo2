export declare namespace Gate {
  type GateItem = {
    name: string;
    sn: number;
    areaId: string;
    status: string;
    lastUpdateTime: string;
    sort: number;
    venueId: string | string[];
    id: string;
    doorNumber: number;
    outDoorNumber: number;
    // 刷新间隔时长
    refreshTime: number;
    //是否支持核销
    isCheck: string;
  };

  type GateListItem = GateItem & NormalResponseField;
}
