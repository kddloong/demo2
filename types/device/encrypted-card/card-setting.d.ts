export declare namespace CardReader {
  type CardReaderSetting = {
    block: string;
    //取正码反码 0：正码 1：反码
    isPositive: string;
    //是否启用，0:不用 1：启用
    isStart: string;
    port: string;
    //扇区
    selectAccess: string;
    id: string;
    ip: string;
    //串口号
    serialPort: string;
    passwordA: string;
    passwordB: string;
  };
}
