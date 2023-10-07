import { TypeUtil } from 'types/utils';

export interface RebackMemberOrderPriceProps {
  visible: boolean;
  setVisible: TypeUtil.SetState<boolean>;
  orderId: string;
  refreshTable: any;
}
