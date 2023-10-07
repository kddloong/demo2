import { TypeUtil } from '../../utils';

export declare namespace VenueSetting {
  interface VenueSettingItem {
    checkType: string | string[];
    configId: string;
    id: string;
    name: string;
    parentId: string;
    sort: number;
    status: string; // 0: 暂停营业  1：正常营业
    type: string; // 0场馆， 1场地区域， 2 场地， 3 商店
    venueNo: string;
    timeFrom: string;
    timeTo: string;
    verificationType: string | string[];
  }

  // 场馆基本信息管理 表格 查询列
  type VenueSettingListParams = TypeUtil.RequestTableParams & {
    //场馆名称
  };
}
