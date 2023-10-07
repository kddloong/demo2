import { Avatar, Badge, message, Switch, Tag, Tooltip } from 'antd';
import { handleChangeStatus } from '@/utils/changeStatus';
import { POSITIVE_STATUS } from '@/utils/utils';
import { ObjToGenerateOptions } from '../../types/utils';
import React from 'react';

export const whetherRender = (status: '0' | '1' | string) => {
  switch (status) {
    case '0':
      return <Tag color="red">否</Tag>;
    case '1':
      return <Tag color="green">是</Tag>;
    default:
      return null;
  }
};

export const tagRender = (color: string, text: string) => {
  return <Tag color={color}>{text}</Tag>;
};

export const badgeRender = (color: string, text: string) => {
  return <Badge color={color} text={text} />;
};

/**
 * 生成渲染项
 * @param originObj
 * @param status
 * @param renderMethod
 */
export const genderRenderFromObj = (
  originObj: ObjToGenerateOptions,
  status: string,
  renderMethod: 'tags' | 'badge' = 'tags',
) => {
  const choose = originObj[status];

  if (!choose) {
    return null;
  }

  if (renderMethod === 'tags') {
    return tagRender(choose.color, choose.label);
  }

  if (renderMethod === 'badge') {
    return badgeRender(choose.color, choose.label);
  }

  return null;
};

/**
 *
 * @param {string} baseRequestUrl 更改状态接口的后台地址
 * @param defaultStatus 当前记录的状态
 * @param recordId id
 * @param refreshTableFunc 刷新表格的方法
 * @param {} interfaceParams 更改状态的参数 默认是 ['start','end'], 该值是一个元组, 第一个值 是 开启的参数， 第二个值是 关闭的参数
 */
export const statusChangeRender = (
  baseRequestUrl: string,
  defaultStatus: string,
  recordId: string,
  refreshTableFunc: () => void,
  interfaceParams: [string, string] = ['start', 'end'],
) => {
  if (interfaceParams.length !== 2) {
    message.error('请检查statusChangeRender参数');
    return null;
  }
  const onChange = async (checked: boolean) => {
    const result = await handleChangeStatus(
      recordId,
      baseRequestUrl,
      checked ? interfaceParams[0] : interfaceParams[1],
    );

    if (result.success) {
      refreshTableFunc();
    }
  };

  return <Switch checked={defaultStatus === POSITIVE_STATUS} onChange={onChange} />;
};

export const AvatarUrlAndToolTipRender = (url: string, nickName: string) => {
  return (
    <Tooltip title={nickName}>
      <Avatar shape={'square'} size={'large'} src={url} />
    </Tooltip>
  );
};
