import React, { Dispatch, SetStateAction } from 'react';
import { Form, Modal } from 'antd';
import { ProForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { basicRule, email_RegExp } from '@/utils/utils';
import { handleBindEmail, handleValidEmail } from '@/utils/otherWaysFetchToken';

type BindEmailFormProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  refreshTable: () => void;
};

const BindEmailForm: React.FC<BindEmailFormProps> = (props) => {
  const { open, setOpen, refreshTable } = props;
  const [form] = Form.useForm();

  return (
    <>
      <Modal
        title={'绑定邮箱'}
        width={400}
        open={open}
        afterClose={() => refreshTable()}
        okText={'确认绑定'}
        closable={false}
        onOk={async () => {
          const userId = window.localStorage.getItem('currentUserId');
          await form.validateFields();
          const data = form.getFieldsValue();
          const res = await handleBindEmail({ ...data, userId });
          if (res.success) {
            setOpen(false);
            refreshTable();
          }
          // 刷新页面
        }}
        onCancel={() => {
          setOpen(false);
          refreshTable();
        }}
      >
        <ProForm submitter={false} form={form} layout={'horizontal'} labelAlign={'right'}>
          <ProFormText
            label={'邮箱地址'}
            name={'mailAddress'}
            rules={[basicRule, { pattern: email_RegExp, message: '请输入正确格式的邮箱地址' }]}
            width={260}
          />

          <div style={{ width: 360 }}>
            <ProFormCaptcha
              label={'验证码'}
              fieldProps={{
                width: '200px',
              }}
              phoneName={'mailAddress'}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'秒后重新获取'}`;
                }
                return '获取验证码';
              }}
              name="validCode"
              rules={[{ required: true, message: '验证码是必填项！' }]}
              onGetCaptcha={async (mailAddress) => {
                const result = await handleValidEmail({ mailAddress });
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
export default BindEmailForm;
