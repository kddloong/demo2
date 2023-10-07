import {
  actPriceFormDigit,
  createDateFormDateTimePicker,
  depositFormDigit,
  payStatusFormSelect,
  priceFormDigit,
} from '@/utils/columnUtils';
import type { ReactNode } from 'react';
import { genderRenderFromObj } from '@/utils/render';
import { LessonArrange } from '../../../../types/lesson/lesson-arrange';
import { LessonSignUpPayTypeEnum } from '@/utils/enums';
import {
  lessonSignUpPayType,
  lessonSignUpStatusOptions,
} from '@/utils/lesson/lesson-arrange/group-lesson-arrange';

export const getBackLessonSignUpColumns = (type: string) => {
  return [
    {
      title: '订单号',
      dataIndex: 'signUpNo',
      key: '',
      hideInSearch: true,
      hideInTable: false,
      width: '10%',
    },
    { ...priceFormDigit, hideInDescriptions: type === LessonSignUpPayTypeEnum.USE_COMBO },
    { ...actPriceFormDigit, hideInDescriptions: type === LessonSignUpPayTypeEnum.USE_COMBO },
    {
      title: '课时数',
      dataIndex: 'classNum',
      key: 'classNum',
      hideInSearch: true,
      hideInTable: false,
      width: '10%',
      hideInDescriptions: type === LessonSignUpPayTypeEnum.USE_MONEY,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      hideInSearch: true,
      hideInTable: false,
      render: (_: ReactNode, record: LessonArrange.SignUpPersonItem) => {
        return genderRenderFromObj(lessonSignUpStatusOptions, record.status);
      },
    },
    //@ts-ignore
    payStatusFormSelect,
    depositFormDigit,
    //@ts-ignore
    createDateFormDateTimePicker,
    lessonSignUpPayType(),
  ];
};
