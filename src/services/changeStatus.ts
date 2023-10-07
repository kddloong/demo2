import { post } from '@/services/request/request_tools';
import { TypeUtil } from '../../types/utils';

/**
 * 改变一行数据的状态
 * @param id
 * @param url
 * @param action
 */
export async function changeStatus(
  id: string,
  url: string,
  action: 'start' | 'end' | string,
): Promise<TypeUtil.RequestResult> {
  return post(`${url}${action}`, { id });
}
