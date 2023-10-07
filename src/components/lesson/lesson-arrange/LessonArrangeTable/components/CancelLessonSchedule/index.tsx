import { ModalForm, ProFormTextArea } from '@ant-design/pro-components';
import { Form, Modal } from 'antd';
import { handleCancelLessonSchedule } from '@/utils/lesson/lesson-arrange/group-lesson-arrange';

const CancelLessonSchedule = (props: {
  currentId: string;
  visible: boolean;
  setVisible: any;
  refreshTable?: any;
}) => {
  const { currentId, visible, setVisible, refreshTable } = props;

  const [form] = Form.useForm();

  return (
    <>
      <ModalForm
        open={visible}
        title={'取消排课'}
        modalProps={{
          onCancel: () => {
            setVisible(false);
            form.resetFields();
          },
          destroyOnClose: true,
          maskClosable: false,
        }}
        onFinish={async (values) => {
          Modal.confirm({
            title: '取消',
            content: '确定要取消该条排课记录吗？',
            onOk: async () => {
              const result = await handleCancelLessonSchedule({ ...values, id: currentId });

              if (result) {
                setVisible(false);
                form.resetFields();
                refreshTable?.();
              }
            },
          });
        }}
      >
        <ProFormTextArea name={'cancelReason'} label={'取消理由'} />
      </ModalForm>
    </>
  );
};

export default CancelLessonSchedule;
