import MyIcon from '@/components/MyIcon';
import { useAsyncEffect } from 'ahooks';
import { List } from 'antd';
import React, { Fragment, useState } from 'react';
import { handleMyWechatBinding } from '@/utils/main/main/wx';

type myWechatInfo = {
  nickName?: string | never;
  avatarUrl?: string | never;
};

const BindingView: React.FC = () => {
  const [myWechatInfo, setMyWechatInfo] = useState<myWechatInfo>({});

  const [updateVisible, setUpdateVisible] = useState(false);

  useAsyncEffect(async () => {
    if (!updateVisible) {
      const result = await handleMyWechatBinding();

      if (result.success) {
        setMyWechatInfo(result.data);
      }
    }
  }, [updateVisible]);

  const getData = () => [
    {
      title: '绑定微信小程序',
      description: myWechatInfo?.nickName || '当前未绑定微信账号',
      actions: [
        <a key="Bind" onClick={() => setUpdateVisible(true)}>
          {myWechatInfo?.nickName ? '换绑' : '绑定'}
        </a>,
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
