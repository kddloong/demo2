import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { getVerCode } from '@/services/ant-design-pro/api';
import '@/styles/global.css';

interface CaptchaInputValue {
  valid: string;
  deviceId: string;
}

interface CaptchaInputProps {
  value?: CaptchaInputValue;
  onChange?: (value: CaptchaInputValue) => void;
  count: number;
}

const CaptchaInput: React.FC<CaptchaInputProps> = ({ count }) => {
  const [imageData, setImageData] = useState<string>('');

  const [imgType, setImgType] = useState(false);

  const form = Form.useFormInstance();

  useEffect(() => {
    try {
      form.setFieldsValue({
        validCode: '',
      });
    } catch (e) {}

    getVerCode()
      .then((res) => {
        setImageData(res.data.image);

        form.setFieldsValue({
          deviceId: res.data.deviceId,
        });
      })
      .catch((err) => {
        message.error(`err:${err}`);
        message.info('请刷新页面');
      });
  }, [imgType, count]);

  // 时间类型变化
  const onClickImage = () => {
    form.setFieldsValue({
      validCode: '',
    });

    setImgType(!imgType);
  };

  return (
    <>
      <Form.Item name={'deviceId'} hidden noStyle></Form.Item>

      <div className={'div_flex '} style={{ alignItems: 'center' }}>
        <Form.Item name={'validCode'} noStyle id={'validCode'}>
          <Input
            allowClear
            prefix={<SafetyCertificateOutlined />}
            placeholder={'请输入验证码'}
            style={{
              flex: '1',
              marginRight: 5,
              padding: '6.5px 11px 6.5px 11px',
              verticalAlign: 'middle',
            }}
          />
        </Form.Item>
        <img
          style={{
            width: '80px',
            height: '35px',
            verticalAlign: 'middle',
            padding: '0px 0px 0px 0px',
          }}
          src={imageData}
          onClick={onClickImage}
        />
      </div>
    </>
  );
};
export default CaptchaInput;
