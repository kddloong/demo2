// 卡号长度
import { CardReader } from 'types/device/encrypted-card/card-setting';
import axios from 'axios';
import { message } from 'antd';

const CARD_NO_LENGTH = 5;

/**
 * 读取加密卡号
 * @param card
 */
export const readEncryptedCardNo = async (card: CardReader.CardReaderSetting) => {
  const com = window.localStorage.getItem('serialPort') || card.serialPort;

  return new Promise((resolve, reject) => {
    axios
      .get(`http://${card.ip}:${card.port}/card/readCard`, {
        params: {
          com: Number(com),
          flag: card.isPositive !== '1',
          block: card.block,
          passwordType: card.isPositive,
          password: card.isPositive === '0' ? card.passwordA : card.passwordB,
          no: CARD_NO_LENGTH,
        },
      })
      .then((res) => {
        if (!res) {
          message.warning('请检查系统服务是否启动');
        }

        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

/**
 * 写加密卡号
 */
export const writeCard = async (card: CardReader.CardReaderSetting, content: string) => {
  const com = window.localStorage.getItem('serialPort') || card.serialPort;
  console.log(`card`, card);

  console.log(`使用的是${card.isPositive === '1' ? '反码' : '正码'}`);

  return new Promise((resolve, reject) => {
    axios
      .get(`http://${card.ip}:${card.port}/card/writeCard`, {
        params: {
          com: Number(com),
          block: card.block,
          passwordType: card.isPositive,
          password: card.isPositive === '0' ? card.passwordA : card.passwordB,
          content,
        },
      })
      .then((res) => {
        if (!res) {
          message.warning('请检查系统服务是否启动');
        }

        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
