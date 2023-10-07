import {
  changeCustomizeModelStartUsing,
  changeModelStartUsing,
  fetchCustomizeMessageTemplate,
  fetchGlobalMessageConfig,
  fetchMessageTemplate,
  getSingleMessageTemplateById,
  saveCustomizeMessage,
  saveGlobalMessageConfig,
} from '@/services/setting/message/config-setting';
import { MessageSourceEnum } from '@/utils/enums';
import { message } from 'antd';
import { MessageGlobalConfig } from 'types/setting/message/config-setting';
import { RequestTableParam } from 'types/utils';

/**
 * 处理保存短信配置信息
 * @param data
 */
export const handleSaveGlobalMessageConfig = async (data: MessageGlobalConfig.MessageConfig) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await saveGlobalMessageConfig(data);

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
 * 获取全局短信配置信息
 */
export const handleFetchGlobalMessageConfig = async () => {
  try {
    const result = await fetchGlobalMessageConfig();

    if (result.success) {
      return { data: result.data, success: result.success };
    } else {
      message.warning(result.msg);
      return { success: result.success, data: {} };
    }
  } catch (err) {
    return { success: false, data: {} };
  }
};

/**
 * 获取短信模板
 * @author ssss
 * @param action
 */
export const handleFetchMessageTemplate = async (params: RequestTableParam, action: string) => {
  try {
    const result = await fetchMessageTemplate(params, action);

    if (result.success) {
      return { success: true, data: result.data, code: result.code, total: result.count };
    } else {
      message.warning(result.msg);
      return { success: false, data: [] };
    }
  } catch (err) {
    return { success: false, data: [] };
  }
};

/**
 * 处理操作
 * @param id
 * @param action
 */
export const handleChangeStartUsing = async (id: string, action: 'Start' | 'End') => {
  const hide = message.loading('正在提交！');

  try {
    const result = await changeModelStartUsing(id, action);

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

/**
 * 获取场馆自定短信模板
 * @author ssss
 * @param action
 */
export const handleFetchCustomizeMessageTemplate = async (params: RequestTableParam) => {
  try {
    const result = await fetchCustomizeMessageTemplate(params);

    if (result.success) {
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
 * 保存自定义模板数据
 * @param data
 */
export const handleSaveCustomizeModel = async (data: MessageGlobalConfig.TemplateItem) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await saveCustomizeMessage(data);

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

/**
 * 改变自定义模板的启用状态
 * @param id
 * @param action
 */
export const handleChangeCustomizeModelStartUsing = async (id: string, action: 'Start' | 'End') => {
  const hide = message.loading('正在提交！');

  try {
    const result = await changeCustomizeModelStartUsing(id, action);

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

/**
 * 根据id获取模板详细信息
 * @param id
 */
export const handleFetchSingleMessageTemplateById = async (id: string) => {
  // const hide = message.loading('正在获取！');
  try {
    const result = await getSingleMessageTemplateById(id);
    // hide();
    if (result.success) {
      return { data: result.data, success: result.success };
    } else {
      message.warning(result.msg);
      return { success: result.success, data: {} };
    }
  } catch (err) {
    // hide();
    return { success: false, data: {} };
  }
};

// export const handleFetchEntAccount = async () => {
//   // const hide = message.loading('正在获取！');
//   try {
//     const result = await getEntAccount();
//     // hide();
//     if (result.success) {
//       return { data: result.data, success: result.success };
//     } else {
//       message.warning(result.msg);
//       return { success: result.success, data: {} };
//     }
//   } catch (err) {
//     // hide();
//     return { success: false, data: {} };
//   }
// };

export const isStartOptions = [
  {
    label: '不启用',
    value: MessageSourceEnum.NONE,
  },
  {
    label: '使用默认短信',
    value: MessageSourceEnum.FROM_YUNYING,
  },
  {
    label: '自定义阿里云短信',
    value: MessageSourceEnum.SELF_ALI_CLOUD,
  },
  {
    label: '自定义腾讯云短信',
    value: MessageSourceEnum.SELF_TENCENT_CLOUD,
  },
];
