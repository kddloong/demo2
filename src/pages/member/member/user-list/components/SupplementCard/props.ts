import { TypeUtil } from 'types/utils';

export interface SupplementCardProps {
  visible: boolean;
  setVisible: TypeUtil.SetState<boolean>;
  memberId: string;
  refreshTable: any;
}
