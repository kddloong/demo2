import { Avatar, Divider, Dropdown, theme } from 'antd';
import type { DropDownProps } from 'antd/es/dropdown';
import React, { useState } from 'react';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import classNames from 'classnames';
import { useAsyncEffect } from 'ahooks';
import { fetchUserInfo } from '@/utils/get-user-info';

export type HeaderDropdownProps = {
  overlayClassName?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
  showFile?: boolean; // 是否显示账户资料
} & Omit<DropDownProps, 'overlay'>;

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  const { showFile } = restProps;

  const className = useEmotionCss(({ token }) => {
    return {
      [`@media screen and (max-width: ${token.screenXS})`]: {
        width: '100%',
      },
    };
  });

  const { useToken } = theme;
  const { token } = useToken();

  const [mainName, setMainName] = useState('');
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');

  const [isWechat, setIsWechat] = useState(false);
  const [isQQ, setIsQQ] = useState(false);

  const profileWrapStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  const profileStyle: React.CSSProperties = {
    display: 'flex',
    margin: '10px 20px',
  };

  const userNameStyle: React.CSSProperties = {
    marginTop: '5px',
    fontSize: '10px',
    color: '#A4A5A7',
  };

  const bottomMenuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };

  useAsyncEffect(async () => {
    const res = await fetchUserInfo();
    setMainName(res!.realName || res!.nickName || res!.userName);
    setUserName(res!.userName);
    setAvatar(res!.avatar);

    if (res?.unionId) {
      setIsWechat(true);
    }

    if (res?.qqUnionId) {
      setIsQQ(true);
    }
  }, []);

  return (
    <Dropdown
      overlayClassName={classNames(className, cls)}
      {...restProps}
      dropdownRender={
        showFile
          ? (menu) => (
              <div style={profileWrapStyle}>
                <div style={{ height: 8 }}></div>
                <div style={profileStyle}>
                  <Avatar src={avatar} />

                  <div style={{ marginLeft: 8 }}>
                    <div>{mainName} </div>

                    {userName && <div style={userNameStyle}>账号：{userName} </div>}

                    {isWechat && <div style={userNameStyle}>账号： 微信用户 </div>}

                    {isQQ && <div style={userNameStyle}>账号： QQ用户 </div>}
                  </div>
                </div>
                <Divider style={{ marginBottom: 0 }} />

                {React.cloneElement(menu as React.ReactElement, { style: bottomMenuStyle })}
              </div>
            )
          : undefined
      }
    />
  );
};

export default HeaderDropdown;
