import { history } from '@umijs/max';
import { message } from 'antd';
import { InternalAxiosRequestConfig } from 'axios';
import { CLIENT_ID, sendLog } from '@/utils/utils';
import { get2 } from '@/services/request/request_tools';
import dayjs from 'dayjs';
import { RefreshTokenResp } from '@/services/ant-design-pro/api';

export function refreshToken() {
  return new Promise((resolve, reject) => {
    if (window.localStorage.getItem('refreshToken')) {
      get2<RefreshTokenResp>('/auth-service/login/refresh/token', {
        refresh_token: window.localStorage.getItem('refreshToken'),
      })
        .then((res) => {
          const code = res.code;

          if (code === 200) {
            const data = res.data;

            window.localStorage.setItem('accessToken', data['access_token']);
            window.localStorage.setItem('expire_in', String(data['expire_in']));
            window.localStorage.setItem(
              'expire_time',
              new Date(dayjs().add(data['expire_in'], 'seconds').toDate()).getTime().toString(),
            );

            return resolve('');
          }

          return reject(res);
        })
        .catch((err) => {
          return reject(err);
        });
    } else {
      sendLog('refreshToken fail! redirect to /user/login');

      history.push('/user/Login');
    }
  });
}

export const handleRequest = (config: InternalAxiosRequestConfig) => {
  const headers = {
    client_id: CLIENT_ID,
    // client_secret: CLIENT_SECRET,
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: '*/*',
  };

  config.headers = { ...headers, ...config.headers };

  const token = window.localStorage.getItem('accessToken');
  if (token) {
    if (config.url === '/auth-service/login/refresh/token') {
      config.headers.Authorization = '';
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    config.headers.Authorization = '';
  }
  return config;
};

// 失败提示
export function msag(err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        message.error(err.response.data.error.details);
        break;
      case 401:
        message.error('未授权，请登录');
        break;

      case 403:
        message.error('拒绝访问');
        break;

      case 404:
        message.error('请求地址出错');
        break;

      case 408:
        message.error('请求超时');
        break;

      case 500:
        message.error('服务器内部错误');
        break;

      case 501:
        message.error('服务未实现');
        break;

      case 502:
        message.error('网关错误');
        break;

      case 503:
        message.error('服务不可用');
        break;

      case 504:
        message.error('网关超时');
        break;

      case 505:
        message.error('HTTP版本不受支持');
        break;
      default:
    }
  }
}
