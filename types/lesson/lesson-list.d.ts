import type { UploadFile } from 'antd/es/upload/interface';

declare namespace Lesson {
  export interface LessonItem {
    name: string;

    typeId: string;

    teacherId: string;

    targetPersonId: string;

    status: string;

    peoples: number;

    timers: number;
    category: string;
    priceType: string;

    price: number;

    lowFreePrice: number;

    description: string;

    bannerImageUrl: string;

    imageUrls: string;

    isLimitAge: string;

    minAge: number;

    maxAge: number;

    genderLimit: string;

    servicePersonIds: string;

    memo: string;

    venueId: string;

    memPrice: number;

    id: string;

    contract: string;

    isMem: string;

    isSupportCombo: string;
  }

  interface LessonItemAndTeacherName extends LessonItem {
    teacherName: string;
  }

  interface LessonItemAndPlanId extends LessonItemAndTeacherName {
    planId: string;
  }
}
