import { ModalForm, ProFormRadio } from '@ant-design/pro-components';
import { Form, Modal } from 'antd';
import { handleCancelOrderReverse2 } from '@/utils/area/schedule';
import { handleBookCancelReasonSelectData } from '@/utils/setting/base-setting/book-cancel-reason';

/**
 * 场地预定订单退款
 * @param props
 * @constructor
 */
const BackAreaScheduleOrder = (props: {
  visible: any;
  setVisible: any;
  currentNo: any;
  refreshTable?: any;
  title?: string;
}) => {
  const { visible, setVisible, currentNo, refreshTable, title = '预定' } = props;

  const [form] = Form.useForm();

  return (
    <ModalForm
      title={`取消${title}订单`}
      visible={visible}
      form={form}
      modalProps={{
        maskClosable: false,
        onCancel: () => {
          setVisible(false);
        },
        destroyOnClose: true,
      }}
      initialValues={{
        cancelReasonId: '0',
      }}
      onFinish={async (values) => {
        Modal.confirm({
          title: '取消预定',
          content: '确定要取消预定吗？',
          onOk: async () => {
            /**
             * 这里都是待付款的订单, 所以价格传0
             */
            const status = await handleCancelOrderReverse2({
              orderNo: currentNo,
              cancelReasonId: values.cancelReasonId === 'other' ? '' : values.cancelReasonId,
              cancelReason: '',
              price: 0,
            });

            if (status) {
              setVisible(false);
              form.resetFields();
              Modal.destroyAll();
              refreshTable?.();
            }
          },
        });
      }}
    >
      <ProFormRadio.Group
        name={'cancelReasonId'}
        label="预定取消理由"
        request={async () => {
          const result = await handleBookCancelReasonSelectData();

          form.setFieldsValue({ cancelReasonId: result[0].value });

          return result;
        }}
      />
    </ModalForm>
  );
};
export { BackAreaScheduleOrder };
