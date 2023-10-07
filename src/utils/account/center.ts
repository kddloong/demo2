import { message } from 'antd';
import { handleBaseBase } from '@/utils/account/base-info';
import { fetchCurrentBasicInfo } from '@/services/account/center';

/**
 * @date 2022-01-20 20:27:12
 * 处理获取的基本信息
 */
export const handleGetCurrentUserInfo = async () => {
  const hide = message.loading('正在获取信息！');

  try {
    const result = await fetchCurrentBasicInfo();

    const venueResult = await handleBaseBase();

    if (venueResult.success) {
      const venueResultData = venueResult.data;

      if ('name' in venueResultData) {
        Object.assign(result.data, { venueName: venueResultData?.name });
      }
    }

    hide();

    if (result.success) {
      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: result.data };
    }
  } catch (err) {
    hide();

    return { success: false, data: {} };
  }
};
