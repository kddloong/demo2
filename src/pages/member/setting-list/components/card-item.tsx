import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import '../style.css';
import { history } from '@umijs/max';
import {
  bgObj,
  borderBgObj,
  borderObj,
  colorObj,
  memberTypeObj,
} from '@/utils/member/setting/setting';
import { stringToCheckBox } from '@/utils/utils';

type CardListItemProps = {
  id: string;
  name: string;
  cardType: string;
  venueNames?: string;
  amount: string; // 面值
};

const CardListItem: React.FC<CardListItemProps> = (props) => {
  const { name, cardType, amount, id } = props;
  const [amountArr, setAmountArr] = useState([]);
  const [more, setMore] = useState(false);

  useEffect(() => {
    let amtArr = stringToCheckBox(amount);
    if (amtArr.length > 5) {
      amtArr = amtArr.slice(0, 2);
      setMore(true);
    }

    setAmountArr(amtArr as []);
  }, []);

  return (
    <>
      <Card
        className={'card-info-style'}
        hoverable
        bodyStyle={{
          backgroundImage: bgObj[cardType as keyof typeof bgObj],
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          height: '100%',
        }}
        onClick={async () => {
          history.push(`/member/member/add-member-setting?id=${id}&type=edit`);
        }}
      >
        <div
          className={'card-info-title'}
          style={{ color: colorObj[cardType as keyof typeof colorObj] }}
        >
          {name}
        </div>

        <div
          className={'card-info-subtitle'}
          style={{ color: colorObj[cardType as keyof typeof colorObj] }}
        >
          {memberTypeObj[cardType as keyof typeof memberTypeObj].label}
        </div>
        <div className={'card-info-content'}>
          {amountArr.map((item) => {
            return (
              <div
                key={'item'}
                className={'card-info-content-item'}
                style={{
                  border: borderObj[cardType as keyof typeof borderObj],
                  backgroundColor: borderBgObj[cardType as keyof typeof borderBgObj],
                  color: colorObj[cardType as keyof typeof colorObj],
                }}
              >
                {cardType === '0' && +item + ' 元'}
                {cardType === '1' && item + ' 天'}
                {cardType === '2' && item + ' 次'}
              </div>
            );
          })}

          {more && (
            <div
              key={'item'}
              className={'card-info-content-item'}
              style={{
                border: borderObj[cardType as keyof typeof borderObj],
                backgroundColor: borderBgObj[cardType as keyof typeof borderBgObj],
                color: colorObj[cardType as keyof typeof colorObj],
              }}
            >
              更多 &gt;
            </div>
          )}
        </div>
      </Card>
    </>
  );
};
export default CardListItem;
