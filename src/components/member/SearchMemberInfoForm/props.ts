import { MemberUserInfo } from '../../../../types/member/member/user-info';

export type MainType = 'race' | 'lesson' | 'sell' | 'rent' | 'venue';

export interface SearchMemberInfoFormProps {
  venueId?: string;
  callback: (memberData: MemberUserInfo.MemberCardListItem[]) => void;
  wrapLayout: 'horizontal' | 'vertical';
  formName?: string;
  sourceType?: MainType;
  readCardAuth?: boolean;
  searchMemberAuth?: boolean;
}
