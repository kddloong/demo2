export declare namespace GoodSupplier {
  interface GoodSupplierItem {
    address: string;
    beginDate: string;
    email: string;
    endDate: string;
    id: string;
    name: string;
    people: string;
    phone: string;
    stadiumId: string;
    status: string;
  }

  type GoodSupplierListItem = {
    venueId: string;
    address: string;
  } & GoodSupplierItem &
    NormalResponseField;
}
