import { basicRule, phone_RegExp, POSITIVE_STATUS, sexOptions } from '@/utils/utils';
import { ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { Form, Modal } from 'antd';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { SettleOrderForLessonSignUp } from '@/components/lesson/SettleOrderForLessonSignUp';
import { LimitDigitRange } from '@/components/form/LimitDigitRange';
import { LessonArrange } from 'types/lesson/lesson-arrange';
import { printReceipt } from '@/utils/device/receipt/print';
import { handleSaveClassSignUpPerson } from '@/utils/lesson/lesson-arrange/group-lesson-arrange';
import { useLessonInfoById } from '@/hooks/lesson/useLessonInfoById';
import { sexEnum } from '@/utils/enums';
import { fetchLessonSignUpReceiptDetail } from '@/utils/device/receipt/printFunc';

interface AddClassSignUpInfoProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  planId: string;
  refreshTable: () => void;
  price: number;
  memPrice: number;
  //课程id
  classId: string;
}

const AddClassSignUpInfo: FC<AddClassSignUpInfoProps> = (props) => {
  const { visible, setVisible, planId, refreshTable, classId } = props;

  const { price, memPrice } = props;

  const [form] = Form.useForm();

  const [payVisible, setPayVisible] = useState(false);

  const lessonSignUpInfo = useLessonInfoById(classId);

  const [baseInfo, setBaseInfo] = useState({
    classname: '',
    planId: '',
    name: '',
    phoneNo: '',
    gender: '',
    signUpNo: '',
    className: '',
    teacherId: '',
  });
  useEffect(() => {
    if (lessonSignUpInfo?.genderLimit !== '-1') {
      form.setFieldsValue({
        gender: lessonSignUpInfo?.genderLimit,
      });
    }
  }, [lessonSignUpInfo]);
  const doSignUp = async (values: LessonArrange.SignUpPersonItem) => {
    await form.validateFields();

    if (price > 0) {
      setBaseInfo(values);
      setPayVisible(true);
    } else {
      const result = await handleSaveClassSignUpPerson(values);

      if (result.success) {
        setVisible(false);

        const receiptModel = await fetchLessonSignUpReceiptDetail(result.data?.id);

        if (receiptModel) {
          printReceipt(receiptModel);
        }

        refreshTable();
      }
    }
  };

  return (
    <>
      <Modal
        open={visible}
        title={'课程报名'}
        onOk={async () => {
          await form.submit();
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <ProForm
          initialValues={{
            planId: planId,
          }}
          submitter={false}
          onFinish={async (values) => {
            await doSignUp(values);
          }}
          form={form}
        >
          <ProFormText name={'planId'} hidden />

          <ProFormText
            name={'name'}
            label={'姓名'}
            placeholder={'请输入姓名'}
            rules={[basicRule]}
          />

          <ProFormRadio.Group
            name={'gender'}
            label={'性别'}
            disabled={lessonSignUpInfo?.genderLimit !== sexEnum.NO_LIMIT}
            options={sexOptions}
          />

          <ProFormText
            name={'phoneNo'}
            label={'手机号'}
            rules={[basicRule, { pattern: phone_RegExp, message: '请输入正确的手机号' }]}
          />

          {lessonSignUpInfo?.isLimitAge === POSITIVE_STATUS && (
            <LimitDigitRange
              name={'age'}
              min={lessonSignUpInfo.minAge}
              max={lessonSignUpInfo?.maxAge}
              label={'年龄'}
            />
          )}
        </ProForm>
      </Modal>

      {payVisible && (
        <SettleOrderForLessonSignUp
          info={baseInfo}
          visible={payVisible}
          setVisible={setPayVisible}
          refreshTable={() => {
            refreshTable?.();
            setVisible(false);
          }}
          price={price}
          memberPrice={memPrice}
          classId={classId}
        />
      )}
    </>
  );
};

export { AddClassSignUpInfo };
