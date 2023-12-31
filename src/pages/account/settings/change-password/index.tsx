import React from 'react';
import { ProForm, ProFormDependency, ProFormText } from '@ant-design/pro-components';
import { basicRule, password_RegExp } from '@/utils/utils';
import { Form } from 'antd';

const ChangePassWord: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <>
      <ProForm
        title="修改密码"
        form={form}
        onFinish={async (values) => {}}
        initialValues={{
          oldPassword: '',
          password: '',
          repassword: '',
        }}
      >
        <ProFormText.Password label="旧密码" name="oldPassword" width={'sm'} />

        <ProFormText.Password
          label="新密码"
          name="password"
          width={'sm'}
          rules={[
            basicRule,
            {
              pattern: password_RegExp,
              message: '密码只能包含字母、数字、_, 长度为6-12位',
            },
          ]}
        />

        <ProFormDependency name={['password']}>
          {({ password }) => {
            return (
              <ProFormText.Password
                label="确认密码"
                name="repassword"
                width={'sm'}
                rules={[
                  basicRule,
                  {
                    pattern: password_RegExp,
                    message: '密码只能包含字母、数字、_, 长度为6-12位',
                  },
                  () => ({
                    validator: (rule, value) => {
                      if (value === password) {
                        return Promise.resolve();
                      }
                      return Promise.reject('两次密码不同');
                    },
                  }),
                ]}
              />
            );
          }}
        </ProFormDependency>
      </ProForm>
    </>
  );
};
export default ChangePassWord;
