import { get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { LabelValueItem, TypeUtil } from 'types/utils';
import { Store } from '../../../types/device/store/store';

/**
 * 获取储物柜区域信息
 * @author sssss
 * @date
 */
export async function fetchStoreAreaSelectData(): Promise<
  TypeUtil.RequestResult<LabelValueItem[]>
> {
  return get(`/locker-service/${version}/lck/area/select`, {});
}

/**
 * 获取储物柜区域里的储物柜
 * @author sssss
 * @date
 */
export async function fetchStoreInArea(
  areaId: string,
): Promise<TypeUtil.RequestResult<Store.StoreListItem[]>> {
  return get(`/locker-service/${version}/lck/locker/area`, { areaId });
}

/**
 * 获取箱门的状态
 * @author sssss
 * @date
 */

export async function fetchStoreDoorStatus(
  deviceNo: string,
  doorNum: string = '',
): Promise<TypeUtil.RequestResult<{ openStatus: string; useStatus: string }>> {
  return post(`/locker-service/${version}/lck/netty/door/status`, { deviceNo, doorNum });
}

/**
 * 同步储物柜时间
 * @author sssss
 * @date
 */

export async function syncStoreTime(deviceNo: string): Promise<TypeUtil.RequestResult> {
  return post(`/locker-service/${version}/lck/netty/save/time`, { deviceNo });
}

/**
 * 重置储物柜密码
 * @author sssss
 * @date
 */

export async function resetStorePassword(
  deviceNo: string,
  password: string,
): Promise<TypeUtil.RequestResult> {
  return post(`/locker-service/${version}/lck/netty/save/password`, { deviceNo, password });
}

/**
 * 同步社会信息
 * @author sssss
 * @date
 */
export async function syncDeviceInfo(lockerId: string): Promise<TypeUtil.RequestResult> {
  return post(`/locker-service/${version}/lck/netty/save/info`, { lockerId });
}

/**
 * 后台开箱
 * @author sssss
 * @date
 */
export async function openDoor(deviceNo: string, doorId: number): Promise<TypeUtil.RequestResult> {
  return post(`/locker-service/${version}/lck/netty/open/door`, { deviceNo, doorId });
}

/**
 * 暂停使用
 * @author sssss
 * @date
 */

export async function pauseDoor(deviceNo: string, doorId: number): Promise<TypeUtil.RequestResult> {
  return post(`/locker-service/${version}/lck/netty/pause/door`, { deviceNo, doorId });
}

/**
 * 恢复使用
 * @author sssss
 * @date
 */
export async function restoreDoor(
  deviceNo: string,
  doorId: number,
): Promise<TypeUtil.RequestResult> {
  return post(`/locker-service/${version}/lck/netty/restore/door`, { deviceNo, doorId });
}
