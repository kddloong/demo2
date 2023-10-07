import { ProFormGroup, ProFormText } from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import { useModel } from '@umijs/max';
import { WS_CARD_READ_ENCODER } from '@/utils/websocket/constant';
import { useEffect } from 'react';

const PhysicalCard = () => {
  const { sendMessage, responseData } = useModel('websocket');

  const form = Form.useFormInstance();

  useEffect(() => {
    // 这里的赋值, 使得外部 调用 values.entity取到值， 这里的代码不能删
    form.setFieldValue('entity', '');
  }, []);

  useEffect(() => {
    const [success, , data] = responseData;

    if (success) {
      form.setFieldsValue({
        entity: data,
      });
    }
  }, [responseData]);

  return (
    <>
      <ProFormGroup>
        <ProFormText
          name={'entity'}
          label={'实体卡录入'}
          placeholder={'请将实体卡放在读卡器上然后读卡'}
        />

        <Form.Item label={' '}>
          <Button
            type={'primary'}
            onClick={() => {
              sendMessage?.(WS_CARD_READ_ENCODER);
            }}
          >
            读卡
          </Button>
        </Form.Item>
      </ProFormGroup>
    </>
  );
};
export default PhysicalCard;
