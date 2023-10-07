import MyIcon from '@/components/MyIcon';
import { List } from 'antd';
import React, { Fragment, useState } from 'react';

type myWechatInfo = {
  nickName?: string | never;
  avatarUrl?: string | never;
};

const BindingView: React.FC = () => {
  const [myWechatInfo, setMyWechatInfo] = useState<myWechatInfo>({});

  const getData = () => [
    {
      title: '绑定微信小程序',
      description: myWechatInfo?.nickName || '当前未绑定微信账号',
      actions: [

      ],
      avatar: <MyIcon type={'icon-weixin'} className={'wechat'} />,
    },
  ];

  return (
    <Fragment>
      <List
        itemLayout="horizontal"
        dataSource={getData()}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta
              avatar={item.avatar}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />

    </Fragment>
  );
};

export default BindingView;
