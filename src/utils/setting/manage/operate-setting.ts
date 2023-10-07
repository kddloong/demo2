import { message } from 'antd';
import { stringToCheckBox } from '@/utils/utils';
import {
  deleteNumberDayChargine,
  deleteNumberHolidays,
  deleteNumberWeekCharging,
  deleteOperateSetting,
  deleteTicketHolidays,
  deleteTicketWeekCharging,
  deleteTimeDayCharging,
  deleteTimeHolidays,
  deleteTimeWeekCharging,
  endOperating,
  getCurrentBasicOperateSetting,
  getOperatePriceSetting,
  getOperateSettingById,
  getOperateSettingList,
  getVenueAreaForParentId,
  saveBasicOperateSetting,
  saveOperate,
  savePriceSetting,
  startOperating,
} from '@/services/setting/manage/operate-setting';
import { RequestTableParam } from 'types/utils';
import {
  OperatePriceSetting,
  OperateSetting,
} from '../../../../types/setting/manage/operate-setting';

/**
 * 处理获取的运营中的场地列表
 * @date 2022-01-05 20:33:11
 * @param params
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handleOperateSettingList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await getOperateSettingList(params);

    hide();

    if (result.success) {
      return {
        data: result.data.map((item) => {
          return {
            ...item,
            bookType: stringToCheckBox(item.bookType),
          };
        }),
        success: result.success,
        code: result.code,
        total: result.count,
      };
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    hide();

    return {};
  }
};

/**
 * 处理回复营业操作
 * @date 2022-01-17 11:01:24
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleStartOperating = async (id: string) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await startOperating(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理暂停营业操作
 * @date w
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleEndOperating = async (id: string) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await endOperating(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理获取的场地区域属性结构, 场地类型
 * @date 2022-04-29 10:18:53
 * @author ssss
 */
export const handleVenueAreaForParentId = async () => {
  try {
    const result = await getVenueAreaForParentId();

    if (result.success) {
      console.log(`result `, result);

      return { success: true, data: result.data };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 处理 删除 场地类型数据
 * @param venueId
 */
export const handleDeleteOperateSetting = async (venueId: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteOperateSetting(venueId);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

// 选项与chargingType 同步
// 有问题一定是useType的问题
export const useTypeOptions = [
  {
    value: '0',
    label: '场地事务',
  },
  {
    value: '2',
    label: '售票事务',
  },
  {
    label: '计次事务',
    value: '1',
  },
];

/**
 * 处理保存基本场地区域信息
 * @date 2022-04-29 13:17:39
 * @param data
 * @author ssss
 */
const handleSaveBasicOperateSetting = async (data: OperateSetting.OperateBaseSettingInfo) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await saveBasicOperateSetting(data);

    hide();

    if (result.success) {
      message.success(result.msg);
      return {
        success: true,
        data: result.data,
      };
    } else {
      message.warning(result.msg);
      return {
        success: false,
        data: '',
      };
    }
  } catch (err) {
    hide();

    return {
      success: false,
      data: '',
    };
  }
};

/**
 * 处理获取的场地区域基本信息
 * @date 2022-04-29 13:47:46
 * @param id
 * @author ssss
 */
const handleBasicOperateSetting = async (id: string) => {
  try {
    const result = await getCurrentBasicOperateSetting(id);

    if (result.success) {
      return { success: true, data: result.data || {} };
    } else {
      message.warning(result.msg);
      return { success: false, data: {} };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};

//------------------------------------------------------------

export const handleSaveOperate = async (data: any) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await saveOperate(data);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理添加收费设置
 * @date 2022-01-06 13:32:33
 * @param data
 */
export const handleSaveCharge = async (data: OperatePriceSetting.OperatePriceSettingItem) => {
  const hide = message.loading('正在提交收费设置！');

  try {
    const result = await savePriceSetting(data);

    hide();

    if (result.success) {
      message.success(result.msg);
      return result.success;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理获取的场馆基本运营设置
 * @date 2022-01-06 09:53:56
 * @param id
 */
export const handleOperateSettingById = async (id: string) => {
  try {
    const result = await getOperateSettingById(id);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    return {};
  }
};

/**
 * 处理获取的费用设置
 * @date 2022-01-06 17:06:53
 * @param id
 * @param chargingType
 * @param weekOrDay
 */
export const handleOperatePriceSetting = async (
  id: string,
  chargingType: string = '',
  weekOrDay: string = '',
) => {
  try {
    const result = await getOperatePriceSetting(id, chargingType, weekOrDay);

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    return {};
  }
};

/**
 * 处理删除按星期按时特殊收费设置
 * @date 2022-01-07 09:36:28
 * @param id
 */
export const handleDeleteTimeWeekSpecial = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteTimeWeekCharging(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理删除按日期按时特殊收费设置
 * @date 2022-01-07 13:24:48
 * @param id
 */
export const handleDeleteTimeDaySpecial = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteTimeDayCharging(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理删除按次按日期
 * @date 2022-01-07 13:51:45
 * @param id
 */
export const handleDeleteNumberDaySpecial = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteNumberDayChargine(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理删除按次按星期删除
 * @date 2022-01-07 13:53:10
 * @param id
 */
export const handleDeleteNumberWeekSpecial = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteNumberWeekCharging(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理按票按星期删除
 * @date 2022-01-07 13:56:24
 */
export const handleDeleteTicketWeekSpecial = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteTicketWeekCharging(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理按票按日期删除
 * @date 2022-01-07 13:57:27
 * @param id
 */
export const handleDeleteTicketDaySpecial = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteTicketWeekCharging(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理删除按时间假日明细
 * @date 2022-01-07 21:51:29
 * @param id
 */
export const handleDeleteTimeHolidays = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteTimeHolidays(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 删除按次数假日明细
 * @date 2022-01-07 21:48:44
 * @param id
 */
export const handleDeleteNumberHolidays = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteNumberHolidays(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

/**
 * 处理删除按门票假日明细
 * @date 2022-01-07 21:53:26
 * @param id
 */
export const handleDeleteTicketHolidays = async (id: string) => {
  const hide = message.loading('正在删除！');

  try {
    const result = await deleteTicketHolidays(id);

    hide();

    if (result.success) {
      message.success(result.msg);
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    hide();

    return false;
  }
};

//基本信息设置
export { handleSaveBasicOperateSetting, handleBasicOperateSetting };
