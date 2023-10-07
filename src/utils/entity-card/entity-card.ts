import { readEncryptedCardNo } from '@/services/entity-card/entity-card';
import { CardReader } from '../../../types/device/encrypted-card/card-setting';
import { message } from 'antd';

/**
 * 包装调用读取加密卡号
 * @param card
 * @param cardNo
 */
export const handleReadEncryptedCardNo = async (card: CardReader.CardReaderSetting) => {
  try {
    const result = await readEncryptedCardNo(card);

    if (result?.success) {
      return { success: true, data: result.data };
    } else {
      message.warning('读卡失败!');
      return { success: false, data: {} };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};
