import { get } from '@/services/request/request_tools';
import { LabelValueItem, TypeUtil } from '../../types/utils';

/**
 * 获取label-value格式的数据
 * @param url
 * @param params
 */
export async function fetchSelectData(
  url: string,
  params: Record<string, string> = {},
): Promise<TypeUtil.RequestResult<LabelValueItem[]>> {
  return get(url, params);
}
