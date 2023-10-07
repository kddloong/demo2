export declare namespace HKDeviceConfig {
  type ConfigItem = {
    ip: string;
    id: string;
    isStart: string;
    port: number;
    //接入方式
    type: string;
  };

  type SendInfoParams = {
    memberId: string;
    devIndexIds: string;
  };
}
