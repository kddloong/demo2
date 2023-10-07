export declare namespace VenueBaseSetting {
  interface VenueBaseSettingItem {
    id: string;
    isManager: string;
    isOperate: string;
    isUsed: string;
    name: string;
    sort: number;
    type: string;
    venueNo: string;
    children?: VenueBaseSettingItem[];
  }

  interface VenueBaseInfo {
    address: string;
    albumUrl: string;
    city: string;
    clientId: string;
    district: string;
    id: string;
    imageUrl: string;
    isUseFree: string;
    lat: number;
    lon: number;
    memo: string;
    name: string;
    notice: string;
    precaution: string;
    province: string;
    type: string;
    venueNo: string;
  }

  type VenueBaseInfoData = VenueBaseInfo & NormalResponseField;
}

export declare namespace BaseBaseSetting {
  interface BaseBaseSettingItem {
    address: string;
    city: string;
    district: string;
    id: string;
    lat: number;
    lon: number;
    memo: string;
    name: string;
    province: string;
    type: string;
    venueNo: string;
    imageUrl: string;
    beginTime: string;
    endTime: string;
  }
}
