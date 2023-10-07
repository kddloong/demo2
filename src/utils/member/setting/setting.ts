import { message } from 'antd';
import { stringToCheckBox } from '@/utils/utils';
import { RequestTableParam } from 'types/utils';
import {
  deleteChargeDetail,
  deleteCountDetail,
  deleteExpireDetail,
  fetchOperateSettingAndShop,
  getMemberCardList,
  getMemberSettingInfoById,
  getMemberSettingList,
  getMemberTransactInfo,
  saveMemberSetting,
  saveMemberTransact,
} from '@/services/member/setting/setting';
import { InvestCardTypeEnum } from '@/utils/enums';

/**
 * 处理获取的数据
 * @date 2021.12.26
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleMemberSettingList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据');

  try {
    const result = await getMemberSettingList(params);

    hide();

    if (result.success) {
      return {
        data: result.data.map((item) => {
          return {
            ...item,
            useType: stringToCheckBox(item.useType),
          };
        }),
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (e) {
    return {};
  }
};

/**
 * 工具: 保存设置信息
 * @date 2022-05-05 09:35:50
 * @param {object} data
 * @author ssss
 */
export const handleSaveMemberSetting = async (data: MemberCardConfigSetting.SaveSettingItem) => {
  const hide = message.loading('正在保存！');

  try {
    const result = await saveMemberSetting(data);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 工具类: 获取设置信息
 * @date 2022-05-05 09:41:46
 * @param {string} id
 * @author ssss
 */
export const handleMemberSettingInfoById = async (id: string) => {
  try {
    const result = await getMemberSettingInfoById(id);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    return {};
  }
};

const rules = [{ required: true }];

export { rules as MemberSettingBasicRule };

/**
 * 处理获取的场地类型和商店
 */
export const handleFetchOperateAndShop = async (tenantId: string) => {
  try {
    const result = await fetchOperateSettingAndShop(tenantId);

    if (result.success) {
      return result.data || [];
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 数字输入框效验
 * @param outerMessage
 * @param outerRule
 */
export const baseRule = (outerMessage: string, outerRule: 'than' | 'equal') => {
  return [
    () => ({
      validator: (rule: any, value: any) => {
        if (!value && value !== 0) {
          return Promise.reject(`请输入${outerMessage}`);
        }

        if (outerRule === 'than') {
          if (Number(value) <= 0) {
            return Promise.reject('请输入大于0的数');
          }
        }

        if (outerRule === 'equal') {
          if (Number(value) < 0) {
            return Promise.reject('请输入大于等于0的数');
          }
        }

        return Promise.resolve();
      },
    }),
  ];
};

/**
 * 删除储值卡套餐配置
 * @author ssss
 * @date
 */
export const handleDeleteChargeDetail = async (id: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await deleteChargeDetail(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    hide();

    return { success: false };
  }
};

/**
 * 删除计次卡套餐配置
 * @author ssss
 * @date
 */
export const handleDeleteCountDetail = async (id: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await deleteCountDetail(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    hide();

    return { success: false };
  }
};

/**
 * 删除期限卡套餐配置
 * @author ssss
 * @date
 */
export const handleDeleteExpireDetail = async (id: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await deleteExpireDetail(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    hide();

    return { success: false };
  }
};

/**
 * 会员卡种列表
 * @param params
 */
export const handleFetchMemberCardList = async (
  params: MemberCardConfigSetting.MemberCardListParams,
) => {
  const hide = message.loading('正在获取数据');

  try {
    const result = await getMemberCardList(params);
    hide();
    if (result.success) {
      return {
        data: result.data,
        success: true,
      };
    } else {
      message.warning(result.msg);
      return {
        data: null,
        success: false,
      };
    }
  } catch (e) {
    return {
      data: null,
      success: false,
    };
  }
};

/**
 * 保存或者修改会员认证方式
 * @param params
 *
 */
export const handleSaveMemberTransact = async (
  params: MemberCardConfigSetting.MemberTransactionParams,
) => {
  const hide = message.loading('正在保存');

  try {
    const result = await saveMemberTransact(params);
    hide();
    if (result.success) {
      message.success(result.msg);
      return {
        success: true,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: '',
      };
    }
  } catch (e) {
    return {
      success: false,
      data: '',
    };
  }
};

/**
 * 获取会员认证方式详情
 */
export const handleFetchMemberTransactInfo = async () => {
  try {
    const result = await getMemberTransactInfo();
    if (result.success) {
      return {
        data: result.data,
        success: true,
      };
    } else {
      message.warning(result.msg);
      return {
        data: null,
        success: false,
      };
    }
  } catch (e) {
    return {
      data: null,
      success: false,
    };
  }
};

export const memberTypeObj = {
  [InvestCardTypeEnum.COUNT_CARD]: {
    label: '计次卡',
    color: 'green',
  },
  [InvestCardTypeEnum.STORE_CARD]: {
    label: '储值卡',
    color: 'gold',
  },
  [InvestCardTypeEnum.EXPIRE_CARD]: {
    label: '期限卡',
    color: 'blue',
  },
};

export const useTypeOptions = [
  {
    label: '实物卡',
    value: '0',
  },
  {
    label: '人脸识别',
    value: '1',
  },
  {
    label: '小程序会员卡',
    value: '2',
  },
];

const countCardBg = `url('${require('/public/images/card_count.png')}')`;
const expireCardBg = `url('${require('/public/images/card_expire.png')}')`;
const storeCardBg = `url('${require('/public/images/card_store.png')}')`;

const count_color = '#EFF2F7';
const expire_color = '#0559B5';
const store_color = '#A75900';

const count_border = `1px solid ${'#EFF2F7'}`;
const expire_border = `1px solid ${'#0559B5'}`;
const store_border = `1px solid ${'#A75900'}`;

const count_border_bg = `#D8DCDF`;
const expire_border_bg = `#D8F4FC`;
const store_border_bg = `#FFF1D8`;

export const bgObj = {
  '0': storeCardBg,
  '1': expireCardBg,
  '2': countCardBg,
};

export const colorObj = {
  '0': count_color,
  '1': expire_color,
  '2': store_color,
};

export const borderObj = {
  '0': count_border,
  '1': expire_border,
  '2': store_border,
};

export const borderBgObj = {
  '0': count_border_bg,
  '1': expire_border_bg,
  '2': store_border_bg,
};
