import { deleteRes, get, post } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { RequestSelectData, TreeData, TypeUtil } from 'types/utils';
import { BaseBaseSetting, VenueBaseSetting } from '../../../types/account/base-info';

/**
 * 根据id获取当前场地的信息
 * @date 2022-01-04 13:47:04
 * @param id
 * @returns {Promise<unknown>}
 */
export async function getVenueDataById(
  id: string,
): Promise<TypeUtil.RequestResult<VenueBaseSetting.VenueBaseSettingItem>> {
  return get(`/cgs/venue/${id}`);
}

/**
 * 新增或修改场馆基本信息
 * @date 2022-05-22
 * @param data
 * @param text
 * @returns {Promise<unknown>}
 */
export async function saveVenueBaseData(
  data: BaseBaseSetting.BaseBaseSettingItem,
  text: { notice: string; precaution: string },
): Promise<TypeUtil.RequestResult> {
  return post(`/venue-service/${version}/cgs/venue/base/saveVenue`, { ...data, ...text });
}

/**
 * 删除场地的信息
 * @date 2022-01-04 14:15:01
 * @param id
 * @returns {Promise<unknown>}
 */
export async function deleteVenueData(id: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(`/cgs/venue/${id}`);
}

/**
 * 获取场地的树列表
 * @date 2022-01-04 14:53:58
 * @param {string} type type === '0' 查询 的结果不返回 场地 , 为空 查询的结果场地场地
 * @returns {Promise<unknown>}
 */
export async function getVenueTree(type: string): Promise<TreeData> {
  return get(`/venue-service/${version}/cgs/venue/venueTree`, { type });
}
/**
 * 获取场地的树列表
 * @date 2022-01-04 14:53:58
 * @param {string} type type === '0' 查询 的结果不返回 场地 , 为空 查询的结果场地场地
 * @returns {Promise<unknown>}
 */
export async function getVenueTreeAnon(type: string): Promise<TreeData> {
  return get(`/venue-service/${version}/cgs/venue/venueTree/anon`, { type });
}

/**
 * 获取场地的列表， 用于Select 组件
 * @date 2022-01-12 13:33:05
 * @returns {Promise<{code: Number, data: Array, msg: String, success: Boolean}[]>}
 */
export async function getVenueSelectData(): Promise<RequestSelectData> {
  return get(`/venue-service/${version}/cgs/venue/venueSelectTree`);
}

/**
 * 根据场馆id获取之下的场地id, 用于select
 * @date 2022-01-20 13:04:30
 * @param id
 * @returns {Promise<unknown>}
 */
// export async function getVenueChangDiSelectData(id: string) {
//   return new Promise((resolve, reject) => {
//     get('')
//       .then((res) => {
//         resolve(res);
//       })
//       .catch((err) => {
//         reject(err);
//       });
//   });
// }

/**
 * 获取基本信息
 */
export async function getBaseBase(): Promise<
  TypeUtil.RequestResult<VenueBaseSetting.VenueBaseInfoData>
> {
  return get(`/venue-service/${version}/cgs/venue/base/base`);
}
