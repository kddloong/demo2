import { RequestTableParam } from '../utils';

export interface cancelLessonScheduleParams {
  id: string;
  cancelReasonId?: string;
  cancelReason?: string;
}

export declare namespace LessonArrange {
  interface LessonArrangeItem {
    bannerImageUrl: string;
    classId: string;
    id: string;
    isFree: string;
    name: string;
    peoples: number;
    planDate: string;
    price: number;
    signUpCount: number;
    status: string;
    timeFrom: string;
    timeTo: string;
    venueId: string;
    cancelReason: string;
    memPrice: number;

    teacherId: string;
  }

  type SearchSignUpParams = {
    planId: string;
  } & RequestTableParam;

  type SignUpPersonItem = {
    id: string;
    planId: string;

    nickName: string;

    openId: string;

    signUpNo: string;

    status: string;

    signUpTime: string;

    payStatus: string;

    payTime: string;

    payDelayTime: string;

    priceType: string;

    price: number;

    actPrice: number;

    payType: string;

    source: string;

    type: string;

    checkIn: string;

    name: string;

    gender: string;

    height: number;

    weight: number;

    age: number;

    phoneNo: string;

    billNo: string;

    refundReason: string;

    classNum: number;

    memberId: string;

    refundPrice: number;

    refundClassNum: number;

    cardNo: string;
  };

  type SaveLessonSignUpParams = {
    planId: string;
    phoneNo: string;
    name: string;
    gender: string;
    price?: number;
    id?: string;
    signUpNo?: string;
    memberId: string;
  };
}

export declare namespace DoLessonArrange {
  interface AddPaiKeParams {
    classId: string;
    planDate: string;
    status: string;
    timeFrom: string;
    timeTo: string;
    id: string;
    venueId: string;
  }

  interface PaiKeTime {
    timeFrom: string;
    timeTo: string;
  }

  interface PaiKeSchedule {
    header: {
      timeFrom: string;
    };
    classId: string;
    date: string;
    id: string;
    merge: number;
    mergeNum: number;
    name: string;
    teacherId: string;
    teacherName: string;
    timeFrom: string;
    timeTo: string;
    color?: string;
  }

  type SimplePaikeSchedule = Omit<PaiKeSchedule, 'header'>;

  interface PaikeScheduleInfo {
    time: PaiKeTime;
    infos: PaiKeSchedule[];
  }
}

/**
 * 退款的基本参数
 */
export type CommonBackParams = {
  refundReason: string;
  id: string;
  price: number;
};

/**
 * 私教课程
 */
export declare namespace PrivateLessonArrange {
  type PrivateLessonArrangeItem = {
    //关联套餐id
    classId: string;
    //
    className: string;
    //关联套餐id
    comboId: string;
    //性别
    gender: string;
    //主键
    id: string;
    //姓名
    name: string;
    //关联微信用户OPENID
    openId: string;
    //手机号
    phoneNo: string;
    //排课日期
    planDate: number;
    //取消原因
    reason: string;
    //报名单号
    signUpNo: string;
    //报名时间
    signUpTime: number;
    //状态
    status: string;
    //预约教练
    teacherId: string;
    //
    teacherName: string;
    //课程时间从
    timeFrom: string;
    //课程时间到
    timeTo: string;
  };

  /**
   * 确认学员预约信息
   */
  type ConfirmPrivateArrange = {
    id: string;
    status: string;
    reason: string;
  };

  /**
   * 保存私教课报名
   */
  type SaveLessonArrangeSignUp = {
    classId: string;
    planDate: string;
    timeFrom: string;
    timeTo: string;
    teacherId: string;
  };

  type ScheduleParams = {
    startDate: string;
    endDate: string;
    teacherId: string;
  };
}
