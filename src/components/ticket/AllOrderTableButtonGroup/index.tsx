import { Button, Modal, Space } from 'antd';
import { Access, useAccess } from '@umijs/max';
import { handleCheckReverseOrderByOrderCode } from '@/utils/area/schedule';
import { USE_ORDER } from '@/utils/ticket-and-reverse';
import { payStatusEnum } from '@/utils/enums';
import { BookOrder } from 'types/ticket/workplace';
import { TypeUtil } from 'types/utils';
import { handleCancelUseOrder } from '@/utils/reverse-and-ticket/reverse-and-ticket';

const ButtonGroupForVenueWorkplace = (
  record: BookOrder.BookOrderItem,
  action: (refresh: boolean) => void,
  setVisible: TypeUtil.SetState<boolean>,
  setBackVisible: (v: boolean) => void,
) => {
  const access = useAccess();

  return (
    <Space>
      <Access key={'pay'} accessible={!access?.['ticket:workplace:pay']}>
        <Button
          type={'primary'}
          disabled={
            record.payStatus !== payStatusEnum.NOT_PAY ||
            record.status !== USE_ORDER.WILL_PAY_STATUS
          }
          onClick={() => setVisible(true)}
        >
          付款
        </Button>
      </Access>

      <Access key={'check'} accessible={!access?.['ticket:workplace:check-detail']}>
        <Button
          type={'primary'}
          disabled={record.status !== USE_ORDER.WILL_VERIFY_STATUS}
          onClick={async () => {
            Modal.confirm({
              title: '核销订单',
              content: `确定要核销 ${record.orderNo} 订单吗?`,
              onOk: async () => {
                const result = await handleCheckReverseOrderByOrderCode(record.orderCode);

                if (result) {
                  action(false);
                }
              },
            });
          }}
        >
          核销订单
        </Button>
      </Access>

      <Access key={'back'} accessible={!access?.['ticket:workplace:back']}>
        {/* 只有待核销的订单能退款 */}
        <Button
          type={'primary'}
          disabled={
            !record.id || record.status !== USE_ORDER.WILL_VERIFY_STATUS || record.totalPrice === 0
          }
          onClick={async () => {
            setBackVisible?.(true);
          }}
        >
          退款
        </Button>
      </Access>

      <Access key={'cancel2'} accessible={!access?.['ticket:workplace:cancel12']}>
        {/* 只有待核销的订单能退款 */}
        <Button
          type={'primary'}
          disabled={!record.id || record.status !== USE_ORDER.WILL_PAY_STATUS}
          onClick={async () => {
            Modal.confirm({
              title: '取消订单',
              content: '确定要取消订单吗?',
              onOk: async () => {
                const status = await handleCancelUseOrder(record.id);

                if (status) {
                  action(true);
                }
              },
            });
          }}
        >
          取消订单
        </Button>
      </Access>
    </Space>
  );
};

export { ButtonGroupForVenueWorkplace };
