import { message } from 'antd';
import { changeStatus } from '@/services/changeStatus';

/**
 * 改变状态
 * @param id
 * @param url
 * @param action
 */
export const handleChangeStatus = async (
  id: string,
  url: string,
  action: 'start' | 'end' | string,
) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await changeStatus(id, url, action);

    hide();

    if (result.success) {
      message.success(result.msg);
      return { success: true };
    } else {
      message.warning(result.msg);
      return { success: false };
    }
  } catch (err) {
    hide();

    return { success: false };
  }
};
