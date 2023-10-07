import type { NormalResponseField } from '@/type/data';

export declare namespace WareHouse {
  type SearchWareHouseParams = {
    name: string;
    venueId: string;
  };

  type WareHouseItem = {
    address: string;
    id: string;
    // 场馆名称
    // 仓库负责人
    people: string;
    // 仓库负责人联系方式
    phone: string;
    sort: number;
    type: string; // 4仓库
    venueNo: string;
    contact: string;
    fieldTypeId: string;
    imageUrl: string;
    warehouseName: string;
    warehouseId: string;
    specialLabel: string;
    // 联系方式
    phoneNo: string;
  } & SearchWareHouseParams;

  type WareHouseListItem = WareHouseItem & NormalResponseField;
}
