import { message } from 'antd';
import {
  deleteHoliday,
  fetchHolidayCalendar,
  fetchHolidayList,
  fetchHolidaySelect, fetchHolidayTableList,
  getHolidayDataById,
  saveHoliday,
} from '@/services/setting/base-setting/holiday';
import { RequestTableParam } from 'types/utils';
import { Holiday } from '../../../../types/setting/base-setting/holiday';

/**
 * 处理获取的预订节假日列表
 * @date 2022-01-05 09:18:21
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handleFetchHolidayList = async (params: RequestTableParam) => {
  try {
    const result = await fetchHolidayList(params);

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.error(result.msg);
      return { success: false };
    }
  } catch (err) {
    return { success: false };
  }
};

/**
 * 处理根据id获取预订节假日
 * @data 2022-01-05 09:18:59
 * @param id
 * @returns {Promise<*[]|*>}
 */
export const handleHolidayDataById = async (id: string) => {
  try {
    const result = await getHolidayDataById(id);

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
 * 处理保存预订节假日操作
 * @date 2022-01-05 09:20:31
 * @param data
 * @returns {Promise<boolean>}
 */
export const handleSaveHoliday = async (data: Holiday.HolidayItem) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await saveHoliday(data);

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
 * 处理删除节假日操作
 * @date 2022-01-05 09:21:31
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleDeleteHoliday = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteHoliday(id);

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
//
/**
 * 处理获取的节假日的下拉框数据
 * @date 2022-01-19 10:51:38
 * @returns {Promise<*[]|*>}
 */
export const handleHolidaySelectData = async () => {
  try {
    const result = await fetchHolidaySelect();

    if (result.success) {
      return [...result.data];
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 获取节假日日历数据
 * @param params
 */
export const handleFetchHolidayCalendar = async (params: Holiday.HolidayCalendarParams) => {
  try {
    const result = await fetchHolidayCalendar(params);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 获取节假日列表模式数据
 * @date 2023-09-27
 * @param params
 */
export const handleFetchHolidayTableList = async (params: RequestTableParam) => {
  try {
    const result = await fetchHolidayTableList(params);

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.error(result.msg);
      return { success: false };
    }
  } catch (err) {
    return { success: false };
  }
};
