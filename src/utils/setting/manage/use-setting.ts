import { message } from 'antd';
import {
  addUseSetting,
  getUseSettingById,
  getUseSettingList,
} from '@/services/setting/manage/use-setting';
import { RequestTableParam } from 'types/utils';
import { UseSetting } from '../../../../types/setting/manage/use-setting';

/**
 * 处理获取的使用设置列表
 * @date 2022-01-05 10:03:44
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handleUseSettingList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getUseSettingList(params);

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    hide();

    return [];
  }
};

export const labelCol = { span: 6 };

/*
 * 处理根据id获取使用设置
 * @date 2022-01-05 10:05:08
 * @param id
 * @returns {Promise<{}|*>}
 */
export const handleUseSettingById = async (id: string) => {
  try {
    const result = await getUseSettingById(id);

    if (result.success) {
      return result.data || [];
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    return {};
  }
};

/**
 * 处理编辑使用设置操作
 * @date 2022-01-05 10:06:23
 * @param data
 * @returns {Promise<boolean>}
 */
export const handleAddUseSetting = async (data: UseSetting.UseSettingItem) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await addUseSetting(data);

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
