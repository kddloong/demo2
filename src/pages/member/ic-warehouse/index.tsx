import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button, Space } from 'antd';
import { useRef, useState } from 'react';
import { columns as cardColumns } from './columns';
import { CreateCardInDrawer } from './components/create';
import { handleCardsList } from '@/utils/device/encrypted-card/write-card';
import { WCardWarehouse } from 'types/device/encrypted-card/write-card';
import { utilsStyles } from '@/styles/utilsStyles';
import { RequestTableParam } from 'types/utils';
import { WrapContainer } from '@/components/layout/WrapContainer';

const WCardWareHouse = () => {
  const actionRef = useRef<ActionType>();

  const [visible, setVisible] = useState(false);

  const [record, setRecord] = useState<WCardWarehouse.WCardWarehouseListItem | null>(null);

  const access = useAccess();

  const accessPrefix = `device:read-card:list:`;

  const refreshTable = () => {
    actionRef.current?.reload();
    actionRef.current?.clearSelected?.();
  };

  const { styles } = utilsStyles();

  const columns: ProColumns<WCardWarehouse.WCardWarehouseListItem>[] = [...cardColumns];

  return (
    <WrapContainer content={'读卡器'}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        // scroll={{ x: 1500 }}
        toolbar={{
          title: (
            <>
              <Space>
                <Button
                  type="primary"
                  key="primary33"
                  onClick={() => {
                    setVisible(true);
                  }}
                >
                  <PlusOutlined /> IC卡入库
                </Button>
              </Space>
            </>
          ),
        }}
        request={async (params) => {
          const { current, pageSize, keyword, ...others } = params;

          return await handleCardsList({
            ...others,
            current,
            pageSize,
            field: 'createDate',
            order: 'desc',
          } as RequestTableParam);
        }}
        rowClassName={(row) => {
          if (row.cardNo === record?.cardNo) {
            return `clicked`;
          }
          return '';
        }}
        onRow={(row) => {
          return {
            onClick: () => {
              setRecord(row);
            },
          };
        }}
        className={styles.myTableChose}
        columns={columns}
        search={
          access?.[`${accessPrefix}search`]
            ? {
                defaultCollapsed: true,
                optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
              }
            : false
        }
      />

      <CreateCardInDrawer visible={visible} setVisible={setVisible} refreshTable={refreshTable} />
    </WrapContainer>
  );
};

export default WCardWareHouse;
