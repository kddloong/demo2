export declare namespace Store {
  type StoreItem = {
    deviceNo: string;
    deviceType: number;
    doorNum: number;
    id: string;
    isFix: number;
    lockerVersions: string;
    memo: string;
    name: string;
    status: string;
  };

  type StoreListItem = StoreItem & NormalResponseField;
}
