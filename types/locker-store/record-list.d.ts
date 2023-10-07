export declare namespace StoreRecord {
  type RecordItem = {
    cardId: string;
    clientId: string;
    createDate: string;
    createName: string;
    deviceName: string;
    deviceNo: string;
    doorId: number;
    id: string;
    // 开箱状态 1 - 存， 2 - 取， 0 - 其他
    state: number;
    tenantId: string;
    // 开箱类型，取值1 - 卡， 2 - 指纹，3 - 人脸，4 - 密码 ，5 - 管理员开箱
    type: number;
    updateName: string;
    userName: string;
    versions: number;
  };

  type StoreRecordListItem = RecordItem & NormalResponseField;
}
