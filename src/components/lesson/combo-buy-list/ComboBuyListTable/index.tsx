import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { TypeUtil } from '../../../../../types/utils';
import { FC, useRef, useState } from 'react';
import { Access, useAccess } from '@umijs/max';
import { columns as comboOrderColumns } from './columns';
import { handleFetchLessonComboOrderList } from '@/utils/lesson/combo/combo-order';
import { LessonComboOrderStatusEnum } from '@/utils/enums';
import { BackLessonComboOrder } from '../BackLessonComboOrder';
import { utilsStyles } from '@/styles/utilsStyles';
import { SettleOrderForLessonCombo } from '@/components/lesson/SettleOrderForLessonCombo';

const ComboBuyListTable: FC<TypeUtil.BaseLessonCategoryProps> = (props) => {
  const actionRef = useRef<ActionType>();

  const access = useAccess();

  const { styles } = utilsStyles();

  const { lessonCategory } = props;

  const accessPrefix = ``;

  const [record, setRecord] = useState<ComboOrder.ComboOrderItem | null>(null);

  const [backVisible, setBackVisible] = useState(false);

  const [payVisible, setPayVisible] = useState(false);

  const refreshTable = () => {
    actionRef.current?.reload();
  };

  const columns: ProColumns<ComboOrder.ComboOrderItem>[] = [
    ...comboOrderColumns,
    {
      title: '操作',
      dataIndex: 'option',
      key: 'option',
      hideInSearch: true,
      hideInTable: false,
      width: '10%',
      valueType: 'option',
      render: (_, record) => [
        <Access key={'back'} accessible={!access?.[`${accessPrefix}back`]}>
          <a
            className={
              !record ||
              [
                LessonComboOrderStatusEnum.CANCELED,
                LessonComboOrderStatusEnum.WILL_PAY,
                LessonComboOrderStatusEnum.BACK_PRICE,
              ].includes(record?.status as LessonComboOrderStatusEnum)
                ? styles.disabledLink
                : ''
            }
            key={'buy'}
            onClick={() => {
              setRecord(record);
              setBackVisible(true);
            }}
          >
            退款
          </a>
        </Access>,
        <Access key={'pay'} accessible={!access?.[`${accessPrefix}pay`]}>
          <a
            type={'primary'}
            className={
              !record || record.status !== LessonComboOrderStatusEnum.WILL_PAY
                ? styles.disabledLink
                : ''
            }
            onClick={() => {
              setRecord(record);
              setPayVisible(true);
            }}
          >
            支付
          </a>
        </Access>,
      ],
    },
  ];

  return (
    <>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        scroll={{ x: 1500 }}
        params={{ category: lessonCategory }}
        request={async (params) => {
          return await handleFetchLessonComboOrderList({
            ...params,
            field: 'createDate',
            order: 'desc',
          });
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

      {backVisible && record?.id && (
        <BackLessonComboOrder
          visible={backVisible}
          setVisible={setBackVisible}
          orderId={record?.id}
          refreshTable={refreshTable}
        />
      )}

      {payVisible && record && (
        <SettleOrderForLessonCombo
          visible={payVisible}
          setVisible={setPayVisible}
          refreshTable={refreshTable}
          orderId={record?.id}
          orderNo={record?.orderNo}
        />
      )}
    </>
  );
};

export { ComboBuyListTable };
