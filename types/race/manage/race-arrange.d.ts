import { TypeUtil } from '../../utils';

export type PaiduiInfoItem = {
  beginTime: string;
  endTime: string;
  groupId: string;
  groupName: string;
  id: string;
  isFree: string;
  isSignUp: string;
  mergeNum: number;
  name: string;
  price: number;
  signUpAlready: number;
  signUpCount: number;
  signUpFrom: string;
  signUpTo: string;
  status: string;
  address: string;
  gameTypeId: string;
};

export interface PaiduiUserInfoParams extends RequestTableParam {
  gameId?: string;
  groupId?: string;
  cardNo?: string;
  name?: string;
  phoneNo?: string;
  status?: string; //0报名中， 1审核通过 ， 2审核不通过3已取消
}

export type PaiduiUserInfoItem = {
  id: string;

  gameId: string;

  groupId: string;

  avatarUrl: string;

  nickName: string;

  openId: string;

  signUpNo: string;

  name: string;

  phoneNo: string;

  cardNo: string;

  status: string;

  signUpTime: string;

  payStatus: string;

  payTime: string;

  payDelayTime: string;

  priceType: string;

  price: number;

  source: string;

  height: number;

  weight: number;

  age: number;

  gender: string;

  memo: string;

  payType: string;

  refundReason: string;

  memberCardNo: string;

  refundPrice: string;

  actPrice: number;
};

export interface PaiduiParams extends TypeUtil.RequestTableParams {
  name?: string;
  status?: string;
  groupId?: string;
  gameId?: string;
}

export declare namespace RaceGroup {
  // 赛事分组内报名人员信息
  interface SignUpPersonItem {
    age: number;
    cardNo: string;
    gameId: string;
    gender: string;
    groupId: string;
    height: number;
    name: string;
    phoneNo: string;
    weight: number;
  }

  /**
   * 用于 SettleOrderForRace
   *
   * */

  export type BaseInfoForPay = {
    id?: string;
    signUpNo?: string;
  } & SignUpPersonItem;
}

export type RaceSignUpInfoForPrintItem = {
  age: number;
  avatarUrl: string;
  billNo: string;
  cardNo: string;
  gameId: string;
  gameName: string;
  gender: string;
  groupId: string;
  groupName: string;
  height: number;
  id: string;
  memId: string;
  memo: string;
  name: string;
  nickName: string;
  openId: string;
  payStatus: string;
  payType: string;
  phoneNo: string;
  price: number;
  priceType: string;
  refundReason: string;
  signUpNo: string;
  signUpTime: string;
  source: string;
  status: string;
  weight: number;
};
