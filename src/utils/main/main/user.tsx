import { message } from 'antd';
import { RequestTableParam } from 'types/utils';
import {
  deleteUser,
  fetchUserList,
  getRoleByUserId,
  getUserDataById,
  resetPwd,
  saveUser,
  updatePassword,
} from '@/services/main/main/user';
import { User } from '../../../../types/main/main/user';

/**
 * 处理添加用户信息
 * @date 2021.12.26
 * @param values
 * @returns {Promise<{msg, success: boolean}|boolean>}
 */
export const handleSaveUser = async (values: User.UserItem) => {
  const hide = message.loading('正在保存');

  try {
    const result = await saveUser(values);

    hide();

    if (result.success) {
      return result.success;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 处理获取的用户数据
 * @date 2022-05-20
 * @param id
 * @returns {Promise<boolean|*>}
 * @author sssss
 */
export const handleUserDataById = async (id: string) => {
  const hide = message.loading('正在获取信息');
  try {
    const result = await getUserDataById(id);

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

/**
 * 处理获取的数据
 * @date 2021.12.26
 * @param params
 * @returns {Promise<{total: number, code: number, data: *[], success: boolean}|{total, code, data, success}>}
 */
export const handleUserList = async (params: RequestTableParam) => {
  const hide = message.loading('正在获取数据');

  try {
    const result = await fetchUserList(params);

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
      return { data: [], success: false };
    }
  } catch (e) {
    return { data: [], success: false };
  }
};

/**
 * 处理删除用户操作
 * @date 2021.12.26
 * @param id
 * @returns {Promise<boolean>}
 */
export const handleDeleteUser = async (id: string) => {
  const hide = message.loading('正在删除');

  if (!id) return true;

  try {
    const result = await deleteUser(id);
    hide();
    if (result.success) {
      message.success('删除成功，即将刷新');
      return true;
    } else {
      message.warning(result.msg);
      return false;
    }
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 处理重置密码
 * @date 2022-04-04 09:45:15
 * @param data
 */
export const handleResetPwd = async (data: User.UserPassWord) => {
  const hide = message.loading('正在提交');

  try {
    const result = await resetPwd(data);
    hide();
    if (result.success) {
      message.success('修改成功, 密码重置为123456');
      return true;
    } else {
      message.warning('修改失败');
      return false;
    }
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 处理提交修改密码
 * @param data
 * @returns {Promise<boolean>}
 */
export const handleUpdatePassword = async (data: User.ChangeUserPassword) => {
  const hide = message.loading('正在提交数据！');

  try {
    const result = await updatePassword(data);

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
 * 根据用户id获取角色信息, 因为用户可能有多个角色
 * @param userId
 */
export const handleRoleByUserId = async (userId: string) => {
  try {
    const result = await getRoleByUserId(userId);

    if (result.success) {
      const data = result.data;
      const { roleIds, roleNames } = data;

      const roleIdsArr = roleIds.split(',');

      const roleNamesArr = roleNames.split(',');

      return roleIdsArr.map((item, index) => {
        return {
          label: roleNamesArr[index],
          value: item,
        };
      });
    } else {
      message.warning(result.msg);
      return [];
    }
  } catch (err) {
    return [];
  }
};
