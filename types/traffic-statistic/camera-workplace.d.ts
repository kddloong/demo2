type CameraDataType = {
  id: string;
  name: string;
  cameraID: string;
  loc: string;
  status: string;
  in: string;
  out: string;
};

type PassengerflowChartDataType = {
  date: string;
  value: number;
  type: string;
};

type PassengerflowStatisticDataType = {
  id: string;
  date: string;
  week: string;
  in: string;
  out: string;
};

export declare namespace PassengerFlowCamera {
  type BaseInfo = {
    enterNum: string;
    exitNum: string;
  };

  type CameraItem = {
    address: string;
    id: string;
    name: string;
    status: string;
  } & BaseInfo;

  type TodayStatistic = {
    timeFrom: string;
    timeTo: string;
    todayDate: string;
    month: string;
  } & BaseInfo;
}
