export interface Menu {
  children?: MenuItem[];
  clientId: string;
  icon: string;
  id: string;
  memo: string;
  name: string;
  sort: number;
  type: string;
  url: string;
}
