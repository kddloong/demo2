import { FC, useRef } from 'react';
import { RequestTableParam, TypeUtil } from '../../../../../types/utils';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { columns as execColumns } from './columns';
import { useAccess } from '@umijs/max';
import { handleFetchExecRecordList } from '@/utils/lesson/exec-list';

const ExecListTable: FC<TypeUtil.BaseLessonCategoryProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const { lessonCategory } = props;

  const access = useAccess();

  const columns: ProColumns<ExecRecord.ExecRecordItem>[] = [...execColumns];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        scroll={{ x: 1500 }}
        params={{ category: lessonCategory }}
        request={async (params) => {
          return await handleFetchExecRecordList({
            ...params,
            field: 'createDate',
            order: 'desc',
          } as RequestTableParam);
        }}
        search={
          !access?.['lesson:list:search']
            ? {
                defaultCollapsed: true,
                optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
              }
            : false
        }
        columns={columns}
      />
    </>
  );
};

export { ExecListTable };
