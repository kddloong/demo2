import { MemberCard } from '@/pages/member/member/user-info/components/member-card';
import { ProCard } from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './style.css';
import { handleFetchInvestCardByMemberId } from '@/utils/member/member/user-info';
import { MemberUserInfo } from 'types/member/member/user-info';
import { InvestCardTypeEnum } from '@/utils/enums';
import { Empty } from 'antd';

const MemberCardList: FC<MemberUserInfo.MemberInfoProps> = (props) => {
  const { memberId, noPadding = false, getCard, cardType = '', noChoseEffect = false } = props;

  const [cardData, setCardData] = useState<MemberUserInfo.MemberUserInfoItem[]>([]);

  const [current, setCurrent] = useState<MemberUserInfo.BaseUserInfoItem | undefined>();

  // 将card传给RechargeAmountWithMemberId
  useEffect(() => {
    if (noPadding) {
      getCard?.(current as MemberUserInfo.BaseUserInfoItem);
    }
  }, [current]);

  useAsyncEffect(async () => {
    const result = await handleFetchInvestCardByMemberId(memberId);

    if (result.success) {
      // 如果props 里面有 cardType 就是从会员用户列表的充值按钮打开的
      if (cardType) {
        const resultData = result?.data;
        if (
          [
            InvestCardTypeEnum.COUNT_CARD,
            InvestCardTypeEnum.EXPIRE_CARD,
            InvestCardTypeEnum.STORE_CARD,
            // @ts-ignore
          ].includes(cardType)
        ) {
          const filterData = resultData?.filter((resultItem) => {
            return resultItem.type === cardType;
          });

          setCardData(filterData);
          if (filterData.length === 1) {
            setCurrent(filterData[0]);
          }
        }
      } else {
        if (result?.data.length === 1) {
          setCurrent(result?.data[0]);
        }

        setCardData(result?.data);
      }
    }
  }, []);

  const noPaddingConfig = () => {
    return !noPadding
      ? {}
      : {
          bodyStyle: {
            padding: '15px 0 0',
          },
          headStyle: {
            padding: '0',
          },
        };
  };

  return (
    <>
      <ProCard title={'会员卡列表'} {...noPaddingConfig()}>
        {cardData.length > 0 ? (
          <>
            <Scrollbars style={{ width: '100%', height: 160 }} className={'card-box'}>
              <div style={{ width: 260 * cardData.length + 'px', height: 150 }}>
                {cardData.map((card) => {
                  return (
                    <MemberCard
                      chooseStatus={noChoseEffect ? {} : current}
                      card={card}
                      clickCard={setCurrent}
                      key={card.id}
                      name={card.name}
                      value={card.value}
                      label={card.label}
                      background={!card.backgroundColor ? '#57aaf8' : card.backgroundColor}
                    />
                  );
                })}
              </div>
            </Scrollbars>
          </>
        ) : (
          <div>
            <Empty description={'暂无会员卡信息'}></Empty>
          </div>
        )}
      </ProCard>
    </>
  );
};

export { MemberCardList };
