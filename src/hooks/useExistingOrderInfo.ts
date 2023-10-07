import { useState } from 'react';

/**
 * 创建订单后 由于种种情况没有立即支付而是重新选择其他支付方式
 * */
export const useExistingOrderInfo = () => {
  const [existingOrderInfo, setExistingOrderInfo] = useState({
    orderId: '',
    signUpNo: '',
  });

  const saveExistingInfo = (orderId: string, signUpNo: string) => {
    setExistingOrderInfo({
      orderId,
      signUpNo,
    });
  };

  return {
    existingOrderInfo,
    saveExistingInfo,
  };
};
