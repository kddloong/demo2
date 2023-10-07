import { getDataFromCookies } from '@/utils/cookiesUtil';
import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { handleFetchCardReaderSettings } from '@/utils/device/encrypted-card/card-setting';
import { CardReader } from '../../types/device/encrypted-card/card-setting';
import { sendLog } from '@/utils/utils';

export const useCardReaderCookie = () => {
  const [cookieInfo, setCookieInfo] = useState<CardReader.CardReaderSetting | Record<string, any>>(
    {},
  );

  function getData() {
    return getDataFromCookies('Card_Reader_Config');
  }

  useAsyncEffect(async () => {
    const token = window.localStorage.getItem('accessToken');

    if (!token) {
      return;
    }

    let cookieInData = getData();

    if (!cookieInData) {
      const result = await handleFetchCardReaderSettings();

      if (result.success) {
        cookieInData = result?.data;
      } else {
        cookieInData = { deviceNo: '' };
      }
    }

    sendLog(`useCardReaderCookie 获取cookie成功,值为${cookieInData}`);

    setCookieInfo(cookieInData);
  }, []);

  return cookieInfo;
};
