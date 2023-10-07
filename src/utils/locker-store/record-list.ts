import { message } from 'antd';
import { fetchStoreRecordList } from '@/services/locker-store/record-list';
import { RequestTableParam } from 'types/utils';

/**
 * 处理获取的数据
 * @date 2022-05-09 09:52:46
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleFetchStoreRecordList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据');

  try {
    const result = await fetchStoreRecordList(params);

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (e) {
    return {};
  }
};

export const recordStateOptions = [
  {
    label: '存',
    value: 1,
  },
  {
    label: '取',
    value: 2,
  },
  {
    label: '其他',
    value: 0,
  },
];

// todo 加上颜色
export const recordTypeOptions = [
  {
    label: '卡',
    value: '1',
  },
  {
    label: '指纹',
    value: '2',
  },
  {
    label: '人脸',
    value: '3',
  },
  {
    label: '密码',
    value: '4',
  },
  {
    label: '管理员开箱',
    value: '5',
  },
];
