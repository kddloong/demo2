import axios from 'axios';
import { CLIENT_ID, sendLog } from '@/utils/utils';
import { history } from '@umijs/max';
import { message } from 'antd';
import { handleRequest, refreshToken } from '@/services/request/tools';
import dayjs from 'dayjs';
import qs from 'qs';

export const service = axios.create({ timeout: 100000, baseURL: API_URL });

export const service2 = axios.create({
  timeout: 100000,
  baseURL: API_URL,
  headers: {
    client_id: CLIENT_ID,
  },
});

// 刷新状态
let refreshTag = false;

const requestWithoutToken = ['/auth-service/captcha', '/auth-service/login/refresh/token'];

/**
 * http request 拦截器
 */

service.interceptors.request.use(
  async (config) => {
    // 上传文件时  不走这里
    if (config.headers?.thisType !== 'file') {
      config.data = qs.stringify(config.data, { allowDots: true });
    }

    const expireTime = window.localStorage.getItem('expire_time');

    if (!expireTime) {
      //如果localStorage没有 expire_time, 直接请求
      return handleRequest(config);
    } else {
      const expireTimeDiff = expireTime && dayjs(+expireTime).diff(dayjs(), 's');

      if (expireTimeDiff < 400 && !requestWithoutToken.includes(config?.url)) {
        //如果 expire_time 小于 400秒  并且该接口需要token
        if (!refreshTag) {
          refreshTag = true;

          await refreshToken().then(() => {
            refreshTag = false;
            return handleRequest(config);
          });
        }
      } else {
        //如果 expire_time 大于400秒
        return handleRequest(config);
      }
    }

    return handleRequest(config);
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * http response 拦截器
 * 如果response status
 */
service.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code === 401) {
      window.localStorage.clear();
      sendLog('response onFulfilled 401 fail! redirect to /user/login');

      localStorage.removeItem('accessToken');
      history.push('/user/login');
    }

    if (!response.data.success) {
      sendLog(`error requests url: ${response.config.url}`);

      sendLog(`error requests params: ${JSON.stringify(response.config?.params)}`);

      const responseMsg = response.data.msg;

      const reg = /[\r\n]+/g;

      if (reg.test(responseMsg)) {
        sendLog(`查询语句出错`);
      } else {
        sendLog(`error requests msg: ${responseMsg}`);
      }
    }

    return response.data;
  },
  (error) => {
    console.log(`err`, error);
    // 超出 2xx 范围的状态码都会触发该函数。
    const response = error.response;

    sendLog(`error requests url: ${response.config.url}`);

    sendLog(`error requests params: ${JSON.stringify(response.config?.params)}`);

    const responseMsg = response.data.msg;

    if (responseMsg.indexOf('\n') >= 0) {
      const newMsg = response.data.msg.substring(5);

      sendLog(newMsg + '');

      const msgLen = responseMsg / 100 + 1;

      sendLog(msgLen + '');

      Array.from({ length: msgLen }).forEach((item, index) => {
        sendLog(`error requests msg: ${newMsg.slice(index * 100, (index + 1) * 100)}`);
      });
    } else {
      sendLog(`error requests msg: ${response.data.msg}`);
    }

    if (!response) {
      message.error(error.message);
    }

    if (response?.data?.code === 401) {
      window.localStorage.clear();

      sendLog('http response 401 fail! redirect to /user/login');

      localStorage.removeItem('accessToken');
      history.push('/user/login');
    }

    if (response?.data?.code !== 401) {
      if (response.data.code !== 404) {
        message.error('系统繁忙, 请稍后再试');
      }
    }
  },
);

/**
 * http response 拦截器
 */
service2.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      window.localStorage.clear();
      sendLog('service2  response 401 fail! redirect to /user/login');

      localStorage.removeItem('accessToken');
      history.push('/user/login');
    }

    if (response.data.code === 400) {
      console.log('errmsg', response.data.msg);

      window.localStorage.clear();
    }

    return response.data;
  },
  (error) => {
    const response = error.response;

    if (response?.data?.code === 401) {
      window.localStorage.clear();
      sendLog('response 401 fail! redirect to /user/login');

      localStorage.removeItem('accessToken');
      history.push('/user/login');
    }

    if (response?.data?.code !== 401) {
      if (response.data.code !== 404) {
        message.error('系统繁忙, 请稍后再试');
      }
    }
  },
);
