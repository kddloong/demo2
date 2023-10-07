declare namespace DiscountReason {
  interface DiscountReasonItem {
    discount: string;
    id: string;
    memo: string;
    reason: string;
    status: string;
    value: number;
  }

  interface DiscountReasonDataParams extends RequestTableParam {
    reason?: string;
  }
}
