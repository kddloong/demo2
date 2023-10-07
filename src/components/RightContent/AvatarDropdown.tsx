import { outLogin } from '@/services/ant-design-pro/api';
import {
  BlockOutlined,
  IdcardOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { history, useModel } from '@umijs/max';
import { Radio, Spin } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  // 优先级别： realName-nickName-userName
  return (
    <span className="anticon">
      {currentUser?.realName || currentUser?.nickName || currentUser?.userName}
    </span>
  );
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  /**
   * 退出登录，并且将当前的 url 保存
   */
  const loginOut = async () => {
    await outLogin();
    window.localStorage.clear();
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };
  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });
  const { initialState, setInitialState } = useModel('@@initialState');

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '账号信息',
            meta: { isRoute: true },
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
            meta: { isRoute: true },
          },
          {
            key: 'base-info',
            icon: <IdcardOutlined />,
            label: '场馆详情',
            meta: { isRoute: true },
          },
          {
            key: 'real-name-auth',
            icon: <IdcardOutlined />,
            label: '实名认证',
            meta: { isRoute: true },
          },
          {
            type: 'divider' as const,
          },
          {
            key: 'change-color',
            icon: <BlockOutlined />,
            meta: { isRoute: false },
            label: (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                导航偏好设置
                <Radio.Group
                  style={{ marginLeft: 16 }}
                  size={'small'}
                  onChange={(e) => {
                    e.stopPropagation();

                    flushSync(() => {
                      setInitialState((s) => {
                        return {
                          ...s,
                          currentUser: {
                            ...initialState?.currentUser,
                            globalTheme: e.target.value,
                          },
                        };
                      });
                    });
                  }}
                  optionType={'button'}
                  buttonStyle="solid"
                  defaultValue={'light'}
                  options={[
                    { label: '深色', value: 'dark' },
                    { label: '浅色', value: 'light' },
                  ]}
                ></Radio.Group>
              </div>
            ),
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      console.log(event);

      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        return loginOut();
      }

      return (
        menuItems.find((e) => e.key && e.key === key).meta.isRoute &&
        history.push(`/account/${key}`)
      );
    },
    [setInitialState],
  );

  const loading = (
    <span className={actionClassName}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser) {
    return loading;
  }

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
      showFile={true}
    >
      {children}
    </HeaderDropdown>
  );
};
