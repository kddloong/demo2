import { Avatar, message, Modal, Switch } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { APP_ID, generateRandomString, QQ_CLIENT_ID } from '@/utils/utils';
import { useAsyncEffect } from 'ahooks';
import { fetchUserInfo } from '@/utils/get-user-info';
import { useSearchParams } from '@umijs/max';
import { handleBindWechat } from '@/utils/otherWaysFetchToken';
import BindPhoneForm from '@/pages/account/settings/account-binding/bind-phone-form';
import BindEmailForm from '@/pages/account/settings/account-binding/bind-email-form';
import { ActionType, ProList } from '@ant-design/pro-components';

const BindingView: React.FC = () => {
  const [wxOpen, setWxOpen] = useState(false);
  const [isBindWechat, setIsBindWechat] = useState(false);
  const [isBindQQ, setIsBindQQ] = useState(false);
  const [isBindPhone, setIsBindPhone] = useState(false);
  const [isBindEmail, setIsBindEmail] = useState(false);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  const actionRef = useRef<ActionType>();

  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const tips = searchParams.get('tips');

  useAsyncEffect(async () => {
    if (code) {
      const res = await handleBindWechat({
        code,
        appId: APP_ID,
        id: window.localStorage.getItem('currentUserId'),
      });
      if (res.success) {
        // 刷新页面
        window.location.href =
          'http://h8.yunchaoyun.com/account/settings?applicationId&app_tabs_info=binding';
      } else {
        message.warning('该微信账号已绑定其他账户');
      }
    }
  }, [code]);

  useEffect(() => {
    if (tips && tips === '1') {
      message.warning('该QQ账号已绑定其他账户');
    }
  }, [tips]);

  useAsyncEffect(async () => {
    const res = await fetchUserInfo();

    if (res?.unionId) {
      setIsBindWechat(true);
    } else {
      setIsBindWechat(false);
    }

    if (res?.qqUnionId) {
      setIsBindQQ(true);
    } else {
      setIsBindQQ(false);
    }

    if (res?.phone) {
      setIsBindPhone(true);
    } else {
      setIsBindPhone(false);
    }

    if (res?.email) {
      setIsBindEmail(true);
    } else {
      setIsBindEmail(false);
    }
  }, []);

  useEffect(() => {
    if (wxOpen) {
      const randomStringForWx = generateRandomString(10);

      new window.WxLogin({
        self_redirect: false,
        id: 'wxContainer',
        appid: APP_ID,
        scope: 'snsapi_login',
        redirect_uri: encodeURIComponent(
          `http://h8.yunchaoyun.com/account/settings?applicationId&app_tabs_info=binding`,
        ),
        state: randomStringForWx,
        style: '',
        href: 'data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30NCi5pbXBvd2VyQm94IC50aXRsZSB7ZGlzcGxheTogbm9uZTt9DQouaW1wb3dlckJveCAuaW5mbyB7d2lkdGg6IDIwMHB4O30NCi5zdGF0dXNfaWNvbiB7ZGlzcGxheTogbm9uZX0NCi5pbXBvd2VyQm94IC5zdGF0dXMge3RleHQtYWxpZ246IGNlbnRlcjt9IA==',
      });
    }
  }, [wxOpen]);

  const accountBindWechat = () => {
    if (!isBindWechat) {
      setWxOpen(true);
    }
  };

  const accountBindQQ = () => {
    if (!isBindQQ) {
      window.open(
        `https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=${QQ_CLIENT_ID}&redirect_uri=${encodeURI(
          'http://h8.yunchaoyun.com/static/index.html?jump_type=bindQQ&&state=432ee',
        )}`,
        '',
        'resizable,scrollbars,status',
      );
    }
  };

  function getData() {
    return [
      {
        title: '绑定微信',
        key: 'wechat',
        description: '通过绑定微信来进行登录及其他操作',
        avatar: (
          <Avatar
            size={40}
            shape="square"
            src={'https://farbeat-1251505225.cos.ap-shanghai.myqcloud.com/%E5%BE%AE%E4%BF%A1.png'}
          ></Avatar>
        ),
      },

      {
        title: '绑定QQ',
        key: 'QQ',
        description: '通过绑定QQ来进行登录及其他操作',
        avatar: (
          <Avatar
            size={40}
            shape="square"
            src={'https://farbeat-1251505225.cos.ap-shanghai.myqcloud.com/QQ.png'}
          ></Avatar>
        ),
      },
      {
        title: '绑定手机',
        key: 'phone',
        description: '通过绑定手机号来进行登录及其他操作',
        avatar: (
          <Avatar
            size={40}
            shape="square"
            src={'https://farbeat-1251505225.cos.ap-shanghai.myqcloud.com/%E6%89%8B%E6%9C%BA.png'}
          ></Avatar>
        ),
      },
      {
        title: '绑定邮箱',
        key: 'email',
        description: '通过绑定邮箱来进行登录及其他操作',
        avatar: (
          <Avatar
            size={40}
            shape="square"
            src={'https://farbeat-1251505225.cos.ap-shanghai.myqcloud.com/%E9%82%AE%E7%AE%B1.png'}
          ></Avatar>
        ),
      },
    ];
  }

  // 在获取数据时添加isBind字段

  // const [dataSource, setDataSource] = useState(getData());

  // todo
  function refreshTable() {
    // console.log(`ddd`);
    //
    // setDataSource(getData());
    actionRef.current?.reload();
  }

  return (
    <>
      <ProList<any>
        actionRef={actionRef}
        rowKey="name"
        request={async () => {
          const res = await fetchUserInfo();

          if (res?.id) {
            const origin = getData();
            const arr = origin.map((item) => {
              if (item.key === 'wechat') {
                return { ...item, isBind: !!res.unionId };
              } else if (item.key === 'QQ') {
                return { ...item, isBind: !!res.qqUnionId };
              } else if (item.key === 'phone') {
                return { ...item, isBind: !!res.phone };
              } else if (item.key === 'email') {
                return { ...item, isBind: !!res.email };
              }
            });

            return { data: arr, total: 4, success: true };
          } else {
            return [];
          }
        }}
        showActions="hover"
        showExtra="hover"
        metas={{
          title: {
            dataIndex: 'title',
          },
          avatar: {
            dataIndex: 'avatar',
          },
          description: {
            dataIndex: 'description',
          },

          actions: {
            render: (text, row) => [
              <Switch
                key={row.key}
                checked={row.isBind}
                onChange={async (checked) => {
                  if (row.key === 'wechat') {
                    setIsBindWechat(!isBindWechat);
                    if (checked) {
                      await accountBindWechat();
                    } else {
                      //  解绑
                    }
                  } else if (row.key === 'QQ') {
                    setIsBindQQ(!isBindQQ);
                    if (checked) {
                      await accountBindQQ();
                    } else {
                      //  解绑
                    }
                  } else if (row.key === 'phone') {
                    setIsBindPhone(!isBindPhone);
                    if (checked) {
                      setVisible(true);
                    } else {
                      // 解绑
                    }
                  } else if (row.key === 'email') {
                    setIsBindEmail(!isBindEmail);
                    if (checked) {
                      setOpen(true);
                    } else {
                      // 解绑
                    }
                  }
                }}
              />,
            ],
          },
        }}
      />

      <Modal
        open={wxOpen}
        onCancel={() => {
          setWxOpen(false);
        }}
        onOk={() => {
          setWxOpen(false);
        }}
        footer={null}
        width={500}
        bodyStyle={{ height: 370 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ marginTop: 50 }} id={'wxContainer'}></div>
      </Modal>

      {visible && (
        <BindPhoneForm visible={visible} setVisible={setVisible} refreshTable={refreshTable} />
      )}

      {open && <BindEmailForm open={open} setOpen={setOpen} refreshTable={refreshTable} />}
    </>
  );
};

export default BindingView;
