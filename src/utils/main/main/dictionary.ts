import { getDictionary, handleFetchPayTypeArr } from '@/services/main/main/distionary';
import { INVEST_CARD_PAY, NEGATIVE_STATUS as CASH_PAY } from '@/utils/utils';
import { message } from 'antd';

/**
 * 处理数据字典,根据code 查对应数据
 * @param code
 * @returns {Promise<{}|{total, code, data, success}[]>}
 */
export const handleDictionary = async (code: string) => {
  try {
    const result = await getDictionary(code);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 特殊处理的付款方式
 */
export const handleDictionaryForPayType = async () => {
  try {
    const result = await handleFetchPayTypeArr();

    const payTypeOptions = [
      { label: '现金', value: CASH_PAY },
      { label: '会员卡', value: INVEST_CARD_PAY },
    ];

    if (result.success) {
      // 3 代表 C 扫 B, 5 代表 B 扫 C
      return payTypeOptions.concat(
        ...result.data.filter((item) => {
          return !['3'].includes(item.value);
        }),
      );
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};
