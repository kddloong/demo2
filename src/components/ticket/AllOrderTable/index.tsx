import type { ActionType } from '@ant-design/pro-components';
import { ProCard, ProTable } from '@ant-design/pro-components';
import '@/pages/menu33/workplace/style.css';
import type { FC, Key } from 'react';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { BackAreaScheduleOrder } from '@/pages/area/schedule/components/ShowCancelReverseDetail';
import { PayExistedTicketOrder } from '@/pages/menu33/workplace/components/PayExistedTicketOrder';
import { TicketContext } from '@/pages/menu33/workplace/components/VenueWorkPlace/context';
import { AllOrderTableProps } from '@/components/ticket/AllOrderTable/props';
import { BookDetailOrderManage, BookOrder } from 'types/ticket/workplace';
import { TicketsDetailTable } from '@/components/ticket/TicketsDetailTable';
import { utilsStyles } from '@/styles/utilsStyles';
import {
  handleFetchUseOrderDetailList,
  handleFetchUseOrderList,
} from '@/utils/reverse-and-ticket/reverse-and-ticket';
import { reverseAndTicketColumns } from '@/utils/reverse-and-ticket/columns';
import { BackUseOrderPrice } from '@/components/reverse-and-ticket/BackStartOrderPrice';

// todo  area/schedule 和 venue/order 统一一下
const AllOrderTable: FC<AllOrderTableProps> = forwardRef((props, refparams) => {
  const { venueId, isAll, orderItem, buttonGroup } = props;

  /**
   * 传递给获取列表的参数
   */
  const venueIdObj = (function (isALL) {
    return isALL
      ? {}
      : {
          venueId,
        };
  })(isAll);

  const actionRef = useRef<ActionType>();

  const [expandedRowKeys, setExpandedRowKeys] = useState<Key[]>([]);

  const [payRestVisible, setPayRestVisible] = useState(false);

  const [detailDataSource, setDetailDataSource] = useState<
    BookDetailOrderManage.BookDetailOrderItem[]
  >([]);

  const { setRefreshTicketDataTag } = useContext(TicketContext);

  const [record, setRecord] = useState<BookOrder.BookOrderItem | Record<string, any>>({});

  const [backVisible, setBackVisible] = useState(false);

  const [cancelVisible, setCancelVisible] = useState(false);

  const { styles } = utilsStyles();

  function setBackVisibleFunc(visible1: boolean) {
    setBackVisible(visible1);
  }

  const expandedRowRender = () => {
    return <TicketsDetailTable data={detailDataSource} set={setRecord} />;
  };

  const refresh = function (refresh1: boolean = false) {
    actionRef.current?.reload();
    setRecord({});

    if (setRefreshTicketDataTag && refresh1) {
      setRefreshTicketDataTag((init) => !init);
    }
  };

  useImperativeHandle(
    refparams,
    () => {
      return {
        refresh: () => {
          refresh();
        },
      };
    },
    [],
  );

  useEffect(() => {
    if (!payRestVisible) {
      refresh();
    }
  }, [payRestVisible]);

  return (
    <ProCard
      className={styles.myTableChose}
      headerBordered
      title={<div className={`card-title`}>今日订单</div>}
      bodyStyle={{
        padding: '0',
      }}
    >
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        headerTitle={buttonGroup?.(
          record as BookOrder.BookOrderItem,
          refresh,
          setPayRestVisible,
          setBackVisibleFunc,
        )}
        scroll={{ x: 1500 }}
        search={{
          filterType: 'light',
        }}
        rowClassName={(row) => {
          if (row.id === record.id) {
            return `clicked`;
          }
          return '';
        }}
        onRow={(rowRecord) => {
          return {
            onClick: () => {
              setRecord(rowRecord);
            },
          };
        }}
        expandable={{
          indentSize: 200,
          columnWidth: '5%',
          expandedRowRender,
          expandedRowKeys: expandedRowKeys,
          onExpand: async (expanded, expandedRecord) => {
            if (expanded) {
              const result = await handleFetchUseOrderDetailList(expandedRecord.id);

              if (result.success) {
                setDetailDataSource(result.data);

                setExpandedRowKeys([expandedRecord.id] as Key[]);
              }
            } else {
              setExpandedRowKeys([]);
            }
          },
        }}
        params={{
          orderType: orderItem,
        }}
        request={async (params) => {
          return await handleFetchUseOrderList({
            ...params,
            field: 'createDate',
            order: 'desc',
            ...venueIdObj,
          } as BookOrder.BookOrderDataParamsForWorkplace);
        }}
        columns={reverseAndTicketColumns('list', 'ticket')}
      />

      {payRestVisible && (
        <PayExistedTicketOrder
          orderId={record.id}
          venueId={venueId as string}
          setVisible={setPayRestVisible}
          visible={payRestVisible}
          refreshTable={refresh}
        />
      )}

      {backVisible && (
        <BackUseOrderPrice
          visible={backVisible}
          setVisible={setBackVisible}
          orderNo={record.orderNo}
          refreshTable={refresh}
        />
      )}

      {cancelVisible && (
        <BackAreaScheduleOrder
          refreshTable={refresh}
          visible={cancelVisible}
          setVisible={setCancelVisible}
          currentNo={record.orderNo}
          title={'售票'}
        />
      )}
    </ProCard>
  );
});

export { AllOrderTable };
