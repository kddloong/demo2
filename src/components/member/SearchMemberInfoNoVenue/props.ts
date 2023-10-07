import { MemberUser } from '../../../../types/member/member/member';

export interface SearchMemberInfoNoVenueProps {
  wrapLayout: 'horizontal' | 'vertical';
  formName?: string;
  callback: (info: MemberUser.MemberUserListItem) => void;
}
