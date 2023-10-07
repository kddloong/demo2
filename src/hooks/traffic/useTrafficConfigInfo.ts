import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { handleFetchTrafficSetting } from '@/utils/device/traffic/setting';
import { TrafficSetting } from 'types/device/traffic/setting';

/**
 * 获取客流设备的配置信息
 */
const useTrafficConfigInfo = () => {
  const [traffic, setTraffic] = useState<null | TrafficSetting.SaveSettingParams>(null);

  useAsyncEffect(async () => {
    const result = (await handleFetchTrafficSetting()) as TrafficSetting.SaveSettingParams;

    setTraffic(result);
  }, []);

  return traffic;
};

export { useTrafficConfigInfo };
