import { PlusOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Card, Empty, Tabs, TabsProps } from 'antd';
import { useState } from 'react';

import { handleFetchMemberCardList, handleMemberSettingList } from '@/utils/member/setting/setting';
import { BaseEmpty } from '@/components/card/BaseEmpty';
import { useAsyncEffect } from 'ahooks';
import CardListItem from '@/pages/member/setting-list/components/card-item';
import { WrapContainer } from '@/components/layout/WrapContainer';

const MemberSettingList = () => {
  const [showEmpty, setShowEmpty] = useState(false);
  const [cardParam, setCardParam] = useState('0'); // 0:储值  1：期限  2：计次
  const [cardList, setCardList] = useState<MemberCardConfigSetting.MemberCardListInfo[]>();

  const tabItems: TabsProps['items'] = [
    {
      key: '0',
      label: `储值卡`,
    },
    {
      key: '2',
      label: `计次卡`,
    },
    {
      key: '1',
      label: `期限卡`,
    },
  ];

  const tabChange = (key: string) => {
    setCardParam(key);
  };

  useAsyncEffect(async () => {
    const initRes = await handleMemberSettingList({
      pageSize: 12,
      current: 1,
      field: 'createDate',
      order: 'desc',
      type: '',
    });
    if (initRes.success && initRes.data.length === 0) {
      setShowEmpty(true);
    }
  }, []);

  useAsyncEffect(async () => {
    const res = await handleFetchMemberCardList({
      name: '',
      type: cardParam,
    });
    setCardList(res.data as MemberCardConfigSetting.MemberCardListInfo[]);
  }, [cardParam]);

  return (
    <WrapContainer content={'当前场馆的会员卡卡种列表，在这里你可以对会员卡卡种配置进行统一管理'}>
      {showEmpty ? (
        <>
          <ProCard
            style={{ marginTop: 20 }}
            bodyStyle={{
              minHeight: '300px',
            }}
            title={<span style={{ fontSize: '16px' }}>会员卡列表</span>}
          >
            <Empty
              imageStyle={{
                display: 'none',
              }}
              description={
                <>
                  <BaseEmpty
                    title={'暂无会员卡'}
                    left={{
                      title: '新增会员卡',
                      description:
                        '这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述',
                    }}
                    right={{
                      title: '帮助你更好的使用会员卡',
                      list: ['如何创建会员卡', '如何查看服务发布文档', '帮助文档'],
                    }}
                    submitter={{
                      createButtonText: '新增会员卡',
                      onCreate: () => {
                        history.push('/member/member/add-member-setting');
                      },
                    }}
                  />
                </>
              }
            ></Empty>
          </ProCard>{' '}
        </>
      ) : (
        <ProCard>
          <Tabs
            className={'my-tabs'}
            defaultActiveKey="0"
            size={'large'}
            items={tabItems}
            onChange={tabChange}
          />
          <div className={'card-box'}>
            <div className={'grid-box'}>
              <Card
                className={'create-card-style'}
                hoverable
                onClick={async () => {
                  history.push('/member/member/add-member-setting');
                }}
              >
                <Button type="link" className={'create-card-text'}>
                  <PlusOutlined /> 新增会员卡
                </Button>
              </Card>
              {cardList?.map((card: any) => {
                return (
                  <CardListItem
                    key={card.id}
                    name={card.name}
                    cardType={card.type}
                    id={card.id}
                    venueNames={card.venueNames}
                    amount={card.amount}
                  />
                );
              })}
            </div>
          </div>
        </ProCard>
      )}
    </WrapContainer>
  );
};

export default MemberSettingList;
