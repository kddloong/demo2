declare namespace ComboOrder {
  type CreateComboOrderParams = {
    classComboId: string;
    memberId: string;
    name: string;
    phoneNo: string;
    height?: number;
    weight?: number;
    age?: number;
    gender?: string;
  };

  type ComboOrderItem = {
    //实际费用
    actPrice: number;
    billNo: string;
    cardNo: string;
    classComboId: string;
    classId: string;
    classNum: number;
    comboName: string;
    id: string;
    memName: string;
    memberId: string;
    memo: string;
    name: string;
    nickName: string;
    openId: string;
    orderCode: string;
    orderNo: string;
    orderTime: string;
    payStatus: string;
    payType: string;
    phoneNo: string;
    price: number;
    refundPrice: number;
    refundReason: string;
    status: string;
    validFrom: string;
    validTo: string;
  };

  /**
   * 约课的参数
   */
  type AppointLesson = {
    classPlanId: string;
    classId: string;
    num: number;
    phoneNo: string;
    memberId: string;
    comboId: string;
  };

  /**
   * 课程套餐支付 退课时
   */
  type RefundCombo = {
    num: number;
    id: string;
    refundReason: string;
  };
}
