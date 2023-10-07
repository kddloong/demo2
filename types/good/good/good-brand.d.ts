export declare namespace GoodBrand {
  interface GoodBrandItem {
    id: string;
    name: string;
    sort: number;
  }

  type GoodBrandListItem = {
    memo: string;
  } & GoodBrandItem &
    NormalResponseField;
}
