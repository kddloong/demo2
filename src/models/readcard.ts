import { useRequest } from 'ahooks';
import { handleFetchCardReaderSettings } from '@/utils/device/encrypted-card/card-setting';

/**
 * 获取系统读卡器的配置
 */
export default () => {
  const {
    data: card,
    loading: loading,
    runAsync,
  } = useRequest(
    async () => {
      const res = await handleFetchCardReaderSettings();

      if (res.success) {
        if (Number(res.data.sericalPort) > 0) {
          window.localStorage.setItem('serialPort', String(res.data.serialPort));
        }

        return res.data;
      }
      return {};
    },
    {
      manual: true, // 手动触发
    },
  );

  return {
    card,
    loading,
    runAsync,
  };
};
