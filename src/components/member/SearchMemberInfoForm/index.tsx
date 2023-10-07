import { ProForm, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import { Button, Form, Space } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import { Access, useModel } from '@umijs/max';
import { mainTypeObj } from '@/components/area-and-ticket/SearchMemberCardForPayment/utils';
import { SearchMemberInfoFormProps } from '@/components/member/SearchMemberInfoForm/props';
import {
  handleFetchInvestCardInfoByPhoneNoAndVenueIdNew,
  handleGetMemberInfoByParams,
} from '@/utils/member/member/member';
import { MemberUserInfo } from 'types/member/member/user-info';
import { WS_CARD_READ_ENCODER } from '@/utils/websocket/constant';

/**
 * 在使用会员卡支付的时候 获取会员信息
 * @param props
 * @constructor
 * @version 0.0.2 修改了 horizontal | vertical 两种布局下的显示
 */
const SearchMemberInfoForm: FC<SearchMemberInfoFormProps> = (props) => {
  const {
    venueId,
    callback,
    formName = 'phoneNo',
    wrapLayout,
    sourceType,
    searchMemberAuth = true,
    readCardAuth = true,
  } = props;

  const searchForm = Form.useFormInstance();

  const { sendMessage, responseData } = useModel('websocket');

  useEffect(() => {
    const [success, , data] = responseData;

    if (success) {
      searchForm.setFieldsValue({
        [formName]: data,
      });
    }
  }, [responseData]);

  async function handleClick() {
    const phoneNo = searchForm.getFieldValue(formName);

    const memberInfoResult = await handleGetMemberInfoByParams(phoneNo);

    const result = await handleFetchInvestCardInfoByPhoneNoAndVenueIdNew({
      param: phoneNo,
      venueId,
      type: sourceType ? mainTypeObj[sourceType] : '',
    });

    if (memberInfoResult.success) {
      const memberInfoData = memberInfoResult.data;

      searchForm.setFieldsValue({
        memberId: memberInfoData?.id,
        // 不知道问什么memberId复制不上去， 所以用memId替代
        memId: memberInfoData?.id,
        contact: memberInfoData?.name,
        phoneNo: memberInfoData?.phoneNo,
      });
    }

    if (result.success) {
      const resultData = result.data as unknown as MemberUserInfo.MemberCardListItem[];

      callback(resultData);
    }
  }

  return (
    <ProForm layout={'horizontal'} submitter={false} form={searchForm}>
      {wrapLayout === 'horizontal' ? (
        <>
          <ProFormGroup>
            <ProFormText
              label={'会员信息'}
              name={formName}
              placeholder={'请点击读卡或输入手机号'}
            />

            <Access key={'member-auth'} accessible={searchMemberAuth}>
              <Button
                type={'primary'}
                onClick={async () => {
                  await handleClick();
                }}
              >
                查询
              </Button>
            </Access>

            <Access key={'read-card-auth'} accessible={readCardAuth}>
              <Button
                onClick={async () => {
                  sendMessage(WS_CARD_READ_ENCODER);
                }}
              >
                读卡
              </Button>
            </Access>
          </ProFormGroup>
        </>
      ) : (
        <>
          <ProFormGroup>
            <ProFormText label={'会员信息'} name={formName} />
            <Form.Item label={' '} colon={false}>
              <Space>
                <Access key={'search-member-auth'} accessible={searchMemberAuth}>
                  <Button
                    type={'primary'}
                    onClick={async () => {
                      await handleClick();
                    }}
                  >
                    查询
                  </Button>
                </Access>
                <Access key={'read-card-1-auth'} accessible={readCardAuth}>
                  <Button
                    onClick={async () => {
                      sendMessage(WS_CARD_READ_ENCODER);
                    }}
                  >
                    读卡
                  </Button>
                </Access>
              </Space>
            </Form.Item>
          </ProFormGroup>
        </>
      )}
    </ProForm>
  );
};

export { SearchMemberInfoForm };
