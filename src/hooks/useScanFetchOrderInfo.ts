import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { handleStartOrderInfoByOrderId } from '@/utils/area/workplace';
import { sendLog } from '@/utils/utils';
import { handleFetchReverseOrderInfo } from '@/utils/area/schedule';
import { handleFetchCompleteUseOrder } from '@/utils/reverse-and-ticket/reverse-and-ticket';

/**
 * 扫码支付页面获取主订单信息
 * @param orderId
 * @param type
 * @param isChild
 */
const useScanFetchOrderInfo = (orderId: string, type: string, isChild: boolean) => {
  const [orderInfo, setOrderInfo] = useState<Record<string, string | number> | null>(null);

  useAsyncEffect(async () => {
    if (isChild) {
      setOrderInfo(null);
      return;
    }

    if (type === 'start') {
      const result = await handleStartOrderInfoByOrderId(orderId);

      if (result.success) {
        setOrderInfo(result.data);
      }
    }

    if (type === 'ticket' || type === 'reverse') {
      const result = await handleFetchCompleteUseOrder(orderId);

      if (result.success) {
        setOrderInfo(result.data);
      }
    }
  }, [orderId, isChild]);

  sendLog(`扫码支付查询的订单详情为:${orderInfo}`);

  return orderInfo;
};

export { useScanFetchOrderInfo };
