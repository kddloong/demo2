import BigNumber from 'bignumber.js';

interface HasPrice {
  price: number;
}

export function needMoney(data: HasPrice[], sales: number) {
  const priceData = data.map((item) => item.price);

  const primeCost = priceData?.reduce((prev, next) => {
    const currentPrice = new BigNumber(next).toNumber();

    return new BigNumber(prev).plus(currentPrice).toNumber();
  }, 0);

  console.log(`primeCoist`, primeCost);

  return new BigNumber(primeCost)
    .times(sales === 0 ? 100 : sales)
    .div(100)
    .dp(2)
    .toNumber();
}

/**
 * 计算子订单支付时 会员卡应提交的价格
 */
export const needDetailMoney = (data: { price: number }, sales: number) => {
  console.log(
    new BigNumber(data.price)
      .times(sales === 0 ? 100 : sales)
      .div(100)
      .dp(2)
      .toNumber(),
  );

  return new BigNumber(data.price)
    .times(sales === 0 ? 100 : sales)
    .div(100)
    .dp(2)
    .toNumber();
};
