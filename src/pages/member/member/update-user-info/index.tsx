import { ProCard, ProForm } from '@ant-design/pro-components';
import { history, useSearchParams } from '@umijs/max';
import { Form, message } from 'antd';
import { MyPageHeader } from '@/components/MyPageHeader';
import { useEffect } from 'react';
import { handleFetchIsNeedUploadFace, handleSaveMemberUser } from '@/utils/member/invest/invest';
import { handleUpdateFace } from '@/utils/member/member/member';
import { MemberUser } from 'types/member/member/member';
import { useMemberUserInfo } from '@/hooks/member/useMemberUserInfo';
import { MyPageContainer } from '@/components/card/MyPageContainer';
import MemberInfo from '@/pages/member/invest/apply-for-member-card/components/MemberInfo';

/**
 * 单独修改会员信息
 * @constructor
 */
const UpdateUserInfo = () => {
  const [searchParams] = useSearchParams();

  const memberId = searchParams.get('memberId');

  const userInfo = useMemberUserInfo(memberId as string, 'edit');

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(userInfo);
  }, [userInfo]);

  return (
    <>
      <MyPageHeader />

      <ProCard>
        <MyPageContainer>
          <ProForm<MemberUser.SaveMemberUserInfo>
            onFinish={async (values) => {
              /**
               * 如果有头像信息就不提示操作成功
               * */
              const result = await handleSaveMemberUser(values, !!values.avatarUrl);

              if (result.success) {
                if (values.avatarUrl) {
                  // 判断当前账号是否配置了人脸设备
                  const isNeedResult = await handleFetchIsNeedUploadFace();

                  // https://e.gitee.com/jsyunchao/issues/table?issue=I6A49G
                  if (isNeedResult.success && isNeedResult.data && values.isIssue !== '0') {
                    const updateFaceResult = await handleUpdateFace({
                      cardNo: values.cardNo,
                      memberId: values.id,
                      imageUrl: values.avatarUrl as string,
                    });

                    if (updateFaceResult.success) {
                      history.back();
                    }
                  } else {
                    message.success('操作成功');
                    history.back();
                  }
                } else {
                  message.success('操作成功');
                  history.back();
                }
              }
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

export default UpdateUserInfo;
