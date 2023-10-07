import BigNumber from 'bignumber.js';
import { RcFile, UploadFile } from 'antd/es/upload/interface';
import { message, Upload } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import replace from 'lodash/replace';
import { ObjToGenerateOptions, TreeItem, TreeItemForProTable } from '../../types/utils';
import { terminal } from '@@/exports';

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const TIME_FORMAT = 'HH:mm';

export const DATE_TIME_FORMAT_FOR_RACE = 'YYYY-MM-DD HH:mm';

const CLIENT_ID = '1658654933521862658';

const CLIENT_SECRET = '6c2092db139752a3';

const APP_ID = 'wxe867ec5864450524';

const QQ_CLIENT_ID = '101738311';

const CLIENT_VERSION = 'v1';

const CLIENT_VERSION_V2 = 'v2';

export const NEGATIVE_STATUS = '0';

export const POSITIVE_STATUS = '1';

export const SECOND = '2';
export const TICKET_MACHINE = '3';

export const FORBID_CHECK_NOT_CURRENT_DAY_TICKET = '非当天使用的票不能核销';

export const password_RegExp = /^[A-Za-z0-9_]{6,12}$/;

// 用于键盘事件监听数字键
export const filterKey = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  13,
  96,
  97,
  98,
  99,
  100,
  101,
  102,
  103,
  104,
  105,
];

/**
 * 清除 ProTable 里面 的padding
 */
export const clearCardInProTablePadding = {
  cardProps: {
    bodyStyle: {
      padding: '0',
    },
  },
};

export const moneyText = function moneyNeedPay(config: { amount: string | number }) {
  return `${config.amount}元`;
};

export const getPriceType = (type: string) => {
  switch (type) {
    case '0':
      return '正常价格';
    case '1':
      return '低免价格';
    case '2':
      return '免费';
    case '3':
      return '假期价格';
    default:
      return '';
  }
};

export const replaceBarcode = (barCode: string) => {
  return replace(barCode, 'Enter', '');
};

/**
 * 2022-12-20 加上固定电话的效验
 */
export const phone_RegExp = /(^[1][3-9][0-9]{9}$)|(^(\d{3,4}-)?\d{6,8}$)/;

export const email_RegExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

