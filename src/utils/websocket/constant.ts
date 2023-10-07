export const WS_CONNECT = 0x20000001; // WS_CONNECT请求连接
export const WS_CONNECT_RESP = 0x70000001; // 请求连接应答
export const WS_ACTIVE_TEST = 0x20000002; // 心跳测试
export const WS_ACTIVE_TEST_RESP = 0x70000002; // 心跳测试应答

export const WS_SEND_SYS_MESSAGE = 0x20000003; //发送系统消息
export const WS_SEND_SYS_MESSAGE_RESP = 0x70000003; //发送系统消息响应

export const WS_CARD_TEST_BEEP = 0x20000020; // 测试读卡器beep发声
export const WS_CARD_TEST_BEEP_RESP = 0x70000020; // 测试读卡器beep发声 响应

export const WS_CARD_GET_CARD_NO = 0x20000021; // 读卡物理卡号
export const WS_CARD_GET_CARD_NO_RESP = 0x70000021; //读卡物理卡号响应

export const WS_CARD_GET_ALL_CARD_NO = 0x20000022; //读卡物理卡号正码反码一起返回
export const WS_CARD_GET_ALL_CARD_NO_RESP = 0x70000022; //读卡物理卡号正码反码一起返回

export const WS_CARD_INIT = 0x20000023; //初始化卡 给卡写密码
export const WS_CARD_INIT_RESP = 0x70000023; //初始化卡 给卡写密码

export const WS_CARD_INIT_WRITE = 0x20000031; //初始化卡 给卡写密码并写卡号
export const WS_CARD_INIT_WRITE_RESP = 0x70000031; //初始化卡 给卡写密码并写卡号

export const WS_CARD_READ_ENCODER = 0x20000033; //加密读卡

export const WS_CARD_READ_ENCODER_RESP = 0x70000033; // 加密读卡
