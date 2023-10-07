import { ProForm, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import type { FC } from 'react';
import type { SupplementCardProps } from './props';
import { Button, Form, Modal } from 'antd';
import { WS_CARD_READ_ENCODER } from '@/utils/websocket/constant';
import { useModel } from '@umijs/max';
import { useEffect } from 'react';
import { handleBindCardToMember } from '@/utils/member/member/user-info';

const SupplementCard: FC<SupplementCardProps> = (props) => {
  const { visible, setVisible, memberId, refreshTable } = props;

  const [form] = Form.useForm();

  const { sendMessage, responseData } = useModel('websocket');

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
      <Modal
        title={'补办实体卡'}
        onCancel={() => {
          setVisible(false);
        }}
        destroyOnClose={true}
        open={visible}
        onOk={async () => {
          await form.submit();
        }}
      >
        <ProForm
          form={form}
          submitter={false}
          initialValues={{
            memberId,
          }}
          onFinish={async (values) => {
            const result = await handleBindCardToMember(values.entity, memberId);

            if (result.success) {
              refreshTable();
              setVisible(false);
            }
          }}
        >
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
        </ProForm>
      </Modal>
    </>
  );
};

export { SupplementCard };
