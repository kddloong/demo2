export declare namespace GoodProductType {
  type GoodProductTypeName = { name: string };

  type GoodProductTypeItem = {
    sort: number;
    id: string;
    parentId: string;
    children: GoodProductTypeItem[];
  } & GoodProductTypeName;

  type GoodProductTypeListItem = GoodProductTypeItem & NormalResponseField;
}
