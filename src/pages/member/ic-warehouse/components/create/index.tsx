import { basicRule } from '@/utils/utils';
import { ProForm } from '@ant-design/pro-components';
import { ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components/es';
import { useModel } from '@umijs/max';
import { Button, Form, message, Modal } from 'antd';
import { handleSaveCards } from '@/utils/device/encrypted-card/write-card';
import { WCardWarehouse } from 'types/device/encrypted-card/write-card';
import { handleDictionary } from '@/utils/main/main/dictionary';
import { useEffect } from 'react';
import { WS_CARD_GET_CARD_NO, WS_CARD_INIT_WRITE } from '@/utils/websocket/constant';

const CreateCardInDrawer = (props: { visible: boolean; setVisible: any; refreshTable: any }) => {
  const { visible, setVisible } = props;

  const { sendMessage, responseData } = useModel('websocket');

  const [form] = Form.useForm();

  useEffect(() => {
    sendMessage(WS_CARD_GET_CARD_NO);
  }, []);

  useEffect(() => {
    const [success, commandNumber, data] = responseData;

    if (success) {
      if (commandNumber === WS_CARD_INIT_WRITE) {
        setVisible(false);
      }
    }
  }, [responseData]);

  return (
    <>
      <Modal
        title={'新IC卡入库'}
        open={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose={true}
        onOk={async () => {
          await form.submit();
        }}
      >
        <ProForm<WCardWarehouse.createCardIn>
          submitter={false}
          autoFocusFirstInput
          onFinish={async (values) => {
            await handleSaveCards(values);
            setVisible(false);
            props.refreshTable?.();
          }}
          initialValues={{
            type: '0',
          }}
          form={form}
        >
          <ProFormRadio.Group
            name={'type'}
            rules={[{ ...basicRule, message: '请选择设备类型' }]}
            label={'设备类型'}
            request={async () => {
              return await handleDictionary('read_card_device_type');
            }}
          />
          <ProFormText
            name={'cardNo'}
            disabled
            addonAfter={
              <Button
                type="primary"
                onClick={async () => {
                  const type = form.getFieldValue('type');

                  if (type) {
                    sendMessage(WS_CARD_INIT_WRITE)?.('1');
                  } else {
                    message.warning('请选择设备类型!');
                  }
                }}
              >
                读卡
              </Button>
            }
            label="卡号"
            placeholder="请输入卡号"
            rules={[{ ...basicRule, message: '请输入卡号' }]}
          />
          <ProFormTextArea name={'memo'} label="备注" />
        </ProForm>
      </Modal>
    </>
  );
};

export { CreateCardInDrawer };
