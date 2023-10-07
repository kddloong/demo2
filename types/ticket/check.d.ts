export declare namespace VenueCheck {
  interface VenueCheckItem {
    createDate: string;
    id: string;
    name: string;
    orderItem: string;
    orderNo: string;
    phoneNo: string;
    source: string;
    title: string;
    venueId: string;
    venueName: string;
    verificationTime: string;
    verificationUser: string;
  }

  interface VenueCheckDataParams extends RequestTableParams {
    orderItem: string;
  }
}
