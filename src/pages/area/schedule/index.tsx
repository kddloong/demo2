import { BackAreaScheduleOrder } from '@/pages/area/schedule/components/ShowCancelReverseDetail';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import React, { useRef, useState } from 'react';
import { BookOrder } from 'types/ticket/workplace';
import { fromSetting } from '@/utils/enums';
import { utilsStyles } from '@/styles/utilsStyles';
import { WrapContainer } from '@/components/layout/WrapContainer';
import { handleFetchUseOrderList } from '@/utils/reverse-and-ticket/reverse-and-ticket';
import { reverseAndTicketColumns } from '@/utils/reverse-and-ticket/columns';
import { UseOrder } from 'types/reverse-and-ticket/UseOrder';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const ScheduleOrderList = () => {
  const actionRef = useRef<ActionType>();

  const [cancelVisible, setCancelVisible] = useState(false);

  const [record, setRecord] = useState<BookOrder.BookOrderItem | Record<string, any>>({});

  const { styles } = utilsStyles();

  const refreshTable = () => {
    actionRef.current?.reload();
    actionRef.current?.clearSelected?.();

    setRecord({});
  };

  const columns: ProColumns<UseOrder.UseOrderItem>[] = [
    ...reverseAndTicketColumns('page'),
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: 200,
      render: (_, thisRecord) => [<Space key={'space'}></Space>],
    },
  ];

  return (
    <ErrorBoundary>
      <WrapContainer content={'当前用户池的所有用户，在这里你可以对用户进行统一管理。'}>
        <ProTable
          className={styles.myTableChose}
          actionRef={actionRef}
          rowKey="id"
          // headerTitle={ButtonGroup()}
          scroll={{ x: 2500 }}
          params={{
            orderType: fromSetting.FROM_AREA,
          }}
          request={async (params) => {
            return await handleFetchUseOrderList({
              ...params,
              field: 'createDate',
              order: 'desc', // venueId: props.id,
            });
          }}
          // 显示选中的行
          rowClassName={(row) => {
            if (row.orderNo === record.orderNo) {
              return `clicked`;
            }
            return '';
          }}
          search={{
            labelWidth: 'auto',
            collapsed: false,
            collapseRender: false,
          }}
          onRow={(row) => {
            return {
              onClick: () => {
                setRecord(row);
              },
            };
          }}
          columns={columns}
        />

        {cancelVisible && (
          <BackAreaScheduleOrder
            visible={cancelVisible}
            setVisible={setCancelVisible}
            currentNo={record.orderNo}
            refreshTable={refreshTable}
            title={'预定'}
          />
        )}
      </WrapContainer>
    </ErrorBoundary>
  );
};

export default ScheduleOrderList;
