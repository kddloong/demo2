import { message } from 'antd';
import { deptList, getDeptDataById, getDeptTree, saveDept } from '@/services/main/main/dept';
import { Dept } from 'types/main/main/dept';

/**
 * 处理保存部门
 * @date 2021.12.26
 * @param values
 * @returns {Promise<boolean|*>}
 */
export const handleSaveDept = async (values: Dept.DeptItem) => {
  const hide = message.loading('正在提交！');

  try {
    const result = await saveDept(values);

    hide();

    if (result.success) {
      message.success(result.msg);
      return result.success;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (err) {
    return false;
  }
};

/**
 * 处理获取的部门列表
 * @date 2022-05-20
 * @returns {Promise<*[]|{total, code, data, success}>}
 */
export const handleDeptList = async () => {
  const hide = message.loading('正在获取数据！');

  try {
    const result = await deptList();

    hide();

    if (result.success) {
      return {
        data: result.data,
        success: result.success,
        code: result.code,
        total: result.data.length,
      };
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    hide();

    return [];
  }
};

/**
 * 处理获取的部门树列表
 * @date 2021.12.24
 * @returns {Promise<*>}
 */
export const handleDeptTree = async () => {
  try {
    const requestResult = await getDeptTree();
    if (requestResult.success) {
      return requestResult.data;
    } else {
      message.warning(requestResult.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};

/**
 * 处理根据id获取的部门数据
 * @param {String} id
 * @returns {Promise<{}|*>}
 */
export const handleDeptDataById = async (id: string) => {
  const hide = message.loading('正在获取数据!');

  try {
    const result = await getDeptDataById(id);

    hide();

    if (result.success) {
      return result.data;
    } else {
      message.warning(result.msg);
      return {};
    }
  } catch (err) {
    hide();
    return {};
  }
};
