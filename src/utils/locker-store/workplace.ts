import { message } from 'antd';
import {
  fetchStoreAreaSelectData,
  fetchStoreDoorStatus,
  fetchStoreInArea,
  openDoor,
  pauseDoor,
  resetStorePassword,
  restoreDoor,
  syncDeviceInfo,
  syncStoreTime,
} from '@/services/locker-store/workplace';

/**
 * 获取储物柜区域信息
 * @author ssss
 * @date
 */
export const handleFetchStoreAreaSelectData = async () => {
  try {
    const result = await fetchStoreAreaSelectData();

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
 * 获取储物柜区域里的储物柜
 * @author ssss
 * @date
 */
export const handleFetchStoreInArea = async (area: string) => {
  try {
    const result = await fetchStoreInArea(area);

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
 * 获取箱门的状态
 * @author ssss
 * @date
 */
export const handleFetchStoreDoorStatus = async (deviceNo: string, doorNum: string = '') => {
  try {
    const result = await fetchStoreDoorStatus(deviceNo, doorNum);

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: null };
    }
  } catch (err) {
    return { success: false, data: null };
  }
};

/**
 * 同步储物柜时间
 * @author ssss
 * @date
 */
export const handleSyncStoreTime = async (deviceNo: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await syncStoreTime(deviceNo);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: '' };
    }
  } catch (err) {
    hide();

    return { success: false, data: '' };
  }
};

/**
 * 重置储物柜密码
 * @author ssss
 * @date
 */
export const handleResetStorePassword = async (deviceNo: string, password: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await resetStorePassword(deviceNo, password);

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
 * 同步社会信息
 * @author ssss
 * @date
 */
export const handleSyncDeviceInfo = async (deviceNo: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await syncDeviceInfo(deviceNo);

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
 * 后台开箱
 * @author ssss
 * @date
 */
export const handleOpenDoor = async (deviceNo: string, doorId: number) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await openDoor(deviceNo, doorId);

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
 * 暂停使用
 * @author ssss
 * @date
 */
export const handlePauseDoor = async (deviceNo: string, doorId: number) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await pauseDoor(deviceNo, doorId);

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
 * 恢复使用
 * @author ssss
 * @date
 */
export const handleRestoreDoor = async (deviceNo: string, doorId: number) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await restoreDoor(deviceNo, doorId);

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
