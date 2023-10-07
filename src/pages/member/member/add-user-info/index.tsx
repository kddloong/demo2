import { ProCard, ProForm } from '@ant-design/pro-components';
import { history, useSearchParams } from '@umijs/max';
import { Form } from 'antd';
import { MyPageHeader } from '@/components/MyPageHeader';
import React from 'react';
import { MemberUser } from '../../../../../types/member/member/member';
import { MyPageContainer } from '@/components/card/MyPageContainer';
import MemberInfo from '@/pages/member/invest/apply-for-member-card/components/MemberInfo';
import { handleSaveMemberUser } from '@/utils/member/invest/invest';

/**
 * 单独修改会员信息
 * @constructor
 */
const AddUserInfo = () => {
  const [searchParams] = useSearchParams();

  const phoneNo = searchParams.get('phoneNo') ?? '';

  const [form] = Form.useForm();

  return (
    <>
      <MyPageHeader />

      <ProCard>
        <MyPageContainer>
          <ProForm<MemberUser.SaveMemberInfoParams>
            onFinish={async (values) => {
              /**
               * 如果有头像信息就不提示操作成功
               * */
              const result = await handleSaveMemberUser(values);

              if (result.success) {
                history.back();
              }
            }}
            initialValues={{
              status: '1',
              phoneNo,
            }}
            form={form}
          >
            <MemberInfo />
          </ProForm>
        </MyPageContainer>
      </ProCard>
    </>
  );
};

export default AddUserInfo;
