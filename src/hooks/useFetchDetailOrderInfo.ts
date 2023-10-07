import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { sendLog } from '@/utils/utils';
import { handleFetchReverseDetailOrder } from '@/utils/area/schedule';
import { handleFetchStartDetailOrderInfo } from '@/utils/area/start';
import { handleFetchTicketDetailOrder } from '@/utils/ticket/order';

/**
 * 扫码支付页面获取子订单信息
 * @param detailOrderId
 * @param orderSource
 * @param isChild
 */
const useScanFetchDetailOrderInfo = (
  detailOrderId: string,
  orderSource: 'reverse' | 'start' | 'ticket' | 'check',
  isChild: boolean,
) => {
  const [orderInfo, setOrderInfo] = useState<Record<string, string | number> | null>(null);

  useAsyncEffect(async () => {
    if (!isChild) {
      setOrderInfo(null);
      return;
    }

    if (orderSource === 'start') {
      const result = await handleFetchStartDetailOrderInfo(detailOrderId);

      if (result.success) {
        setOrderInfo(result.data);
      }
    }

    if (orderSource === 'reverse') {
      const result = await handleFetchReverseDetailOrder(detailOrderId);

      if (result.success) {
        setOrderInfo(result.data);
      }
    }

    if (orderSource === 'ticket') {
      const result = await handleFetchTicketDetailOrder(detailOrderId);

      if (result.success) {
        setOrderInfo(result.data);
      }
    }
  }, [detailOrderId]);

  sendLog(`扫码支付查询的子订单详情为:${orderInfo}`);

  return orderInfo;
};

export { useScanFetchDetailOrderInfo };
