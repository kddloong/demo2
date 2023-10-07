import { sendLog } from '@/utils/utils';
import {
  WS_ACTIVE_TEST,
  WS_ACTIVE_TEST_RESP,
  WS_CARD_GET_ALL_CARD_NO,
  WS_CARD_GET_ALL_CARD_NO_RESP,
  WS_CARD_GET_CARD_NO,
  WS_CARD_GET_CARD_NO_RESP,
  WS_CARD_INIT,
  WS_CARD_INIT_RESP,
  WS_CARD_INIT_WRITE,
  WS_CARD_INIT_WRITE_RESP,
  WS_CARD_READ_ENCODER,
  WS_CARD_READ_ENCODER_RESP,
  WS_CARD_TEST_BEEP,
  WS_CARD_TEST_BEEP_RESP,
  WS_CONNECT,
  WS_CONNECT_RESP,
  WS_SEND_SYS_MESSAGE,
  WS_SEND_SYS_MESSAGE_RESP,
} from '@/utils/websocket/constant';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { useCardReaderCookie } from '@/hooks/useCardReaderCookie';

// todo服务端发送心跳测试到本地, 需要应答
export default () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const [responseData, setResponseData] = useState<[boolean, number, string]>([false, 0, '']);

  const { deviceNo = '' } = useCardReaderCookie();

  useEffect(() => {
    let newSocket = new WebSocket(`ws://192.168.0.104:8090/ws`);

    setSocket(newSocket);
  }, []);

  function getSequenceId() {
    return +new Date().getTime();
  }

  const WS_obj = {
    [WS_CONNECT]: () => {
      socket?.send(
        `{"commandId":${WS_CONNECT},"sequenceId":${getSequenceId()},"totalLength":12, "deviceNo":"${deviceNo}"}`,
      );
    },
    [WS_CONNECT_RESP]: () => {
      console.log(`连接成功`);
      notification.success({
        description: '连接成功',
        message: 'websocket',
      });
    },
    [WS_ACTIVE_TEST]: () => {
      socket?.send(
        `{"commandId":${WS_ACTIVE_TEST},"sequenceId":${getSequenceId()},"totalLength":12,  "deviceNo":"${deviceNo}"}`,
      );
    },
    [WS_ACTIVE_TEST_RESP]: () => {
      notification.success({
        description: '心跳应答成功',
        message: 'websocket',
      });
    },
    [WS_SEND_SYS_MESSAGE]: () => {
      socket?.send(
        `{"commandId":${WS_SEND_SYS_MESSAGE},"sequenceId":${getSequenceId()},"totalLength":12,  "deviceNo":"${deviceNo}"}`,
      );
    },
    [WS_SEND_SYS_MESSAGE_RESP]: () => {
      notification.success({
        description: '接收消息成功',
        message: 'websocket',
      });
    },
    [WS_CARD_TEST_BEEP]: () => {
      socket?.send(
        `{"commandId":${WS_CARD_TEST_BEEP},"sequenceId":${getSequenceId()},"totalLength":12,  "deviceNo":"${deviceNo}"}`,
      );
    },
    [WS_CARD_TEST_BEEP_RESP]: () => {
      notification.success({
        description: '测试读卡器beep发声 响应',
        message: 'websocket',
      });
    },
    [WS_CARD_GET_CARD_NO]: () => {
      socket?.send(
        `{"commandId":${WS_CARD_GET_CARD_NO},"sequenceId":${getSequenceId()},"totalLength":12,  "deviceNo":"${deviceNo}"}`,
      );
    },
    [WS_CARD_GET_CARD_NO_RESP]: () => {
      notification.success({
        description: '读卡物理卡号响应',
        message: 'websocket',
      });
    },
    [WS_CARD_GET_ALL_CARD_NO]: () => {
      socket?.send(
        `{"commandId":${WS_CARD_GET_ALL_CARD_NO},"sequenceId":${getSequenceId()},"totalLength":12, "deviceNo":"${deviceNo}"}`,
      );
    },
    [WS_CARD_GET_ALL_CARD_NO_RESP]: () => {
      notification.success({
        description: '读卡物理卡号正码反码一起返回响应',
        message: 'websocket',
      });
    },
    [WS_CARD_INIT]: (passwordA: string) => {
      socket?.send(
        `{"commandId":${WS_CARD_INIT},"sequenceId":${getSequenceId()},"totalLength":12, "deviceNo":"291105004739", "passwordA": "${passwordA}"}`,
      );
    },
    [WS_CARD_INIT_RESP]: () => {
      notification.success({
        description: '初始化卡 给卡写密码响应',
        message: 'websocket',
      });
    },
    [WS_CARD_INIT_WRITE]: () => {
      console.log(`进来了`);

      return (type: string) => {
        console.log(`type`, type);

        socket?.send(
          `{"commandId":${WS_CARD_INIT_WRITE},"sequenceId":${getSequenceId()},"totalLength":12,  "deviceNo":"${deviceNo}", "type": "${type}"}`,
        );
      };
    },
    [WS_CARD_INIT_WRITE_RESP]: () => {
      notification.success({
        description: '初始化卡 给卡写密码并写卡号响应',
        message: 'websocket',
      });
    },
    [WS_CARD_READ_ENCODER]: () => {
      socket?.send(
        `{"commandId":${WS_CARD_READ_ENCODER},"sequenceId":${getSequenceId()},"totalLength":12,  "deviceNo":"${deviceNo}"}`,
      );
    },
    [WS_CARD_READ_ENCODER_RESP]: () => {
      notification.success({
        description: '加密读卡成功',
        message: 'websocket',
      });
    },
  };

  function jsonToString(data) {
    return JSON.parse(data);
  }

  function getResponseCommandId(commandId: string) {
    const originCommandId = `0x${commandId.toString(16)}`;

    WS_obj?.[+originCommandId as keyof typeof WS_obj]?.();

    return +originCommandId;
  }

  function getResponseData(reponseData, commandNumber) {
    const result = reponseData?.r;

    if (!result) {
      setResponseData([true, WS_ACTIVE_TEST_RESP, '']);
    } else {
      const { data: resultData = '', success, code } = result;

      setResponseData([success, commandNumber, resultData]);
    }
  }

  function formatResp(data) {
    const commandId = data.commandId;

    // 获取commandId并响应
    const commandIdNumber = getResponseCommandId(commandId);

    //   获取返回的data
    getResponseData(data, commandIdNumber);
  }

  function sendMessage(type: number) {
    return WS_obj[type as keyof typeof WS_obj]?.();
  }

  function init() {
    sendMessage(WS_CONNECT);
  }

  socket.onopen = function (e) {
    sendLog('[open] Connection established');
    sendLog('Sending to server');

    init();
  };

  socket.onmessage = function (ev) {
    console.log(`收到响应`, ev);

    const dataResult = jsonToString(ev.data);

    formatResp(dataResult);
  };

  return {
    sendMessage,
    responseData,
  };
};
