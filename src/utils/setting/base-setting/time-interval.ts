import { message } from 'antd';
import {
  deleteTimeInterval,
  getTimeInterval,
  getTimeIntervalDataById,
  getTimeIntervalSelectList,
  saveTimeInterval,
} from '@/services/setting/base-setting/time-interval';
import { RequestTableParam } from 'types/utils';
import { TimeInterval } from '../../../../types/setting/base-setting/time-interval';

/**
 * 处理获取的时段列表
 * @date 2022-01-05 11:34:15
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handleTimeInterval = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getTimeInterval(params);

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
      return {};
    }
  } catch (err) {
    hide();

    return {};
  }
};

/**
 * 处理根据id获取时段
 * @data 2022-01-05 11:34:15
 * @param id
 * @returns {Promise<*[]|*>}
 */
export const handleTimeIntervalDataById = async (id: string) => {
  try {
    const result = await getTimeIntervalDataById(id);

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

/**
 * 处理提交时段
 * @date 2022-01-05 11:34:15
 * @param data
 * @returns {Promise<boolean>}
 */
export const handleSaveTimeInterval = async (data: TimeInterval.TimeIntervalItem) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await saveTimeInterval(data);

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
 * 处理删除时段
 * @date 2022-01-05 11:34:15
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleDeleteTimeInterval = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteTimeInterval(id);

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
 * 处理获取的时段数据，用于下拉框
 * @date 2022-01-07 09:10:36
 * @returns {Promise<*[]|*>}
 */
export const handleGetTimeIntervalStartList = async () => {
  try {
    const result = await getTimeIntervalSelectList();

    if (result.success) {
      return result.data.map((item) => {
        return {
          label: `${item.label} (${item.beginTime}-${item.endTime})`,
          value: item.value,
        };
      });
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};
