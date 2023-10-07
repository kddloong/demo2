export declare namespace VenueDeposit {
  interface VenueDepositItem {
    backTime: string;
    createDate: string;
    deposit: number;
    id: string;
    name: string;
    orderItem: string;
    orderNo: string;
    payType: string;
    phoneNo: string;
    source: string;
    status: string;
    title: string;
    venueId: string;
    venueName: string;
  }

  interface VenueDepositDataParams extends RequestTableParams {
    orderItem: string;
  }
}
