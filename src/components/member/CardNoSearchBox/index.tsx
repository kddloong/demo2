import { ProFormText } from '@ant-design/pro-components';
import { Form, Space } from 'antd';
import type { FC } from 'react';
import { CardReader } from 'types/device/encrypted-card/card-setting';
import './style.css';
import { readCardButton } from '@/utils/member/components/readCardButton';

interface ICardNoSearchBoxProps {
  card: CardReader.CardReaderSetting;
}

const CardNoSearchBox: FC<ICardNoSearchBoxProps> = (props) => {
  const { card } = props;

  const form = Form.useFormInstance();

  return (
    <>
      <Space direction={'horizontal'} className={'my-space'}>
        <ProFormText name={'cardNo'} />

        {readCardButton(form, card as CardReader.CardReaderSetting)}
      </Space>
    </>
  );
};

export { CardNoSearchBox };
