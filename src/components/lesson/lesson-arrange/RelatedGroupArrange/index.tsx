import { useContext, useRef } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { TeacherContext } from '@/pages/lesson/teacher/edit-teacher';
import { handleLessonSchedule } from '@/utils/lesson/lesson-arrange/group-lesson-arrange';
import { LessonArrange } from '../../../../../types/lesson/lesson-arrange';
import { columns as paikeColumns } from '@/components/lesson/lesson-arrange/LessonArrangeTable/columns';

const RelatedGroupLessonArrange = () => {
  const actionRef = useRef<ActionType>();

  const { teacherInfo } = useContext(TeacherContext);

  const columns: ProColumns<LessonArrange.LessonArrangeItem>[] = [...paikeColumns];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        cardProps={{
          bodyStyle: {
            padding: 0,
          },
        }}
        rowKey="id"
        scroll={{ x: 1500 }}
        params={{ teacherId: teacherInfo?.id }}
        request={async (params) => {
          return await handleLessonSchedule({
            ...params,
            field: 'planDate',
            order: 'desc',
          });
        }}
        search={false}
        columns={columns}
      />
    </>
  );
};

export { RelatedGroupLessonArrange };
