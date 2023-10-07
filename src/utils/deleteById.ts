import { message } from 'antd';
import { deleteRowById } from '@/services/deleteById';

/**
 * 处理根据路径删除数据
 * @param url
 */
export const handleDeleteRowById = async (url: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await deleteRowById(url);

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
