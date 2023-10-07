export declare namespace CreateOccupyOrder {
  interface CreateOccupyDetailOrderItem {
    occupyDate: string;
    timeFrom: string;
    timeTo: string;
    venueId: string; // 场地id
  }

  interface CreateOccupyOrderItem {
    businessId: string;
    contact: string;
    contactPhoneNo: string;
    content: string;
    reason: string;
    venueId: string;
    details: CreateOccupyDetailOrderItem[];
  }
}
