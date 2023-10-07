import {
  handleFetchCookieRestTime,
  handleSaveEntityCardConfig,
} from '@/utils/member/member/member';
import { getDataFromCookies, saveDataIntoCookies } from '@/utils/cookiesUtil';
import { handleFetchCardReaderSettings } from '@/utils/device/encrypted-card/card-setting';

export default () => {
  console.log(`调用了`);

  const dealCookies = async () => {
    const token = window.localStorage.getItem('accessToken');

    if (!token) {
      return;
    }
    // 进入系统之后，读取本地cookie， 对比后台的有效时间，倒计时小于0会通过重新存储来刷新有效时间，以实现cookie持久化
    const res = await handleFetchCookieRestTime();
    if (res.data && res.data < 0) {
      let myLocalConfigData = getDataFromCookies('Card_Reader_Config');

      if (!myLocalConfigData) {
        const readResult = await handleFetchCardReaderSettings();

        if (readResult.success) {
          myLocalConfigData = readResult?.data;
        }
      }

      const res = await handleSaveEntityCardConfig(myLocalConfigData);

      if (res.success) {
        saveDataIntoCookies(myLocalConfigData, 'Card_Reader_Config');
      }
    }
  };

  dealCookies();
};
