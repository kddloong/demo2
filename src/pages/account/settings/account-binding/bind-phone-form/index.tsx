import React, { Dispatch, SetStateAction } from 'react';
import { Form, Modal } from 'antd';
import { ProForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { basicRule, phone_RegExp } from '@/utils/utils';
import { handleBindPhone, handleValidPhone } from '@/utils/otherWaysFetchToken';

type BindPhoneFormProps = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;

  refreshTable: () => void;
};

const BindPhoneForm: React.FC<BindPhoneFormProps> = (props) => {
  const { visible, setVisible, refreshTable } = props;

  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title={'绑定手机号'}
        open={visible}
        width={370}
        closable={false}
        okText={'确认绑定'}
        onOk={async () => {
          const userId = window.localStorage.getItem('currentUserId');
          await form.validateFields();
          const data = form.getFieldsValue();
          const res = await handleBindPhone({ ...data, userId });
          if (res.success) {
            setVisible(false);
            refreshTable();
          }
        }}
        onCancel={() => {
          setVisible(false);
          refreshTable();
        }}
      >
        <ProForm submitter={false} form={form} layout={'horizontal'} labelAlign={'right'}>
          <ProFormText
            label={'手机号'}
            name={'phoneNo'}
            rules={[basicRule, { pattern: phone_RegExp, message: '请输入正确的手机号' }]}
            width={260}
          />

          <div style={{ width: 325, marginRight: 0 }}>
            <ProFormCaptcha
              label={'验证码'}
              fieldProps={{
                width: '200px',
              }}
              phoneName={'phoneNo'}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'秒后重新获取'}`;
                }
                return '获取验证码';
              }}
              name="validCode"
              rules={[{ required: true, message: '验证码是必填项！' }]}
              onGetCaptcha={async (phone) => {
                const result = await handleValidPhone({ phoneNo: phone });
                if (!result) {
                  return;
                }
              }}
            />
          </div>
        </ProForm>
      </Modal>
    </>
  );
};
export default BindPhoneForm;
