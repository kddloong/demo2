import { GridContent } from '@ant-design/pro-components';
import { Menu } from 'antd';
import React, { useLayoutEffect, useRef, useState } from 'react';
import '@/styles/account/style.css';
import { useSearchParams } from '@umijs/max';
import ChangePassWord from '@/pages/account/settings/change-password';
import MyMessageSetting from '@/pages/account/settings/message-setting';
import BindingView from '@/pages/account/settings/account-binding';
import { useNavigate } from '@@/exports';

const { Item } = Menu;

type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
type SettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: SettingsStateKeys;
};

const Settings: React.FC = () => {
  const nav = useNavigate();
  const baseNavChangeUrl = `applicationId&app_tabs_info=`;
  const [searchParams] = useSearchParams();
  const baseUrlSearch = searchParams.get('app_tabs_info');

  const menuMap: Record<string, React.ReactNode> = {
    security: '修改密码',
    notification: '新消息设置',
    binding: '账户绑定',
  };

  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: baseUrlSearch || 'security',
  });

  const dom = useRef<HTMLDivElement>();

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = dom.current;
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      setInitConfig({ ...initConfig, mode: mode as SettingsState['mode'] });
    });
  };

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [dom.current]);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'security':
        return <ChangePassWord />;
      case 'notification':
        return <MyMessageSetting />;
      case 'binding':
        return <BindingView />;
      default:
        return null;
    }
  };

  return (
    <GridContent>
      <div
        className={'main'}
        ref={(ref) => {
          if (ref) {
            dom.current = ref;
          }
        }}
      >
        <div className={'left-menu'}>
          <Menu
            mode={initConfig.mode}
            defaultSelectedKeys={baseUrlSearch || 'security'}
            onClick={({ key }) => {
              nav({ search: `${baseNavChangeUrl}${key}` });

              setInitConfig({
                ...initConfig,
                selectKey: key as SettingsStateKeys,
              });
            }}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={'right'}>
          <div className={'title'}>{menuMap[initConfig.selectKey]}</div>
          {renderChildren()}
        </div>
      </div>
    </GridContent>
  );
};
export default Settings;
