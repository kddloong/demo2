import { createStyles } from 'antd-style';
import { LoginForm, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { terminal, useModel } from '@@/exports';
import { Form, message, Modal, Tabs } from 'antd';
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { history } from '@umijs/max';
import CaptchaInput from '@/components/form/CaptchaInput';
import { getLoginCaptcha, login, phoneLogin } from '@/services/ant-design-pro/api';
import { flushSync } from 'react-dom';
import dayjs from 'dayjs';
import {
  ContentBox,
  LoginBody,
  OuterBox,
  PanelContainer,
  PanelFooter,
  ViewHeader,
} from '@/pages/User/Login/styles';
import { fetchUserInfo as fetchUserInfoRequest } from '@/utils/get-user-info';
import { APP_ID, generateRandomString } from '@/utils/utils';

export default () => {
  const { styles } = createStyles(() => ({
    box: {},
  }))();
  const [type, setType] = useState<string>('account');
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');
  const { status, type: loginType } = userLoginState;
  const [count, setCount] = useState(0);
  const [wxOpen, setWxOpen] = useState(false);

  const [form] = Form.useForm();
  const fetchUserInfo = async () => {
    try {
      const userInfo = await fetchUserInfoRequest?.();

      terminal.log(`36:`, userInfo);
      if (userInfo) {
        flushSync(() => {
          setInitialState((s) => ({
            ...s,
            currentUser: { ...userInfo, globalTheme: 'light' },
          }));
        });
      }
    } catch (e) {
      console.log(`e`, e);
    }
  };

  const saveUserInfoToLocalStorage = (userInfo: Record<string, string>) => {
    window.localStorage.setItem('accessToken', userInfo.access_token);
    window.localStorage.setItem('refreshToken', userInfo.refresh_token);
    window.localStorage.setItem('expire_in', String(userInfo.expire_in));
    window.localStorage.setItem(
      'expire_time',
      new Date(dayjs().add(userInfo.expire_in, 'seconds').toDate()).getTime().toString(),
    );
  };
  const handleSubmit = async (values: API.LoginParams, submitType: 'mobile' | 'account') => {
    try {
      console.time('login');

      // 登录
      const msg =
        submitType === 'account'
          ? await login({
              ...values,
            })
          : await phoneLogin({ ...values });
      if (msg.success) {
        const defaultLoginSuccessMessage = '登录成功！';
        saveUserInfoToLocalStorage(msg.data);
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();

        window.localStorage.setItem('globalTheme', 'light');

        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');

        console.timeEnd('login');
        return;
      } else {
        message.error(msg.msg);

        form.setFieldsValue({
          validCode: '',
        });
        // 刷新验证码
        setCount((init) => init + 1);
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      const defaultLoginFailureMessage = '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  const bcObj = {
    backgroundImage: `url('https://farbeat-1251505225.cos.ap-shanghai.myqcloud.com/9.png')`,
  };

  useEffect(() => {
    const randomStringForWx = generateRandomString(10);

    if (wxOpen) {
      new window.WxLogin({
        self_redirect: false,
        id: 'wxContainer',
        appid: APP_ID,
        scope: 'snsapi_login',
        redirect_uri: encodeURIComponent(`http://h8.yunchaoyun.com/welcome?loginType=wechat`),
        state: randomStringForWx,
        style: '',
        href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDIwMHB4O30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9IA==',
      });
    }
  }, [wxOpen]);

  return (
    <>
      <LoginBody style={bcObj}>
        <Modal
          open={wxOpen}
          onCancel={() => {
            setWxOpen(false);
          }}
          onOk={() => {
            setWxOpen(false);
          }}
          footer={null}
          width={500}
          bodyStyle={{ height: 370 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ marginTop: 50 }} id={'wxContainer'}></div>
        </Modal>

        <PanelContainer>
          <div className={styles.box}>
            <OuterBox>
              <ContentBox style={{ minHeight: '490px' }}>
                <ViewHeader>
                  <div className="title">DEMO</div>
                </ViewHeader>

                <LoginForm
                  contentStyle={{
                    width: '100%',
                    minWidth: 280,
                    maxWidth: '75vw',
                  }}
                  form={form}
                  initialValues={{
                    autoLogin: true,
                    username: LOGIN_USERNAME,
                    password: LOGIN_PASSWORD,
                  }}
                  onFinish={async (values) => {
                    await handleSubmit(values as API.LoginParams, type);
                  }}
                >
                  <Tabs
                    activeKey={type}
                    onChange={setType}
                    items={[
                      {
                        key: 'account',
                        label: '账户密码登录',
                      },
                      {
                        key: 'mobile',
                        label: '手机号登录',
                      },
                    ]}
                  />

                  {status === 'error' && loginType === 'account' && <></>}
                  {type === 'account' && (
                    <>
                      <ProFormText
                        name="username"
                        fieldProps={{
                          size: 'large',
                          prefix: <UserOutlined />,
                        }}
                        placeholder={'用户名'}
                        rules={[
                          {
                            required: true,
                            message: '用户名是必填项！',
                          },
                        ]}
                      />
                      <ProFormText.Password
                        name="password"
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined />,
                        }}
                        placeholder={'密码'}
                        rules={[
                          {
                            required: true,
                            message: '密码是必填项！',
                          },
                        ]}
                      />

                      <CaptchaInput count={count} />
                    </>
                  )}

                  {status === 'error' && loginType === 'mobile' && <></>}
                  {type === 'mobile' && (
                    <>
                      <ProFormText
                        fieldProps={{
                          size: 'large',
                          prefix: <MobileOutlined />,
                        }}
                        name="mobile"
                        placeholder={'请输入手机号！'}
                        rules={[
                          {
                            required: true,
                            message: '手机号是必填项！',
                          },
                          {
                            pattern: /^1\d{10}$/,
                            message: '不合法的手机号！',
                          },
                        ]}
                      />
                      <ProFormCaptcha
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined />,
                        }}
                        captchaProps={{
                          size: 'large',
                        }}
                        phoneName={'mobile'}
                        placeholder={'请输入验证码！'}
                        captchaTextRender={(timing, count) => {
                          if (timing) {
                            return `${count} ${'秒后重新获取'}`;
                          }
                          return '获取验证码';
                        }}
                        name="validCode"
                        rules={[
                          {
                            required: true,
                            message: '验证码是必填项！',
                          },
                        ]}
                        onGetCaptcha={async (phone) => {
                          const result = await getLoginCaptcha(phone);
                          if (!result) {
                            return;
                          }
                        }}
                      />
                    </>
                  )}
                  <div
                    style={{
                      marginBottom: 24,
                      marginTop: 12,
                    }}
                  >
                    <Form.Item noStyle>
                      <a onClick={() => history.push('./register')}>注册新用户</a>
                    </Form.Item>
                    <a
                      onClick={() => {
                        message.info('开发中...');
                      }}
                      style={{
                        float: 'right',
                      }}
                    >
                      忘记密码 ?
                    </a>
                  </div>
                </LoginForm>
              </ContentBox>
            </OuterBox>
          </div>

          <PanelFooter> @copyright DEMO</PanelFooter>
        </PanelContainer>
      </LoginBody>
    </>
  );
};
