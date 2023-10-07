export declare namespace TrafficInfo {
  type SearchTrafficInfoParams = {
    id: string;
    todayDate: string;
  };

  type TrafficInfoItem = {
    trafficEnter: string;
    trafficOut: string;
    timeFrom: string;
    timeTo: string;
    cameraId: string;
  } & SearchTrafficInfoParams;

  type TrafficInfoListItem = TrafficInfoItem & NormalResponseField;
}
