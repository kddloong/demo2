import { Modal } from 'antd';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useKeyPress, useRequest } from 'ahooks';
import {
  fetchAreaOrderReceipt,
  fetchGoodRentOrderReceipt,
  fetchGoodSellReceiptDetail,
  fetchLessonSignUpReceiptDetail,
  fetchMemberOrderReceipt,
  fetchRaceSignUpReceiptDetail,
  fetchVenueOrderReceipt,
} from '@/utils/device/receipt/printFunc';
import { printReceipt } from '@/utils/device/receipt/print';
import { handleCheckOrder } from '@/utils/area/schedule';
import { handleGetPayingStatus } from '@/utils/pay/pay';
import { payAction } from '@/utils/area-ant-ticket/payAction';
import { filterKey, sendLog } from '@/utils/utils';
import { useScanFetchOrderInfo } from '@/hooks/useScanFetchOrderInfo';
import { useScanFetchDetailOrderInfo } from '@/hooks/useFetchDetailOrderInfo';
import { TypeUtil } from 'types/utils';

export interface ScanModalProps {
  visible: boolean;
  setVisible: TypeUtil.SetState<boolean>;
  payType: string;
  orderId: string;
  closeSettle: () => void;
  // 不会处理与occupy相关的逻辑, occupy不需要支付
  openSource:
    | 'ticket'
    | 'member'
    | 'rent'
    | 'race'
    | 'sell'
    | 'lesson'
    | 'combo'
    | 'reverse'
    | 'check'
    | 'start' | 'occupy';
  //只有openSource为member 时 需要 detailType 和 price
  detailType?: string;
  price?: number;
  isChildrenOrder?: boolean;
  orderNo?: string;
}

/**
 * 扫码支付
 * @param props
 * @constructor
 */
const ScanModal: FC<ScanModalProps> = (props) => {
  const {
    visible,
    setVisible,
    orderId,
    payType,
    closeSettle,
    openSource,
    detailType = '',
    isChildrenOrder = false,
  } = props;

  sendLog(`ScanModal orderId 为 ${orderId},openSource 为 ${openSource}`);

  const orderInfo = useScanFetchOrderInfo(orderId, openSource, isChildrenOrder);

  const detailOrderInfo = useScanFetchDetailOrderInfo(orderId, openSource, isChildrenOrder);

  sendLog(`detailOrderInfo: ${JSON.stringify(detailOrderInfo)}`);

  sendLog(`orderInfo: ${JSON.stringify(orderInfo)}`);

  const [imgStr, setImgStr] = useState<'scan' | 'loading' | 'finish'>('scan');

  const [num, setNum] = useState('');

  function paySuccess() {
    setTimeout(async () => {
      if (openSource === 'check') {
        await handleCheckOrder(orderId, '0');
      }

      if (openSource === 'member') {
        const memberTypeObj = {
          '0': 'store',
          '1': 'expire',
          '2': 'count',
        };

        const receiptData = await fetchMemberOrderReceipt(orderId, memberTypeObj[detailType]);

        if (receiptData) {
          printReceipt(receiptData);
        }
      }

      if (openSource === 'ticket' || openSource === 'check') {
        const receiptModel = await fetchVenueOrderReceipt(orderId);

        if (receiptModel) {
          printReceipt(receiptModel);
        }
      }

      if (openSource === 'start') {
        const receiptModel = await fetchAreaOrderReceipt(orderId);

        if (receiptModel) {
          printReceipt(receiptModel);
        }
      }

      if (openSource === 'rent') {
        const receiptModel = await fetchGoodRentOrderReceipt(orderId);

        if (receiptModel) {
          printReceipt(receiptModel);
        }
      }

      if (openSource === 'sell') {
        const receiptModel = await fetchGoodSellReceiptDetail(
          'orderNo' in props ? (props?.orderNo as string) : orderId,
        );

        if (receiptModel) {
          printReceipt(receiptModel);
        }
      }

      if (openSource === 'race') {
        const receiptModel = await fetchRaceSignUpReceiptDetail(orderId);

        if (receiptModel) {
          printReceipt(receiptModel);
        }
      }

      if (openSource === 'lesson') {
        const receiptModel = await fetchLessonSignUpReceiptDetail(orderId);

        if (receiptModel) {
          printReceipt(receiptModel);
        }
      }
    }, 100);
    setVisible(false);

    closeSettle();
  }

  const { data: goodResult, run } = useRequest(payAction, {
    defaultParams: [
      openSource,
      {
        id: orderId,
        payType: payType,
        authCode: num,
        balanceId: '',
        consumeAmount: isChildrenOrder ? detailOrderInfo?.price || 0 : orderInfo?.totalPrice || 0,
        consumeNum: 0,
        discountId: '',
        isDiscount: '',
      },
      imgStr,
      isChildrenOrder,
    ],
    debounceWait: 600,
    debounceTrailing: true,
    manual: true,
    onFinally: (params, result) => {
      console.log(`返回结果`, result);

      if (result?.success) {
        if (goodResult?.data?.wx_message !== 'USERPAYING') {
          setImgStr('finish');
        }
      } else {
        setVisible(false);
      }
    },
  });

  /**
   * 如果微信支付需要密码, 轮询
   */
  const { data: payingResult, run: payingRun } = useRequest(handleGetPayingStatus, {
    defaultParams: [openSource, orderId],
    pollingInterval: 3000,
    manual: true,
  });

  /**
   * 处理 扫描 条形码
   */
  useKeyPress(filterKey, (event) => {
    setNum((num1) => num1.concat(event.key));

    if (event.key === 'Enter') {
      setImgStr('loading');

      run(
        openSource,
        {
          id: orderId,
          payType: payType,
          authCode: num,
          balanceId: '',
          consumeAmount: isChildrenOrder ? detailOrderInfo?.price || 0 : orderInfo?.totalPrice || 0,
          consumeNum: 0,
          discountId: '',
          isDiscount: '',
        },
        imgStr,
        isChildrenOrder,
      );
      setNum('');
    }
  });

  useEffect(() => {
    console.log(`goodResult`, goodResult);

    if (goodResult?.success) {
      if (goodResult?.data?.wx_message === 'USERPAYING') {
        console.log(`进入userPaying`);

        payingRun(openSource, orderId);
      } else {
        paySuccess();
      }
    }
  }, [goodResult]);

  useEffect(() => {
    if (payingResult?.success) {
      setImgStr('finish');

      paySuccess();
    }
  }, [payingResult]);

  return (
    <Modal
      open={visible}
      destroyOnClose={true}
      onCancel={() => setVisible(false)}
      maskClosable={false}
      footer={false}
      width={324}
    >
      {imgStr === 'scan' && (
        <>
          <img src={require('/public/scan.gif')} width={300} height={300} />
          <div style={{ width: '100%', textAlign: 'center', fontSize: '15px', marginTop: '10px' }}>
            请打开付款码对准扫码和进行支付操作
          </div>
        </>
      )}

      {imgStr === 'loading' && <div style={{ width: '300px' }}>正在支付中...</div>}

      {imgStr === 'finish' && <img src={require('/public/finish.gif')} width={300} height={300} />}
    </Modal>
  );
};

export { ScanModal };
