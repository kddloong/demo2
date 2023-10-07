// @ts-ignore
/* eslint-disable */
import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION, sendLog } from '@/utils/utils';
import { TypeUtil } from 'types/utils';
import { CurrentUser } from 'types/current-user';
import md5 from 'js-md5';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: {
  [key: string]: any;
}): Promise<TypeUtil.RequestResult<CurrentUser>> {
  sendLog(`fetching user info...`);

  return get(`/user-service/${CLIENT_VERSION}/sys/user/info`);
}

type VerCode = TypeUtil.RequestResult<{
  image: string;
  deviceId: string;
}>;

export async function fetchMenuData() {
  return get(`/user-service/${CLIENT_VERSION}/sys/per/menuList`, ``);
}

/** 登录接口 POST /api/login/account */
export async function phoneLogin(
  body: API.PhoneLoginParams,
  options?: { [key: string]: any },
): Promise<Login> {
  const { ...params } = body;

  return get(
    `/auth-service/login/phone/token?phoneNo=${params.mobile}&validCode=${params.validCode}`,
    '',
  );
}

/**
 * 获取登录的手机验证码
 * @param phone
 */
export async function getLoginCaptcha(phone: string): Promise<TypeUtil.RequestResult<string>> {
  return get(`/auth-service/sms/code`, { phoneNo: phone });
}

export async function getButtonAccess(): Promise<TypeUtil.RequestResult<string[]>> {
  return get(`/user-service/${CLIENT_VERSION}/sys/per/buttonList`);
}

export async function getVerCode(): Promise<VerCode> {
  return get('/auth-service/captcha', {});
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin() {
  return get('/auth-service/login/logout');
}

type Login = TypeUtil.RequestResult<{
  access_token: string;
  refresh_token: string;
  expire_in: number;
}>;

export type RefreshTokenResp = TypeUtil.RequestResult<{ access_token: string; expire_in: number }>;

/** 登录接口 POST /api/login/account */
export async function login(
  body: API.PasswordLoginParams,
  options?: { [key: string]: any },
): Promise<Login> {
  const { ...params } = body;

  return get(
    `/auth-service/login/user/token?userName=${params.username}&password=${md5(
      params?.password || '',
    )}&validCode=${params.validCode}&deviceId=${params.deviceId}`,
    '',
  );
}

//微信扫码登录使用appId加code换取accessToken
export async function wxLogin(params: {
  client_id: string;
  client_secret: string;
  appId: string;
  code: string;
}): Promise<Login> {
  return get(`/auth-service/wx/open/login`, params);
}

// QQ扫码登录使用appId加code换取accessToken
export async function qqLogin(params: {
  client_id: string;
  client_secret: string;
  appId: string;
  code: string;
}): Promise<Login> {
  return get(`/auth-service/qq/open/login`, params);
}

// 绑定微信
export async function bindWechat(params: {
  appId: string;
  code: string;
  id: string;
}): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${CLIENT_VERSION}/sys/user/wx/binding`, params);
}

// 绑定qq
export async function bindQQ(params: {
  appId: string;
  code: string;
  id: string;
}): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${CLIENT_VERSION}/sys/user/qq/binding`, params);
}

//绑定手机 获取手机验证码
export async function validPhone(params: { phoneNo: string }): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${CLIENT_VERSION}/sys/user/phone/code`, params);
}

// 绑定手机 验证手机验证码
export async function bindPhone(params: {
  phoneNo: string;
  userId: string;
  validCode: string;
}): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${CLIENT_VERSION}/sys/user/phone/binding`, params);
}

// 绑定邮箱 获取邮箱验证码
export async function validEmail(params: { mailAddress: string }): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${CLIENT_VERSION}/sys/user/mail/code`, params);
}

// 绑定邮箱 验证验证码
export async function bindEmail(params: {
  mailAddress: string;
  userId: string;
  validCode: string;
}): Promise<TypeUtil.RequestResult> {
  return post(`/user-service/${CLIENT_VERSION}/sys/user/mail/binding`, params);
}
