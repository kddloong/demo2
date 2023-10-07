export declare namespace PauseOperate {
  interface PauseOperateItem {
    id: string;
    timeFrom: string;
    timeTo: string;
    // 多选, 场馆和场地类型, 不包含场地, 使用treeSelect,
    venueId: string;
    memo: string;
  }
}