export const IP_RegExp =
  /^(([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])$/;

export const IDCard_RegExp =
  /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

export const port_RegExp =
  /^([1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;

export const licenseNo_RegExp =
  /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{15})$/;

// 邮政编码
export const postalCode_RegExp =
  /^(0[1-7]|1[0-356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[0-5]|8[013-6])\d{4}$/;

// 纳税人识别号
export const taxNo_RegExp = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;

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

export const labelSpan = {
  labelCol: {
    span: 24,
  },
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

export const handleDisabled = (type: string) => {
  return type === 'show' ? { disabled: true } : {};
};

// 一个扇区有4个块
const BLOCK_NUMBER_IN_ONE_ADDRESS = 4;

// 一个 实体卡 里面 共有 16个 扇区  0- 16

// 实体卡厂商 占用了 第一个扇区

// 所以可用的扇区号 为 1-15

// 0号扇区对应的块号 为 0-3

//  1号扇区对应的块号 为 4-7

/**
 * 根据对应的扇区号 返回对应的块的序号
 * @param address 扇区号
 */
export const generateBlock = (address: string) => {
  const beginNumber = +address * BLOCK_NUMBER_IN_ONE_ADDRESS;

  const array = Array.from({ length: 3 });

  return array.map((item, index) => {
    return (index + beginNumber).toString();
  });
};

/**
 * 上传的文件是否是图片
 * @param url
 */
export const isImage = (url: string) => {
  return /\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(url);
};

/**
 * 判断是否是空对象
 * @param obj
 */
export const isEmpty = (obj: object) =>
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

/**
 * 会员卡支付
 */
export const INVEST_CARD_PAY = '4';

/**
 * @param str
 * @returns {string[]}
 */
export const stringToCheckBox = (str: string | string[]): string[] => {
  if (typeof str === 'undefined') {
    return [];
  }

  if (Object.prototype.toString.call(str) === '[object Array]') {
    return str as string[];
  }

  if (str.length === 0) {
    return [];
  } else {
    if (str === ',') {
      return [];
    } else {
      return (str as string).split(',');
    }
  }
};

/**
 * 停用和正常
 * @date 2022-12-01
 */
export const stopAndNormalObj = {
  [NEGATIVE_STATUS]: {
    label: '停用',
    color: 'red',
  },
  [POSITIVE_STATUS]: {
    label: '正常',
    color: 'green',
  },
};

/**
 * 将 upload 组件的数据 转换为字符串
 * @param imageArr
 */
export const handleImageArr = (imageArr: UploadFile[]) => {
  return imageArr.map((item) => item.url).join(',');
};

export const weeks = [
  { value: 1, label: '星期一' },
  { value: 2, label: '星期二' },
  { value: 3, label: '星期三' },
  {
    value: 4,
    label: '星期四',
  },
  { value: 5, label: '星期五' },
  { value: 6, label: '星期六' },
  { value: 7, label: '星期天' },
];

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

export const fallbackString = '暂无数据权限';

const basicRule = { required: true };

/**
 * 效验 输入的值大于等于0
 */
const valueMinZeroRule = {
  // _ 的 类型 应该是 RuleObject
  // 具体可以参考 src/pages/setting/manage/new-operate-setting/components/Price/components/tickets/index.ts
  validator(_: any, value: string) {
    if (value === '') {
      return Promise.reject('请输入大于等于0的数!');
    }

    if (+value >= 0) {
      return Promise.resolve();
    } else {
      return Promise.reject('请输入大于等于0的数!');
    }
  },
};

const NORMAL_PRICE = '0';

const LOW_FREE_PRICE = '1';

const FREE_PRICE = '2';

const priceTypeOptions = [
  {
    label: '正常收费',
    value: NORMAL_PRICE,
  },
  {
    label: '免费',
    value: FREE_PRICE,
  },
];

export const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

/**
 * 计算折扣
 * @param num 被处理的数
 * @param discount 折扣值
 * @param percent 是 除 10  还是 除100
 * @return {BigNumber}
 */
const getDiscountedNumber = (num: number, discount: number, percent = 10) => {
  return new BigNumber(num).div(percent).times(discount);
};

const formatNumber = (target: number | string, dp: number = 2): number => {
  return new BigNumber(target).dp(dp).toNumber();
};

const NORMAL_STATUS = '1';

const STOP_STATUS = '0';

const ALL_STATUS = '-1';

const useStatusOptions = [
  {
    label: '启用',
    value: NORMAL_STATUS,
  },
  {
    label: '停用',
    value: STOP_STATUS,
  },
];

const sexOptions = [
  {
    label: '男',
    value: '0',
  },
  {
    label: '女',
    value: '1',
  },
];

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

/**
 * 将字符串中的换行符替换成<br/>
 * @param str
 */
export const replaceStr = (str: string) => {
  if (str) {
    return str?.replace(/\n/g, `<br/>`)?.replace(/\r\n/g, '<br/>')?.replace(/\s/g, '<br/>');
  }

  return '';
};

/**
 * 将字符串中的<br/>替换成换行符
 * @param str
 */
export const returnStr = (str: string) => {
  return str ? str.replace(/<br\/>/g, '\n') : '-';
};

export const PAY_PAUSE = 'USERPAYING';

export { CLIENT_ID, CLIENT_SECRET, CLIENT_VERSION, CLIENT_VERSION_V2, APP_ID, QQ_CLIENT_ID };

// 表单效验规则
export { basicRule, valueMinZeroRule };
export { NORMAL_PRICE, LOW_FREE_PRICE, FREE_PRICE, priceTypeOptions };
export { getDiscountedNumber, formatNumber };
export { NORMAL_STATUS, STOP_STATUS, useStatusOptions, sexOptions };
export { ALL_STATUS };

export const isCurrentPoolExist = (poolId: string | undefined | null) => {
  if (!poolId) {
    message.warning('@@initialState里面用户池id不存在');
    return false;
  }

  return true;
};

/**
 * 将单图片上传的字符串转为upload组件的数据
 * @param imageUrl
 */
const avatarImage = (imageUrl: string = ''): UploadFile[] => {
  if (!imageUrl) {
    return [];
  }

  return [
    {
      name: imageUrl,
      uid: '1',
      url: imageUrl,
      status: 'done',
    },
  ];
};

export { avatarImage };

export function* genTree(nodes: TreeItem[]) {
  for (const item of nodes) {
    yield item.key;
    if (item.children && item.children.length) yield* genTree(item.children);
  }
}

export function getPreviousRange() {
  return [dayjs().add(-6, 'day'), dayjs()];
}

export function fixedZero(val: number) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance(type: 'today' | 'week' | 'month' | 'year'): [Dayjs, Dayjs] {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [dayjs(now), dayjs(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [dayjs(beginTime), dayjs(beginTime + (7 * oneDay - 1000))];
  }
  const year = now.getFullYear();

  if (type === 'month') {
    const month = now.getMonth();
    const nextDate = dayjs(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      dayjs(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      dayjs(dayjs(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  return [dayjs(`${year}-01-01 00:00:00`), dayjs(`${year}-12-31 23:59:59`)];
}

export const http_RegExp = /(http(s)?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传JPG/PNG格式的图片 ');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小小于2MB!');
  }
  return isJpgOrPng && isLt2M ? true : Upload.LIST_IGNORE;
};

/**
 * 仅允许word或pdf
 * @param file
 */
export const beforeUploadOnlyFile = (file: RcFile) => {
  const isJpgOrPng =
    file.type === 'application/pdf' ||
    file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  if (!isJpgOrPng) {
    message.error('只能上传DOCX/PDF格式的文件 ');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('图片大小小于10MB!');
  }
  return isJpgOrPng && isLt10M ? true : Upload.LIST_IGNORE;
};

export const pictureStrToUploadFile = (url: string) => {
  if (url.indexOf(',')) {
    return stringToCheckBox(url)?.map((urlItem, index) => {
      return {
        url: urlItem,
        name: `${index}`,
        status: 'done',
        uid: `${index}`,
      };
    });
  } else {
    return [
      {
        url: url,
        name: '1',
        status: 'done',
        uid: `1`,
      },
    ];
  }
};

/**
 * 根据type判断当前页面的怎么渲染
 * @param type
 */
export const handlePageType = (type: 'add' | 'update' | 'edit' | 'show') => {
  const typeObj = {
    add: '新增',
    update: '修改',
    edit: '修改',
    show: '查看',
  };

  return typeObj[type];
};

// 将带有HTML标签的一段文字转成无HTML标签的纯文本
export const removeHtmlTags = (rawHtml: any) => {
  return rawHtml.replace(/(<([^>]+)>)/gi, '');
};

// 处理跳转至问卷调查时需要传的数据
export const jumpToOuterQuestionnaireFun = (
  surveyId?: string,
  sid?: string,
  answerId?: string,
  userName?: string,
  userId?: string,
) => {
  /**
   * 三种不同的跳转情况：
   * 编辑问卷 token、surveyId、sid 必传
   * http://223.108.233.254:8044/DesignSurvey?data=
   * 回答问卷 token、surveyId、sid 必传
   * http://223.108.233.254:8044/Diaowen?data=
   * 问卷答案查看
   * http://223.108.233.254:8044/PreviewAnswerData?data=
   * 预览
   * http://223.108.233.254:8044/DesignStyle/DesignStylePreview?data=
   *
   *
   // *
   */
  const myToken = window.localStorage.getItem('accessToken');
  const data = {
    surveyId,
    sid,
    answerId,
    userName,
    userId,
    token: myToken,
  };

  return encodeURIComponent(JSON.stringify(data));
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

/**
 * 用于日期组件（不可选用日期）
 * @param current
 */
export const crmDisabledDate = (current: any) => {
  const currentDate = dayjs().startOf('day');
  return current.isBefore(currentDate);
};

/**
 * 分割 ISO 格式的时间字符串
 * @param str
 */
export function splitISOTimeString(str: string) {
  return str.split('.')[0];
}
