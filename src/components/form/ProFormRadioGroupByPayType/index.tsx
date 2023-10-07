import { ProFormRadio } from '@ant-design/pro-components';
import type { FC } from 'react';
import { handleDictionaryForPayType } from '@/utils/main/main/dictionary';

const ProFormRadioGroupByPayType: FC<{ source?: 'member' }> = (props) => {
  const { source = '' } = props;

  return (
    <ProFormRadio.Group
      width="sm"
      name="payType"
      rules={[
        {
          required: true,
          message: '请选择付款方式',
        },
      ]}
      label="付款方式"
      request={async () => {
        if (source === 'member') {
          const result = await handleDictionaryForPayType();

          return result.filter((item) => item.value !== '4');
        }

        return await handleDictionaryForPayType();
      }}
    />
  );
};

export { ProFormRadioGroupByPayType };
