import { LinkOutlined } from '@ant-design/icons';
import type { MenuDataItem, Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { fetchMenuData, getButtonAccess } from './services/ant-design-pro/api';
import { AvatarDropdown, AvatarName } from './components/RightContent/AvatarDropdown';
import MyIcon from '@/components/MyIcon';
import { MenuItem } from '@/components/MenuIcon';
import { CurrentUser } from '../types/current-user';
import { fetchUserInfo } from '@/utils/get-user-info';
import NoticeIconView from '@/components/NoticeIcon';
import { RightHelp } from '@/components/HeaderRightHelp';
import {
  APP_ID,
  CLIENT_ID,
  CLIENT_SECRET,
  getQueryString,
  localStorageAccessToken,
  QQ_CLIENT_ID,
  saveUserInfoToLocalStorage,
} from '@/utils/utils';
import { handleFetchCodeByQQ, handleFetchCodeByWX } from '@/utils/otherWaysFetchToken';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser;
  loading?: boolean;
  buttonList?: Record<string, boolean>;
}> {
  console.log(`history.location.pathname`, history.location.pathname);

  if (history.location.pathname === '/welcome') {
    const search = history.location.search;
    const code = getQueryString('code', search);
    const loginType = getQueryString('loginType', search);

    if (!localStorageAccessToken) {
      if (loginType === 'wechat') {
        const useful = await handleFetchCodeByWX({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          appId: APP_ID,
          code: code,
        });

        saveUserInfoToLocalStorage(useful?.data as any);

        // 清除地址栏中的code参数
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
      } else if (loginType === 'qq') {
        const useful = await handleFetchCodeByQQ({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          appId: QQ_CLIENT_ID,
          code: code,
        });
        saveUserInfoToLocalStorage(useful?.data as any);
      }
    }

    const currentUser = await fetchUserInfo();

    const buttonList = await getButtonAccess();

    const accessList: Record<string, boolean> = {};

    if (buttonList.success) {
      const data = buttonList.data;

      for (const datum of data.values()) {
        accessList[datum] = true;
      }

      return {
        currentUser,
        settings: defaultSettings as Partial<LayoutSettings>,
        buttonList: accessList,
      };
    }

    return {
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  } else {
    // 如果不是登录页面且有token，执行
    if (history.location.pathname !== loginPath && localStorageAccessToken) {
      const currentUser = await fetchUserInfo();

      const buttonList = await getButtonAccess();

      const accessList: Record<string, boolean> = {};

      if (buttonList.success) {
        const data = buttonList.data;

        for (const datum of data.values()) {
          accessList[datum] = true;
        }

        return {
          currentUser,
          settings: defaultSettings as Partial<LayoutSettings>,
          buttonList: accessList,
        };
      }

      return {
        currentUser,
        settings: defaultSettings as Partial<LayoutSettings>,
      };
    }
  }

  return {
    settings: defaultSettings as Partial<LayoutSettings>,
    buttonList: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const dynamicMenu = () => {
    return {
      menu: {
        // 每当 initialState?.currentUser?.id 发生修改时重新执行 request
        params: {
          userId: initialState?.currentUser?.id,
        },
        request: async () => {
          // initialState.currentUser 中包含了所有用户信息
          return await fetchMenuData();
        },
      },
    };
  };

  // runUnreadDiffMessageCountModel();

  return {
    // initialState?.currentUser?.avatar为空时， 头像显示initialState?.currentUser?.userName中的第一个字
    // antd: {
    // dark: true,
    // theme: theme.darkAlgorithm,
    // },
    isDarkMode: true,
    navTheme: initialState?.currentUser?.globalTheme === 'light' ? 'light' : 'realDark',
    // antd: (memo) => antd(memo, initialState?.currentUser?.globalTheme),
    logo: initialState?.currentUser?.logo
      ? initialState.currentUser.logo
      : 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    breadcrumbRender: false,
    className: 'self-layout',
    actionsRender: () => [<NoticeIconView key={'noticeJump'} />, <RightHelp key={'rHelp'} />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown menu>{avatarChildren}</AvatarDropdown>;
      },
    },
    waterMarkProps: {
      content: '',
    },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;

      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    subMenuItemRender: (item) => {
      return (
        <div style={{ fontSize: '14px' }}>
          <MyIcon type={`icon-${typeof item.icon === 'string' ? `${item.icon}` : 'smile'}`} />
          <span style={{ marginLeft: '10px' }}>{item.name}</span>
        </div>
      );
    },
    menuItemRender: (menuItemProps: MenuDataItem) => {
      return <MenuItem {...menuItemProps} />;
    },
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}

          {history.location.pathname === '/question/question/menu' && (
            <div
              style={{
                width: '20px',
                height: '80px',
                backgroundColor: initialState?.rightFlag?.bgColor || '#2B9CFF',
                color: initialState?.rightFlag?.textColor || '#FFF',
                zIndex: '9999',
                position: 'absolute',
                right: 0,
                bottom: initialState?.rightFlag?.bottom || 0,
                display: initialState?.rightFlag?.show,
              }}
              onClick={() => {
                // 跳转到问卷地址
                console.log(`initialState.rightFlag.url`, initialState?.rightFlag?.url);
                window.open(initialState?.rightFlag?.url);
              }}
            >
              调查问卷
            </div>
          )}

          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
