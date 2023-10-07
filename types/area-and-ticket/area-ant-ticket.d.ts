import { SettleOrderType } from '../utils';

export type SourceParams = {
  source: 'ticket' | 'area';
  type: SettleOrderType;
  venueId: string;
  details: unknown;
};

export type InfoParams = {
  phoneNo: string;
  memberId: string;
  contact?: string;
  preMobilizationNumber?: number;
  content?: string;
  reason?: string;
};

export type ActionParams = {
  payType: string;
  memberCardType: string;
  configId: string;
  orderPrice?: number;
  memberCount: number;
};
