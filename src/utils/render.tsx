import { Badge, Tag } from 'antd';
import { ObjToGenerateOptions } from '../../types/utils';
import React from 'react';

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

