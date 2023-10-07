import { deleteRes } from '@/services/request/request_tools';
import { TypeUtil } from '../../types/utils';

/**
 * 根据id删除数据
 * @param url
 */
export async function deleteRowById(url: string): Promise<TypeUtil.RequestResult> {
  return deleteRes(url, {});
}
