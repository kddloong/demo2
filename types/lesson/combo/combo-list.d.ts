export namespace LessonCombo {
  type LessonComboItem = {
    //关联课程id
    classId: string;
    //课程名称
    className: string;
    //套餐有效天数
    days: number;
    //描述
    description: string;
    //有效期方式
    effectiveType: string;
    //主键
    id: string;
    //会员价格
    memPrice: number;
    //备注
    memo: string;
    //套餐名称
    name: string;
    //套餐课程数量
    num: number;
    //价格
    price: number;
    //套餐状态
    status: string;
    //课程时间从
    validFrom: number;
    //课程时间到
    validTo: number;
  };

  type FindBuyer = {
    classId: string;
    phoneNo?: string;
  };
}
