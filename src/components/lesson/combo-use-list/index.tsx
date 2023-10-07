import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import React, { FC, useRef, useState } from 'react';
import { UseLink } from '@/components/UseLink';
import { comboUseColumns } from './columns';
import { history, useAccess } from '@umijs/max';
import { handleFetchComboUseList } from '@/utils/lesson/combo-use';

const ComboUseTable: FC = (props) => {
  const { lessonCategory } = props;

  const actionRef = useRef<ActionType>();

  const [currentId, setCurrentId] = useState('');

  const refreshTable = () => {
    actionRef.current?.reload();
    actionRef.current?.clearSelected?.();
  };

  const accessPrefix = ``;

  const access = useAccess();

  const columns: ProColumns<ClassesTeam.ClassesTeamItem>[] = [
    {
      title: '会员姓名',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render: (_, record) => {
        return (
          <>
            <UseLink
              onClick={() => {
                history.push(`./add-group-list?type=show&classesTeamId=${record.id}`);
              }}
            >
              {record.name}
            </UseLink>
          </>
        );
      },
    },
    ...comboUseColumns,
  ];

  const rowChange = (selectedRowKeys: React.Key[]) => {
    if (selectedRowKeys.length > 0) {
      setCurrentId(selectedRowKeys.toString());
    } else {
      setCurrentId('');
    }
  };

  return (
    <>
      <PageContainer>
        <ProTable
          actionRef={actionRef}
          rowKey="id"
          params={{
            category: lessonCategory,
          }}
          request={async (params) => {
            return await handleFetchComboUseList({
              ...params,
              field: 'createDate',
              order: 'desc',
            });
          }}
          columns={columns}
          search={
            access[`${accessPrefix}search`]
              ? {
                  defaultCollapsed: true,
                  optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
                }
              : false
          }
        />
      </PageContainer>
    </>
  );
};

export { ComboUseTable };
