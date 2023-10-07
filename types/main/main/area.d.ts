import type { RequestTableParam } from '@/type/data';

declare namespace Area {
  type AreaDataParams = RequestTableParam & { parentId?: string };

  interface AreaItem {
    fullName: string;
    id?: string;
    level: string;
    name: string;
    parentId: string;
  }

  interface AreaDataItem {
    key: string;
    leaf?: boolean;
    title: string;
    children?: AreaDataItem[];
  }
}

declare namespace AreaOperate {
  interface loadDataParams {
    key: string | number;
    children: Area.AreaDataItem[];
  }

  interface loadDataFunc {
    (params: loadDataParams): void;
  }
}

/**
 * 用于场地预定订单的退款参数
 */
export type AreaScheduleBackParams = {
  orderNo: string;
  price: number;
  cancelReason: string;
  cancelReasonId: string;
};
