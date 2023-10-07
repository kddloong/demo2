import type { NormalResponseField } from '@/type/data';

export declare namespace Shop {
  interface ShopItem {
    address: string;
    beginDate: string;
    email: string;
    endDate: string;
    id: string;
    name: string;
    people: string;
    phone: string;
    stadiumId: string;
  }

  type ShopListItem = ShopItem & NormalResponseField;
}
