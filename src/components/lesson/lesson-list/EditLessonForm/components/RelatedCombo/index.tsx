import { ActionType, ProTable } from '@ant-design/pro-components';
import React, { useContext, useRef } from 'react';
import { LessonContext } from '@/components/lesson/lesson-list/EditLessonForm';
import { handleFetchLessonComboList } from '@/utils/lesson/combo/combo-list';
import { lessonComboColumns } from '@/pages/lesson/combo/combo-list/columns';

const RelatedCombo = () => {
  const { lessonInfo } = useContext(LessonContext);

  const actionRef = useRef<ActionType>();

  const columns = [
    {
      title: '套餐名称',
      dataIndex: 'className',
      key: 'userName',
      width: '10%',
    },
    ...lessonComboColumns,
  ];

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
        params={{ classId: lessonInfo?.id }}
        request={async (params) => {
          return await handleFetchLessonComboList({
            ...params,
            field: 'createDate',
            order: 'desc',
          });
        }}
        search={false}
        columns={columns}
      />
    </>
  );
};

export { RelatedCombo };
