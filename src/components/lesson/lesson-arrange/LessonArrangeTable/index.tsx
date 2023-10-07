import { LessonCategoryEnum } from '@/utils/enums';
import { FC, useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Access, history, useAccess } from '@@/exports';
import { LessonArrange } from 'types/lesson/lesson-arrange';
import { columns as paikeColumns } from './columns';
import {
  compareDateTime,
  handleLessonSchedule,
} from '@/utils/lesson/lesson-arrange/group-lesson-arrange';
import { utilsStyles } from '@/styles/utilsStyles';
import { Button, Space } from 'antd';
import { AddClassSignUpInfo } from '@/components/lesson/lesson-arrange/LessonArrangeTable/components/EnterLessonSignupInfo';
import CancelLessonSchedule from '@/components/lesson/lesson-arrange/LessonArrangeTable/components/CancelLessonSchedule';
import { LessonSignUpDrawer } from '@/components/lesson/lesson-arrange/LessonArrangeTable/components/GroupInfo';
import { FinishLessonArrange } from '@/components/lesson/exec-list/ExecListTable/components/FinishLessonArrange';

interface LessonArrangeTableProps {
  category: LessonCategoryEnum;
  arrangeUrl: string;
  isIndependentPage?: boolean;
}

interface FinishParamsType {
  planId: string;
  classId: string;
  teacherId: string;
}

const LessonArrangeTable: FC<LessonArrangeTableProps> = (props) => {
  const { category, arrangeUrl, isIndependentPage = true } = props;

  const actionRef = useRef<ActionType>();

  const { styles } = utilsStyles();

  const access = useAccess();

  const [finishVisible, setFinishVisible] = useState(false);

  const [updateVisible, setUpdateVisible] = useState(false);

  function refreshTable() {
    actionRef.current?.reload();
    actionRef.current?.clearSelected?.();
  }

  const [record, setRecord] = useState<LessonArrange.LessonArrangeItem | null>(null);

  const noPadding = !isIndependentPage
    ? {
        cardProps: {
          bodyStyle: {
            padding: 0,
          },
        },
      }
    : {};

  // 当前排课的状态为正常并且课程没有开始
  const couldNotAction = (record: LessonArrange.LessonArrangeItem) =>
    !record ||
    record?.status === '0' ||
    compareDateTime(record?.planDate ?? '', record?.timeFrom ?? '');

  const [saveVisible, setSaveVisible] = useState(false);

  const [showVisible, setShowVisible] = useState(false);

  const [finishParams, setFinishParams] = useState<FinishParamsType | null>(null);

  const columns: ProColumns<LessonArrange.LessonArrangeItem>[] = [
    ...paikeColumns,
    {
      title: '操作',
      dataIndex: 'options',
      key: 'options',
      hideInSearch: true,
      hideInTable: false,
      width: '15%',
      render: (_, record) => {
        return (
          <Space>
            <Access key={'signUp'} accessible={!access?.['lesson:setting:signUp']}>
              <a
                className={couldNotAction(record) ? styles.disabledLink : ''}
                onClick={() => setSaveVisible(true)}
              >
                报名
              </a>
            </Access>
            <Access key={'show-signUp'} accessible={!access?.['lesson:setting:show-signUp']}>
              <a
                className={!record || record?.status === '-1' ? styles.disabledLink : ''}
                key={'show'}
                onClick={() => {
                  setShowVisible(true);

                  history.push(
                    `/lesson/lesson-arrange/sign-up-detail?arrangeId=${record.id}&lessonId=${record.classId}`,
                  );
                }}
              >
                查看预约信息
              </a>
            </Access>
            <Access key={'cancel'} accessible={!access?.['lesson:setting:cancel']}>
              <a
                className={
                  couldNotAction(record) || record?.signUpCount > 0 ? styles.disabledLink : ''
                }
                key="delete"
                onClick={async () => {
                  setUpdateVisible(true);
                }}
              >
                取消排课
              </a>
            </Access>
            {/*<Access key={'cancel'} accessible={!access?.['lesson:setting:cancel'] && initialState?.currentUser.id === record.teacherId}>*/}
            <Access key={'cancel'} accessible={!access?.['lesson:setting:cancel']}>
              <a
                className={record?.status === '3' ? styles.disabledLink : ''}
                key="delete"
                onClick={async () => {
                  setFinishParams({
                    classId: record.classId,
                    planId: record.id,
                    teacherId: record.teacherId,
                  });
                  setFinishVisible(true);
                }}
              >
                结束教学
              </a>
            </Access>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <ProTable
        {...noPadding}
        className={styles.myTableChose}
        actionRef={actionRef}
        rowKey="id"
        headerTitle={
          <Space>
            <Access key={'save'} accessible={!access?.['lesson:setting:add']}>
              <Button
                type={'primary'}
                onClick={() => {
                  history.push(
                    arrangeUrl ? arrangeUrl : `/lesson/lesson-arrange/do-lesson-arrange`,
                  );
                }}
              >
                新增课程设置
              </Button>
            </Access>
          </Space>
        }
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
        params={{ category }}
        request={async (params) => {
          return await handleLessonSchedule({
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

      {/*取消报名设置*/}
      {updateVisible && record?.id && (
        <CancelLessonSchedule
          currentId={record?.id}
          visible={updateVisible}
          setVisible={setUpdateVisible}
          refreshTable={refreshTable}
        />
      )}

      {/*课程报名信息*/}
      {showVisible && record?.id && (
        <LessonSignUpDrawer
          visible={showVisible}
          setVisible={setShowVisible}
          planId={record?.id}
          lessonId={record.classId}
          refreshTable={() => {
            refreshTable();
          }}
        />
      )}

      {/*报名*/}
      {saveVisible && record?.id && (
        <AddClassSignUpInfo
          planId={record?.id}
          refreshTable={() => {
            refreshTable();
          }}
          setVisible={setSaveVisible}
          visible={saveVisible}
          price={record?.price}
          memPrice={record?.memPrice}
          classId={record?.classId}
        />
      )}

      {finishVisible && (
        <FinishLessonArrange
          visible={finishVisible}
          setVisible={setFinishVisible}
          refresh={() => {
            refreshTable();
          }}
          {...finishParams}
        />
      )}
    </>
  );
};
export { LessonArrangeTable };
