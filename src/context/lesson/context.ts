import { createContext } from 'react';
import { WeekInfoImpl } from '@/pages/lesson/private-lesson/do-lesson-arrange';
import { TypeUtil } from 'types/utils';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/utils/utils';

interface WeekInfoTypes {
  weekInfo: WeekInfoImpl;
  setWeekInfo: TypeUtil.SetState<WeekInfoImpl> | null;
}

export const WeekInfoContext = createContext<WeekInfoTypes>({
  weekInfo: {
    weekNum: +dayjs().format('w'),
    endDate: dayjs().endOf('week').format(DATE_FORMAT),
    startDate: dayjs().startOf('week').format(DATE_FORMAT),
  },
  setWeekInfo: null,
});

export const LessonArrangeTeacherContext = createContext<{
  teacherId: string | null;
  teacherName: string | null;
  setTeacherId: TypeUtil.SetState<string> | null;
  setTeacherName: TypeUtil.SetState<string> | null;
}>({
  teacherId: null,
  teacherName: null,
  setTeacherName: null,
  setTeacherId: null,
});
