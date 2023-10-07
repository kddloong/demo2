export declare namespace AreaOccupy {
  interface AreaOccupyDetailItem {
    cancelReason: string;
    cancelReasonId: string;
    id: string;
    occupyDate: string;
    orderId: string;
    status: string;
    timeFrom: string;
    timeTo: string;
    venueId: string;
  }

  interface AreaOccupyItem {
    businessId: string;
    contact: string;
    contactPhoneNo: string;
    content: string;
    createDate: string;
    createName: string;
    id: string;
    orderNo: string;
    reason: string;
    status: string;
    venueId: string;
    versions: number;
  }

  interface AreaOccupyDataParams extends RequestTableParams {
    orderNo?: string;
    status?: string;
  }
}
