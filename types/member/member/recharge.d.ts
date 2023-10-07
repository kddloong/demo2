export declare namespace Recharge {
  interface IRechargeAmount {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
  }

  type IRechargeAmountForMemberId = IRechargeAmount & {
    memberId: string;
    type: InvestCardTypeEnum | string;
  };
}
