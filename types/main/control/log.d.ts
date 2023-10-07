import type { RequestTableParam } from '@/type/data';

declare namespace Log {
  interface LogParams {
    operatorTime_begin?: string;
    operatorTime_end?: string;
    type?: string;
    userName?: string;
  }

  type LogDataParams = LogParams & RequestTableParam;

  interface LogItem {
    broswer: string;
    className: string;
    createDate: string;
    createName: string;
    id: string;
    ip: string;
    memo: string;
    methodName: string;
    name: string;
    operatorTime: string;
    params: string;
    type: string;
    userName: string;
  }
}
