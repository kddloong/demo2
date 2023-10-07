import { NEGATIVE_STATUS, POSITIVE_STATUS, stringToCheckBox } from '@/utils/utils';
import { message } from 'antd';
import {
  getVenueForParentId,
  getVenueSettingById,
  getVenueSettingList,
  saveVenueSetting,
} from '@/services/setting/manage/venue-setting';
import { VenueSetting } from 'types/setting/manage/venue-setting';

/**
 * 处理获取的场馆信息管理的数据
 * @date 2022-05-23
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 * @namespace VenueSetting
 */
export const handleVenueSettingList = async (params: VenueSetting.VenueSettingListParams) => {
  try {
    const result = await getVenueSettingList(params);

    if (result.success) {
      return {
        data: result.data.map((item) => {
          return {
            ...item,
            verificationType: stringToCheckBox(item.verificationType as string),
            checkType: stringToCheckBox(item.checkType as string),
          };
        }),
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return { success: result.success, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 处理根据id获取场地的设置信息
 * @date 2022-05-23
 * @param id
 * @returns {Promise<void>}
 * @namespace VenueSetting
 */
export const handleVenueSetting = async (id: string) => {
  try {
    const result = await getVenueSettingById(id);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};

/**
 * 处理修改场馆的场馆信息设置
 * @date 2022-05-23
 * @param data
 * @returns {Promise<boolean>}
 */
export const handleSaveVenueSetting = async (data: VenueSetting.VenueSettingItem) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await saveVenueSetting(data);

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
 * 处理获取的场馆的树形结构
 * @date 2022-04-29 10:23:29
 * @author ssss
 */
export const handleVenueForParentId = async () => {
  try {
    const result = await getVenueForParentId();

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

export const venueStatusObj = {
  [POSITIVE_STATUS]: {
    label: '正常营业',
    color: 'green',
  },
  [NEGATIVE_STATUS]: {
    label: '暂停营业',
    color: 'grey',
  },
};
