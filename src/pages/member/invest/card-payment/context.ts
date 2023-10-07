import { TypeUtil } from '../../../../../types/utils';
import { InvestCard } from '../../../../../types/member/invest/invest';
import { createContext } from 'react';

export type DepositMemberProps = {
  chooseConfigInfo: InvestCard.BaseConfigInfoParams | null;
  setChooseConfigInfo: TypeUtil.SetState<InvestCard.BaseConfigInfoParams> | null;
};

export const DepositMemberContext = createContext<DepositMemberProps>({
  chooseConfigInfo: null,
  setChooseConfigInfo: null,
});
