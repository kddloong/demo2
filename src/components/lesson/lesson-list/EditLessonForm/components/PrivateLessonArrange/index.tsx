import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { handleFetchPrivateLessonArrangeList } from '@/utils/lesson/lesson-arrange/private-lesson-arrange';
import { useRef, useState } from 'react';
import {
  LessonArrange,
  PrivateLessonArrange as PrivateLessonArrangeTypes,
} from 'types/lesson/lesson-arrange';
import { utilsStyles } from '@/styles/utilsStyles';
import { arrangeColumns } from '@/pages/lesson/private-lesson/lesson-arrange/columns';

const PrivateLessonArrange = () => {
  const actionRef = useRef<ActionType>();

  const [record, setRecord] = useState<LessonArrange.LessonArrangeItem | null>(null);

  const { styles } = utilsStyles();

  const access = useAccess();

  const columns: ProColumns<PrivateLessonArrangeTypes.PrivateLessonArrangeItem>[] = [
    ...arrangeColumns,
  ];

  return (
    <>
      <ProTable
        className={styles.myTableChose}
        actionRef={actionRef}
        rowKey="id"
        search={
          access?.['lesson:setting:search']
            ? {
                labelWidth: 'auto',
                span: 6,
                defaultCollapsed: true,
                optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
              }
            : false
        }
        // scroll={{ x: 1500 }}
        request={async (params) => {
          return await handleFetchPrivateLessonArrangeList({
            ...params,
            field: 'planDate',
            order: 'desc',
          });
        }}
        rowClassName={(row) => {
          if (row.id === record?.id) {
            return `clicked`;
          }
          return '';
        }}
        onRow={(recordRow) => {
          return {
            onClick: () => {
              setRecord(recordRow);
            },
          };
        }}
        columns={columns}
      />
    </>
  );
};

export { PrivateLessonArrange };
