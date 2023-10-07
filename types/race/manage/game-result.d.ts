export declare namespace RaceResult {
  export interface RaceResultItem {
    //卡号
    cardNo: number;
    //赛事名称
    gameId: string;
    //赛事分组
    groupId: string;
    //主键
    id: string;
    //会员名称
    memName: string;
    //备注
    memo: string;
    //姓名
    name: string;
    //手机号
    phoneNo: number;
    //名次
    rank: number;
    //分数
    score: number;
  }

  interface RaceResultDataParams extends RequestResultTableParam {
    name?: string;
    //赛事名称
    gameId?: string;
  }
}
