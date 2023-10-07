import { message } from 'antd';
import { MergeRequestTableParams } from 'types/utils';
import { fetchWechatProgramUserList } from '@/services/setting/applets/user';

/**
 * 获取小程序用户列表
 * @param params
 */
export const handleFetchWechatProgramUserList = async (
  params: MergeRequestTableParams<{ phoneNo: string }>,
) => {
  try {
    const result = await fetchWechatProgramUserList(params);

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};
