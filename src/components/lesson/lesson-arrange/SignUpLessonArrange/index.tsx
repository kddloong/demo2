import { Button, Form, Modal } from 'antd';
import { TypeUtil } from '../../../../../types/utils';
import { FC } from 'react';
import {
  ProForm,
  ProFormDependency,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { handleGetMemberInfoByParams } from '@/utils/member/member/member';
import { history } from '@umijs/max';
import { handleSaveClassSignUpPerson } from '@/utils/lesson/lesson-arrange/group-lesson-arrange';
import { sexOptions } from '@/utils/utils';
import '@/styles/form/styles.css';
import { handleFetchPayTypeFromDictionary } from '@/utils/pay/pay';
import { cashPayLessonSignUp } from '@/utils/lesson/pay/lessonSignUpUtils';
import {
  handleAppointLesson,
  handleFetchComboListByPhoneNo,
} from '@/utils/lesson/combo/combo-order';

type SignUpLessonArrangeProps = TypeUtil.ModalBaseProps & {
  arrangeId: string;
  lessonId: string;
};

const SignUpLessonArrange: FC<SignUpLessonArrangeProps> = (props) => {
  const { visible, setVisible, refresh, arrangeId, lessonId } = props;

  const [form] = Form.useForm();

  async function fetchMemberInfoByPhoneNo(phoneNo: string) {
    return await handleGetMemberInfoByParams(phoneNo, true);
  }

  async function fetch() {
    const phoneNo = form.getFieldValue('phoneNo');

    const result = await fetchMemberInfoByPhoneNo(phoneNo);

    if (result.success) {
      if (!result?.data) {
        Modal.confirm({
          title: '获取用户信息失败',
          content: '根据该手机号未获取到用户信息， 是否新增该会员?',
          onOk: () => {
            history.push(`/member/member/add-user-info?type=add&phoneNo=${phoneNo}&source=lesson`);
          },
        });
      } else {
        const resultData = result.data;
        form.setFieldsValue({
          name: resultData.name,
          gender: resultData.sex,
          memberId: resultData.id,
        });
      }
    }
  }

  return (
    <>
      <Modal
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        destroyOnClose={true}
        width={800}
        onOk={async () => {
          await form.submit();
        }}
        title={'课程报名'}
      >
        <ProForm
          className={'base-form-80'}
          submitter={false}
          form={form}
          layout={'horizontal'}
          labelAlign={'left'}
          initialValues={{
            planId: arrangeId,
          }}
          onFinish={async (values) => {
            const payType = values.payType;

            if (payType === '999') {
              // 使用套餐约课
              const result = await handleAppointLesson({
                comboId: values.comboId,
                num: 1,
                phoneNo: values.phoneNo,
                classPlanId: values.planId,
                classId: lessonId,
                memberId: values.memberId,
              });
              if (result.success) {
                refresh();
                setVisible(false);
              }
            } else {
              // 非套餐报名
              const result = await handleSaveClassSignUpPerson(values);

              if (result.success) {
                await cashPayLessonSignUp(result.data.id, () => {
                  refresh();
                  setVisible(false);
                });
              }
            }
          }}
        >
          <ProFormText name={'id'} hidden />
          <ProFormText name={'planId'} hidden />

          <ProFormGroup>
            <ProFormText name={'phoneNo'} label={'手机号'} placeholder={'请输入手机号'} />{' '}
            <Button
              onClick={async () => {
                await fetch();
              }}
            >
              查询
            </Button>
          </ProFormGroup>

          <ProFormText name={'memberId'} hidden />

          <ProFormText name={'name'} label={'姓名'} disabled width={'sm'} />

          <ProFormRadio.Group name={'gender'} label={'性别'} disabled options={sexOptions} />

          <ProFormRadio.Group
            name={'payType'}
            label={'支付方式'}
            request={async () => {
              const result = await handleFetchPayTypeFromDictionary();

              return [...result.data, { label: '套餐支付', value: '999' }];
            }}
          />

          <ProFormDependency name={['payType', 'phoneNo']}>
            {({ payType, phoneNo }) => {
              if (payType === '999') {
                return (
                  <>
                    <ProFormSelect
                      name={'comboId'}
                      label={'选择套餐'}
                      width={'sm'}
                      params={{ phoneNo }}
                      request={async (params) => {
                        const result = await handleFetchComboListByPhoneNo(params.phoneNo);

                        return result.data;
                      }}
                    />
                  </>
                );
              }

              return null;
            }}
          </ProFormDependency>
        </ProForm>
      </Modal>
    </>
  );
};

export { SignUpLessonArrange };
