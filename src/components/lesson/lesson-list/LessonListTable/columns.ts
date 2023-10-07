import { handleDictionary } from '@/utils/main/main/dictionary';
import { selectDataType } from '@/utils/constant';
import { genderRenderFromObj, tagRender } from '@/utils/render';
import {
  FREE_PRICE,
  LOW_FREE_PRICE,
  NORMAL_PRICE,
  priceTypeOptions,
  trueFalseOptions,
} from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-components';
import { handleVenueForParentId } from '@/utils/setting/manage/venue-setting';
import { handleTeacherSelectData } from '@/utils/lesson/teacher/tercher-list';
import { handleLessonTargetPersonSelectData } from '@/utils/lesson/base/target-person';
import { Lesson } from 'types/lesson/lesson-list';
import { handleTrainLessonTypeSelectData } from '@/utils/lesson/base/lesson-type';

type LessonItem = Lesson.LessonItem;

export const columns: ProColumns<LessonItem>[] = [
  {
    title: '私教老师',
    dataIndex: 'teacherId',
    key: 'teacherId',
    hideInSearch: false,
    hideInTable: false,
    width: '7%',
    valueType: 'select',
    request: async () => {
      return await handleTeacherSelectData({ type: selectDataType.ALL_DATA });
    },
  },
  {
    title: '课程类型',
    dataIndex: 'typeId',
    key: 'typeId',
    hideInSearch: true,
    hideInTable: false,
    width: '7%',
    valueType: 'select',
    request: async () => {
      const result = await handleTrainLessonTypeSelectData();

      return result.data;
    },
  },
  {
    title: '适用人群',
    dataIndex: 'targetPersonId',
    key: 'targetPersonId',
    hideInSearch: false,
    hideInTable: false,
    width: '9%',
    valueType: 'select',
    request: async () => {
      return await handleLessonTargetPersonSelectData();
    },
  },
  {
    title: '价格类型',
    dataIndex: 'priceType',
    key: 'priceType',
    hideInSearch: true,
    hideInTable: false,
    width: '7%',
    valueType: 'select',
    fieldProps: {
      options: priceTypeOptions,
    },
    render: (_, record) => {
      switch (record.priceType) {
        case NORMAL_PRICE:
          return tagRender('green', '正常价格');
        case LOW_FREE_PRICE:
          return tagRender('blue', '低免价格');
        case FREE_PRICE:
          return tagRender('geekblue', '免费');
        default:
          return null;
      }
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    hideInSearch: true,
    hideInTable: false,
    width: '7%',
    valueType: 'select',
    request: async () => {
      return await handleDictionary('lesson_status');
    },
    render: (_, record) => {
      return genderRenderFromObj(trueFalseOptions('正常', '停用'), record.status);
    },
  },
  {
    title: '课程人数',
    dataIndex: 'peoples',
    key: 'peoples',
    hideInSearch: true,
    hideInTable: false,
    width: '7%',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    hideInSearch: true,
    hideInTable: false,
    width: '7%',
    render: (_, record) => {
      if (record.priceType === FREE_PRICE) {
        return 0;
      } else {
        return record.price;
      }
    },
  },
  {
    title: '会员价格',
    dataIndex: 'memPrice',
    key: 'memPrice',
    hideInSearch: true,
    hideInTable: false,
    ellipsis: true,
    width: '7%',
  },
  {
    title: '所属场馆',
    dataIndex: 'venueId',
    key: 'venueId',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
    valueType: 'select',
    request: async () => {
      return await handleVenueForParentId();
    },
  },
];
