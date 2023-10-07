export declare namespace TrafficCamera {
  type CameraItem = {
    venueId: string;
    address: string;
    id: string;
    cameraId: string;
    name: string;
    status: string;
    isLeave: string;
    memo: string;
  };

  type UrlConfigItem = {
    agreement: string;
    port: string;
    ip: string;
    url: string;
  };

  type CameraListItem = CameraItem & NormalResponseField;
}
