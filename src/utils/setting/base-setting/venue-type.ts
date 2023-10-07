import { message } from 'antd';
import { getFieldTypeList } from '@/services/setting/base-setting/venue-type';

/**
 * 处理获取的场地类型
 * @date 2022-01-06 09:30:29
 */
export const handleFieldTypeList = async () => {
  try {
    const result = await getFieldTypeList();

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};
