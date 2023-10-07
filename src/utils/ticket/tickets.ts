import {
  changeVenueTicketSettingStatus,
  deleteTicketSetting,
  fetchVenueTicketSettingById,
  fetchVenueTicketsList,
  saveTicketSetting,
} from '@/services/ticket/tickets';
import { message } from 'antd';
import { TicketSetting } from '../../../types/ticket/tickets';

/**
 * 获取对应场馆的售票设置信息
 * @param venueId
 */
export const handleFetchVenueTicketsList = async (venueId: string) => {
  try {
    const result = await fetchVenueTicketsList(venueId);

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
 * 保存票务设置信息
 * @param data
 */
export const handleSaveVenueTicketSetting = async (data: TicketSetting.SaveParams) => {
  const hide = message.loading('正在保存！');

  try {
    const result = await saveTicketSetting(data);

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
 * 处理删除票务设置
 * @param id
 */
export const handleDeleteTicketSetting = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteTicketSetting(id);

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
 * 获取售票的配置详情
 * @param id
 */
export const handleFetchVenueTicketSettingById = async (id: string) => {
  try {
    const result = await fetchVenueTicketSettingById(id);

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
 * 处理售票状态
 * @author ssss
 * @param id
 * @param action
 */
export const handleChangeVenueTicketSettingStatus = async (
  id: string,
  action: 'start' | 'stop',
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await changeVenueTicketSettingStatus(id, action);

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
