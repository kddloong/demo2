import type { FormInstance } from 'antd';
import { Button, message } from 'antd';
import { TypeUtil } from 'types/utils';
import { POSITIVE_STATUS } from '@/utils/utils';
import { CardReader } from 'types/device/encrypted-card/card-setting';
import { handleReadEncryptedCardNo } from '@/utils/entity-card/entity-card';

/**
 * 用于表格查询时 放在会员卡号输入框旁边, 读取的是加密卡号
 * @param searchConfig
 * @param card
 */
const readCardButton = (searchConfig: FormInstance, card: CardReader.CardReaderSetting) => {
  return (
    <>
      {card?.isStart === POSITIVE_STATUS ? (
        <Button
          key="out"
          onClick={async () => {
            const result = (await handleReadEncryptedCardNo(
              card as CardReader.CardReaderSetting,
            )) as TypeUtil.RequestResult<string>;

            if (result?.success) {
              const no = result.data;

              searchConfig?.setFieldsValue({ cardNo: no });

              searchConfig.submit();
            } else {
              message.error('读卡失败！');
            }
          }}
        >
          读卡
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export { readCardButton };
