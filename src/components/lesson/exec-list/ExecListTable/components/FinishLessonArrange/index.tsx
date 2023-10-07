import { ProForm, ProFormDigit, ProFormTextArea } from '@ant-design/pro-components';
import { Form, Modal } from 'antd';
import { basicRule } from '@/utils/utils';
import { FC } from 'react';
import type { TypeUtil } from 'types/utils';
import { handleSaveExecRecord } from '@/utils/lesson/exec-list';
import { ProFormText } from '@ant-design/pro-components/es';
import { LessonCategoryEnum } from '@/utils/enums';
import { handleFinishPrivateLessonArrange } from '@/utils/lesson/lesson-arrange/private-lesson-arrange';

type FinishLessonArrangeProps = TypeUtil.ModalBaseProps & {
  classId: string;
  teacherId: string;
  planId: string;
  category: LessonCategoryEnum;
};

const FinishLessonArrange: FC<FinishLessonArrangeProps> = (props) => {
  const { visible, setVisible, refresh, classId, teacherId, planId, category } = props;

  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      onCancel={() => {
        setVisible(false);
      }}
      destroyOnClose={true}
      onOk={async () => {
        await form?.submit();
      }}
      title={'结束课程'}
      width={600}
    >
      <ProForm
        form={form}
        layout={'horizontal'}
        labelCol={{ span: 4 }}
        labelAlign={'right'}
        initialValues={{
          type: '4',
          classId,
          teacherId,
          planId,
        }}
        submitter={false}
        onFinish={async (values) => {
          const result =
            category === LessonCategoryEnum.PRIVATE_LESSON
              ? await handleFinishPrivateLessonArrange(values)
              : await handleSaveExecRecord(values);

          if (result) {
            setVisible(false);
            form.resetFields();
            refresh?.();
          }
        }}
      >
        <ProFormText name={'id'} hidden />

        <ProFormText name={'classId'} hidden />

        <ProFormText name={'teacherId'} hidden />

        <ProFormText name={'planId'} hidden />

        <ProFormDigit width={'md'} name={'realityNum'} label={'签到人数'} rules={[basicRule]} />

        <ProFormTextArea
          name={'memo'}
          label={'备注'}
          fieldProps={{
            maxLength: 200,
            showCount: true,
          }}
        />
      </ProForm>
    </Modal>
  );
};

export { FinishLessonArrange };
