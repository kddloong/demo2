import { TypeUtil } from '../../../../types/utils';
import { message } from 'antd';
import { getBScanCUniPayList, getCScanBUniPayList } from '@/services/finance/third/unipay';

/**
 * B扫C订单分页列表
 * @param params
 */
export const handleFetchBScanCUniPayList = async (params: TypeUtil.RequestTableParams) => {
  try {
    const result = await getBScanCUniPayList(params);
    if (result.success) {
      return {
        success: true,
        data: result.data,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: [],
      };
    }
  } catch (err) {
    return {
      success: false,
      data: [],
    };
  }
};

/**
 * C扫B订单分页列表
 * @param params
 */
export const handleFetchCScanBUniPayList = async (params: TypeUtil.RequestTableParams) => {
  try {
    const result = await getCScanBUniPayList(params);
    if (result.success) {
      return {
        success: true,
        data: result.data,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: [],
      };
    }
  } catch (err) {
    return {
      success: false,
      data: [],
    };
  }
};
