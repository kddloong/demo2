import dayjs from 'dayjs';
import { ObjToGenerateOptions, TreeItem, TreeItemForProTable } from '../../types/utils';
import { terminal } from '@@/exports';

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const CLIENT_ID = '1658654933521862658';

const CLIENT_SECRET = '6c2092db139752a3';

const APP_ID = 'wxe867ec5864450524';

const QQ_CLIENT_ID = '101738311';

const CLIENT_VERSION = 'v1';

export const NEGATIVE_STATUS = '0';

export const POSITIVE_STATUS = '1';

export const password_RegExp = /^[A-Za-z0-9_]{6,12}$/;

/**
 * 2022-12-20 加上固定电话的效验
 */
export const phone_RegExp = /(^[1][3-9][0-9]{9}$)|(^(\d{3,4}-)?\d{6,8}$)/;

export const email_RegExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

/**
 * 简单的状态显示 只有 0 或 1 的状态
 */
export const trueFalseOptions = (
  trueText: string = '正常',
  falseText: string = '禁用',
  trueColor: string = 'green',
  falseColor: string = 'red',
) => {
  return {
    [POSITIVE_STATUS]: {
      label: trueText,
      color: trueColor,
    },
    [NEGATIVE_STATUS]: {
      label: falseText,
      color: falseColor,
    },
  };
};

export function sendLog(text: string) {
  const log = `[${dayjs().format(DATE_TIME_FORMAT)}] ${text}`;

  if (API_ENV === 'dev') {
    terminal.log(log);
  } else {
    const formData = new FormData();

    formData.set('content', log);

    navigator.sendBeacon(`${API_URL}/log-center/${CLIENT_VERSION}/ui/log/save`, formData);
  }
}

/**
 * 判断是否是空对象
 * @param obj
 */
/**
 * 会员卡支付
 */
export const INVEST_CARD_PAY = '4';

/**
 * @param str
 * @returns {string[]}
 */


export const sector = Array.from({ length: 15 }, (n, v) => {
  return {
    value: v + 1,
    label: `${v + 1}号`,
  };
});

/**
 * 通过该方法生成LabelValue数组
 * @param obj
 */
export function genOptionsFromObj(obj: ObjToGenerateOptions) {
  return Object.entries(obj).map((item) => {
    return { label: item[1].label, value: item[0] };
  });
}

const basicRule = { required: true };

export const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

/**
 * 将返回的特定树形数据 格式化
 * @param data
 */
export const titleToLabel = (data: TreeItem[]): TreeItemForProTable[] => {
  if (data.length === 0) {
    return [];
  }

  return data.map((item) => {
    return {
      label: item.title,
      value: item.value,
      children:
        item.children && item.children.length > 0 ? titleToLabel(item.children).flat(2) : [],
    };
  });
};

export { CLIENT_ID, CLIENT_SECRET, CLIENT_VERSION, APP_ID, QQ_CLIENT_ID };

// 表单效验规则
export { basicRule };

// 将带有HTML标签的一段文字转成无HTML标签的纯文本
export const removeHtmlTags = (rawHtml: any) => {
  return rawHtml.replace(/(<([^>]+)>)/gi, '');
};

// 获取路由地址里的code
export function getQueryString(name: string, source: string) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = source.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
  let context = '';
  if (r !== null) {
    context = decodeURIComponent(r[2]);
  }
  r = null;
  return context === null || context === '' || context === 'undefined' ? '' : context;
}

// 将数据保存到本地
export const saveUserInfoToLocalStorage = (userInfo: Record<string, string>) => {
  window.localStorage.setItem('accessToken', userInfo.access_token);
  window.localStorage.setItem('refreshToken', userInfo.refresh_token);
  window.localStorage.setItem('expire_in', String(userInfo.expire_in));
  window.localStorage.setItem(
    'expire_time',
    new Date(dayjs().add(userInfo.expire_in, 'seconds').toDate()).getTime().toString(),
  );
};

export const localStorageAccessToken = window.localStorage.getItem('accessToken');

/**
 * 生成随机的字符
 * @param length 字符位数
 */
export const generateRandomString = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
