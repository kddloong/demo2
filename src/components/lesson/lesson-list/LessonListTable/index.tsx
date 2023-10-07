import { UseLink } from '@/components/UseLink';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Access, history, useAccess } from '@umijs/max';
import { Button, Dropdown, Menu, Modal } from 'antd';
import { FC, useRef } from 'react';
import { columns as lessonColumns } from './columns';
import {
  handleDeleteLesson,
  handleLessonList,
  handlePauseLesson,
  handleStartLesson,
} from '@/utils/lesson/lesson-list';
import { Lesson } from 'types/lesson/lesson-list';
import { RequestTableParam } from 'types/utils';
import { LessonCategoryEnum, lessonStatus } from '@/utils/enums';
import { POSITIVE_STATUS } from '@/utils/utils';

type LessonItem = Lesson.LessonItem;

interface LessonTableComponentProps {
  lessonCategory: LessonCategoryEnum;

  accessPrefix: string;
}

const LessonTableComponent: FC<LessonTableComponentProps> = (props) => {
  const { lessonCategory, accessPrefix } = props;

  const actionRef = useRef<ActionType>();

  const access = useAccess();

  const refreshTable = () => {
    actionRef.current?.reload();
    actionRef.current?.clearSelected?.();
  };

  const getPrivateComponents = () => <></>;

  const getClassComponents = (lessonInfo: Lesson.LessonItem) => (
    <>
      <Access accessible={true}>
        <a
          onClick={() => {
            history.push(
              `./lesson-classes-list?lessonId=${lessonInfo.id}&lessonVenueId=${lessonInfo.venueId}`,
            );
          }}
        >
          关联班级
        </a>
      </Access>
    </>
  );

  const columns: ProColumns<LessonItem>[] = [
    {
      title: '课程名称',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: false,
      hideInTable: false,
      width: '8%',
      render: (_, record) => {
        return (
          <UseLink
            key={'show'}
            onClick={async () => {
              history.push(
                `./edit-lesson?category=${lessonCategory}&type=show&lessonId=${record.id}`,
              );
            }}
          >
            {record.name}
          </UseLink>
        );
      },
    },
    ...lessonColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: '13%',
      render: (_, record) => [
        <Access key={'setting-combo'} accessible={!access?.['lesson:lesson:set-combo']}>
          {record.isSupportCombo === POSITIVE_STATUS && (
            <a
              key="set-combo"
              onClick={async () => {
                history.push(`/lesson/combo/combo-list?lessonId=${record.id}`);
              }}
            >
              设置套餐
            </a>
          )}
        </Access>,

        <Access key={'delete'} accessible={!access?.['lesson:lesson:delete']}>
          <a
            key="delete"
            onClick={async () => {
              Modal.confirm({
                title: '删除',
                content: '确定要删除该条记录吗？',
                onOk: async () => {
                  const status = await handleDeleteLesson(record.id as string);

                  if (status) {
                    refreshTable();
                  }
                },
              });
            }}
          >
            删除
          </a>
        </Access>,
        <>
          {lessonCategory === LessonCategoryEnum.CLASS_LESSON ? getClassComponents(record) : null}
        </>,
        <Access
          key={'action-paike'}
          accessible={!!access?.['lesson:lesson:action'] || !!!access?.['lesson:lesson:paike']}
        >
          <Dropdown
            key={'more'}
            trigger={['click']}
            overlay={
              <Menu
                onClick={({ key }) => {
                  if (key === 'action') {
                    Modal.confirm({
                      title: `${record.status === lessonStatus.STOP_STATUS ? '启用' : '停用'}`,
                      content: `确定要${
                        record.status === lessonStatus.STOP_STATUS ? '启用' : '停用'
                      }该课程吗?`,
                      onOk: async () => {
                        if (record.status === '0') {
                          const result = await handleStartLesson(record.id as string);
                          if (result) {
                            refreshTable();
                          }
                        } else {
                          const result = await handlePauseLesson(record.id as string);
                          if (result) {
                            refreshTable();
                          }
                        }
                      },
                    });
                  } else if (key === 'paike') {
                    history.push(`./add-paike?lessonId=${record.id}`);
                  }
                }}
              >
                {!access?.['lesson:lesson:action'] && (
                  <Menu.Item key="action"> {record.status === '0' ? '启用' : '停用'}</Menu.Item>
                )}

                {!access?.['lesson:lesson:paike'] && (
                  <Menu.Item key="paike" hidden={record.status === lessonStatus.STOP_STATUS}>
                    {' '}
                    排课
                  </Menu.Item>
                )}
              </Menu>
            }
          >
            <a>
              更多 <DownOutlined />
            </a>
          </Dropdown>
        </Access>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        headerTitle={
          <Access key={'add'} accessible={!access?.['lesson:lesson:save']}>
            <Button
              type="primary"
              key="primary"
              onClick={() => history.push(`./add-lesson?type=add`)}
            >
              <PlusOutlined /> 新增培训课程
            </Button>
          </Access>
        }
        scroll={{ x: 1500 }}
        params={{ category: lessonCategory }}
        request={async (params) => {
          return await handleLessonList({
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

export { LessonTableComponent };
