import { TypeUtil } from '../../../../types/utils';
import { FinanceAlipay } from '../../../../types/finance/third/alipay';
import { get } from '@/services/request/request_tools';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { UniPay } from '../../../../types/finance/third/unipay';

/**
 * B扫C订单分页列表
 * @param params
 */
export async function getBScanCUniPayList(
  params: TypeUtil.RequestTableParams,
): Promise<TypeUtil.RequestTableResult<UniPay.BScanCUniPayInfo[]>> {
  return get(`/third-service/${version}/third/china/ums/pay/BScanCOrderList`, { ...params });
}

/**
 * C扫B订单分页列表
 * @param params
 */
export async function getCScanBUniPayList(
  params: TypeUtil.RequestTableParams,
): Promise<TypeUtil.RequestTableResult<UniPay.CScanBUniPayInfo[]>> {
  return get(`/third-service/${version}/third/china/ums/pay/CScanBOrderList`, { ...params });
}
