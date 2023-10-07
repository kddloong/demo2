import MyIcon from '@/components/MyIcon';
import React from 'react';
import type { MenuDataItem } from '@ant-design/pro-components';
import { Link } from '@umijs/max';

const getIcon = (icon?: string | React.ReactNode): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    // 可加入多种图标类型的兼容写法，此处省略
    // if (icon.startsWith(iconPrefixes)) {
    return <MyIcon type={`icon-${icon}`} />;
    // }
  }

  return icon;
};
const MenuItem: React.FC<MenuDataItem> = (menuItemProps) => {
  const { isUrl: isLink, path, icon, parentId } = menuItemProps;

  const itemContent = (
    <span
      className="ant-pro-menu-item"
      style={{
        height: '36px',
        lineHeight: '36px',
        fontSize: parentId === 'ant-design-pro-layout' ? '14px' : '13px',
      }}
    >
      {/*{getIcon(icon)}*/}

      {parentId === 'ant-design-pro-layout' ? getIcon(icon) : ''}

      <span style={{ marginLeft: parentId === 'ant-design-pro-layout' ? 10 : '24px' }}>
        {menuItemProps.name}{' '}
      </span>
    </span>
  );
  return isLink || !path || location.pathname === path ? (
    itemContent
  ) : (
    <Link to={path}>{itemContent}</Link>
  );
};

export { MenuItem };
