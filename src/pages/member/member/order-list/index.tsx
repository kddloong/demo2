import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import type { Key } from 'react';
import { useRef, useState } from 'react';
import { childrenColumns, columns as userListColumns } from './columns';
import { Button, Modal, Space } from 'antd';
import { RebackMemberOrderPrice } from '@/pages/member/member/order-list/components/RebackMemberOrderPrice';
import { handleCancelOrder, handleOrderList } from '@/utils/member/member/order';
import { MemberOrderStatusEnum } from '@/utils/enums';
import { RequestTableParam } from '../../../../../types/utils';
import { utilsStyles } from '@/styles/utilsStyles';
import { WrapContainer } from '@/components/layout/WrapContainer';
import MemberOrderPayment from '@/pages/member/member/order-list/components/MemberOrderPayment';

/**
 * 订单记录列表
 * @constructor
 */
const OrderList = () => {
  const actionRef = useRef<ActionType>();

  const access = useAccess();

  const [record, setRecord] = useState<MemberOrder.OrderListItem | null>(null);

  const [visible, setVisible] = useState(false);

  const columns: ProColumns<MemberOrder.OrderListItem>[] = [...userListColumns];

  const [payVisible, setPayVisible] = useState(false);

  const refreshTable = () => {
    actionRef.current?.reload();
  };

  const [expandedRowKeys, setExpandedRowKeys] = useState<Key[]>([]);

  function onExpand(expand: boolean, row: MemberOrder.OrderListItem) {
    if (expand) {
      setExpandedRowKeys([row.orderNo]);
    } else {
      setExpandedRowKeys([]);
    }
  }

  const expandedRowRender = (expandRow: MemberOrder.OrderListItem) => {
    return (
      <ProTable
        columns={childrenColumns}
        headerTitle={false}
        search={false}
        options={false}
        dataSource={[expandRow]}
        pagination={false}
      />
    );
  };

  const { styles } = utilsStyles();

  return (
    <WrapContainer content={'你可以在此处查看所有会员订单'}>
      <ProTable
        scroll={{ x: 1800 }}
        className={styles.myTableChose}
        headerTitle={
          <Space>
            <Access key={'pay'} accessible={!access?.['member:order:pay']}>
              <Button
                disabled={!record?.id || record.status !== MemberOrderStatusEnum.CREATE}
                type={'primary'}
                onClick={() => setPayVisible(true)}
              >
                支付
              </Button>
            </Access>
            {/*todo 退款操作后台还未完成*/}
            <Access key={'back'} accessible={!access?.['member:order:back']}>
              <Button
                disabled={!record?.id || record.status !== MemberOrderStatusEnum.ALREADY_PAY}
                type={'primary'}
                onClick={() => setVisible(true)}
              >
                退款
              </Button>
            </Access>
            <Access key={'cancel'} accessible={!access?.['member:order:cancel']}>
              <Button
                disabled={!record?.id || record.status !== MemberOrderStatusEnum.CREATE}
                onClick={() => {
                  Modal.confirm({
                    title: '取消订单',
                    content: '确定要取消该订单吗?',
                    onOk: async () => {
                      if (!record) {
                        return;
                      }

                      const result = await handleCancelOrder(record?.id);
                      if (result.success) {
                        refreshTable();
                      }
                    },
                  });
                }}
              >
                取消订单
              </Button>
            </Access>
          </Space>
        }
        actionRef={actionRef}
        rowKey="orderNo"
        request={async (params) => {
          return await handleOrderList({
            ...params,
            field: 'createDate',
            order: 'desc',
          } as RequestTableParam);
        }}
        // 显示选中的行
        rowClassName={(row) => {
          if (row.orderNo === record?.orderNo) {
            return `clicked`;
          }
          return '';
        }}
        search={
          !access?.['member:order:search']
            ? {
                defaultCollapsed: true,
                optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
              }
            : false
        }
        onRow={(row) => {
          return {
            onClick: () => {
              setRecord(row);
            },
          };
        }}
        expandable={{ columnWidth: '3%', expandedRowRender, expandedRowKeys, onExpand }}
        columns={columns}
      />

      {payVisible && (
        <MemberOrderPayment
          visible={payVisible}
          setVisible={setPayVisible}
          refresh={refreshTable}
          orderId={record?.id}
        />
      )}

      {visible && record?.id && (
        <RebackMemberOrderPrice
          visible={visible}
          setVisible={setVisible}
          orderId={record?.id}
          refreshTable={refreshTable}
        />
      )}
    </WrapContainer>
  );
};

export default OrderList;
