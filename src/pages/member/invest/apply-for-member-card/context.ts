import { createContext } from 'react';
import { TypeUtil } from '../../../../../types/utils';
import { InvestCard } from '../../../../../types/member/invest/invest';

export type ApplyMemberCardProps = {
  memberId: string | null;
  setMemberId: TypeUtil.SetState<string> | null;
  chooseConfigInfo: InvestCard.BaseConfigInfoParams | null;
  setChooseConfigInfo: TypeUtil.SetState<InvestCard.BaseConfigInfoParams> | null;
  current: number;
};

export type ShowMemberCardContextProps = {
  venueId: string | null;
  setVenueId: TypeUtil.SetState<string> | null;
};

export const ApplyMemberCardContext = createContext<ApplyMemberCardProps>({
  memberId: null,
  setMemberId: null,
  chooseConfigInfo: null,
  setChooseConfigInfo: null,
  current: 0,
});

/**
 * 保存一些用来展示的数据
 */
export const ShowMemberCardContext = createContext<ShowMemberCardContextProps>({
  venueId: null,
  setVenueId: null,
});
