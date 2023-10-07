import { TypeUtil } from '../../utils';

export declare namespace Race {
  export interface RaceItem {
    address: string;
    bannerImage: string;
    beginTime: string;
    broadcastAddress: string;
    contact: string;
    contactPhoneNo: string;
    content: string;
    contract: string;
    endTime: string;
    gameTypeId: string;
    host: string;
    id: string;
    imageUrl: string;
    isSignUp: string;
    lat: number;
    lon: number;
    lowFreePrice: number;
    name: string;
    price: number;
    priceType: string;
    servicePersonIds: string;
    signUpFrom: string;
    signUpTo: string;
    status: string;
    targetPersonIds: string | string[];
    textOrImage: string;
    venueId: string;
    introduce: string;
    memo: string;
  }

  interface RaceDataParams extends TypeUtil.RequestTableParams {
    name?: string;
    gameTypeId?: string;
    status?: string;
  }
}

//报名信息
export type SignUps = {
  gameId: string; //关联赛事主键
  groupName: string; //报名组名
  id: string;
  isFree: string; //是否免费
  price: number;
  signUpCount: number; //报名人数限制
};

export declare namespace AddGameTypes {
  interface GameItem {
    address: string;
    servicePersonIds: string;
    bannerImage: string;
    beginTime: string;
    broadcastAddress: string;
    clientId: string;
    contact: string;
    contactPhoneNo: string;
    content: string;
    contract: string;
    endTime: string;
    gameTypeId: string;
    host: string;
    id: string;
    imageUrl: string;
    isLowFree: string;
    isSignUp: string;
    lat: number;
    lon: number;
    lowFreePrice: number;
    memo: string;
    name: string;
    price: number;
    signUpFrom: string;
    signUpTo: string;
    status: string;
    targetPersonIds: string;
    tenantId: string;
    textOrImage: string;
    venueId: string;
    introduce: string;
  }

  type BaseSignUpParams = {
    id: string; //	主键
    isLimitAge: string; //	是否限制年龄 0:不限制 1：限制
    maxAge: number; //	报名最大年龄限制
    minAge: number; //	报名最小年龄限制
    genderLimit: string; //	报名性别限制 -1:不限制 0：男 1：女
    isFree: string;
    // 已报名人数
    signUpNum: number;
    // 报名人数上限
    signUpCount: number;
  };

  interface SignUpItem extends BaseSignUpParams {
    gameId: string; //	关联赛事主键

    groupName: string; //	报名组名
    isFree: string; //是否免费
    price: number; //报名费用
    signUpCount: number; //	报名人数限制
  }

  interface SaveGameItem {
    gameGameEntity: GameItem;
    signUps: SignUpItem[];
  }

  interface GetGameItem {
    gameGameEntity: GameItem & NormalResponseField;
    signUps: SignUpItem[];
  }
}

declare namespace RaceWorkplace {
  type RaceWorkplaceDetailItem = {
    clientId: string;
    createDate: string;
    createName: string;
    gameId: string;
    genderLimit: string;
    groupName: string;
    id: string;
    isFree: string;
    isLimitAge: string;
    maxAge: number;
    minAge: number;
    price: number;
    signUpCount: number;
    signUpNum: number;
    tenantId: string;
    updateDate: string;
    updateName: string;
    versions: number;
  };

  type RaceWorkplaceItem = {
    address: string;
    bannerImage: string;
    beginTime: string;
    broadcastAddress: string;
    clientId: string;
    contact: string;
    contactPhoneNo: string;
    content: string;
    contract: string;
    createDate: string;
    createName: string;
    details: Array<RaceWorkplaceDetailItem>;
    endTime: string;
    gameTypeId: string;
    host: string;
    id: string;
    imageUrl: string;
    introduce: string;
    isSignUp: string;
    lat: number;
    lng: number;
    lowFreePrice: number;
    memo: string;
    name: string;
    price: number;
    priceType: string;
    servicePersonIds: string;
    signUpFrom: string;
    signUpTo: string;
    status: string;
    targetPersonIds: string;
    tenantId: string;
    textOrImage: string;
    updateDate: string;
    updateName: string;
    venueId: string;
    versions: number;
  };
}
