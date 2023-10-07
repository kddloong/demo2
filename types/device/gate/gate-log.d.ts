export declare namespace GateLog {
  type GateLogItem = {
    description: string;
    // 门号
    doorNumber: string;
    // 有效
    effective: string;
    // 进出
    inAndOut: string;
    // 索引位
    status: string;
    // 序号
    no: string;
    // 记录类型
    recordType: string;
    //sn
    sn: string;
    // 门号
    time: string;
  };

  type GateLogListItem = GateLogItem & NormalResponseField;
}
