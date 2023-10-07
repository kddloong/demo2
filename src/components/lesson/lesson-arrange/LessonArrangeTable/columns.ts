import { DATE_FORMAT, genOptionsFromObj } from '@/utils/utils';
import type { ProColumns } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { LessonArrange } from 'types/lesson/lesson-arrange';
import { genderRenderFromObj } from '@/utils/render';
import { handleTeacherSelectData } from '@/utils/lesson/teacher/tercher-list';
import { selectDataType } from '@/utils/constant';
import { groupLessonStatus } from '@/utils/lesson/lesson-arrange/group-lesson-utils';

export const columns: ProColumns<LessonArrange.LessonArrangeItem>[] = [
  {
    title: '课程名称',
    dataIndex: 'name',
    key: 'name',
    hideInSearch: false,
    hideInTable: false,
  },
  {
    title: '报名人数',
    dataIndex: 'signUpCount',
    key: 'signUpCount',
    hideInSearch: true,
    hideInTable: false,
    render: (_, record) => {
      return `${record.signUpCount} / ${record.peoples}`;
    },
  },
  {
    title: '排课日期',
    dataIndex: 'planDate',
    key: 'planDate',
    hideInSearch: false,
    hideInTable: false,
    valueType: 'dateRange',
    render: (_, record) => {
      return (
        record?.planDate &&
        `${dayjs(record?.planDate).format(DATE_FORMAT)} ${record.timeFrom} - ${record.timeTo}`
      );
    },
    search: {
      transform: (value) => {
        return {
          planDateFrom: value[0],
          planDateTo: value[1],
        };
      },
    },
  },
  {
    title: '上课老师',
    dataIndex: 'teacherId',
    key: 'teacherId',
    hideInSearch: true,
    hideInTable: false,
    valueType: 'select',
    request: async () => {
      return await handleTeacherSelectData({ type: selectDataType.ALL_DATA });
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    hideInSearch: true,
    hideInTable: false,
    valueType: 'select',
    fieldProps: {
      options: genOptionsFromObj(groupLessonStatus),
    },
    render: (_, record) => {
      return genderRenderFromObj(groupLessonStatus, record.status);
    },
  },
  {
    title: '场地名称',
    dataIndex: 'venueName',
    key: 'venueName',
    hideInSearch: true,
    hideInTable: false,
  },
  {
    title: '取消理由',
    dataIndex: 'cancelReason',
    key: 'cancelReason',
    hideInSearch: true,
    hideInTable: false,
  },
];
