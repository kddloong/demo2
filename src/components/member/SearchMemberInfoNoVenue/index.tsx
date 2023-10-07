import { ProForm, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import { Button, Form, Space } from 'antd';
import type { FC } from 'react';
import { useModel } from '@umijs/max';
import { handleGetMemberInfoByParams } from '@/utils/member/member/member';
import { SearchMemberInfoNoVenueProps } from '@/components/member/SearchMemberInfoNoVenue/props';
import { CardReader } from '../../../../types/device/encrypted-card/card-setting';
import { TypeUtil } from 'types/utils';
import { handleReadEncryptedCardNo } from '@/utils/entity-card/entity-card';

/**
 * 根据手机号,会员卡号搜索会员信息(不需要场馆)
 * @param props
 * @constructor
 * @version 0.0.2 修改了 horizontal | vertical 两种布局下的显示
 */
const SearchMemberInfoNoVenue: FC<SearchMemberInfoNoVenueProps> = (props) => {
  const { formName = 'phoneNo', wrapLayout, callback } = props;

  const searchForm = Form.useFormInstance();

  const { card } = useModel('readcard');

  async function handleClick() {
    const phoneNo = searchForm.getFieldValue(formName);

    const result = await handleGetMemberInfoByParams(phoneNo);

    if (result.success && result?.data && 'id' in result?.data) {
      callback(result?.data);
    }
  }

  return (
    <ProForm layout={'horizontal'} submitter={false} form={searchForm}>
      {wrapLayout === 'horizontal' ? (
        <>
          <ProFormGroup>
            <ProFormText label={'会员信息'} name={formName} />

            <Form.Item label={' '}>
              <Space>
                <Button
                  type={'primary'}
                  onClick={async () => {
                    await handleClick();
                  }}
                >
                  查询
                </Button>
                <Button
                  onClick={async () => {
                    const result = (await handleReadEncryptedCardNo(
                      card as CardReader.CardReaderSetting,
                    )) as TypeUtil.RequestResult<string>;

                    if (result.success) {
                      const no = result.data;

                      searchForm.setFieldsValue({ [formName]: no });

                      await handleClick();
                    }
                  }}
                >
                  读卡
                </Button>
              </Space>
            </Form.Item>
          </ProFormGroup>
        </>
      ) : (
        <>
          <ProFormGroup>
            <ProFormText label={'会员信息'} name={formName} />
            <Form.Item label={' '} colon={false}>
              <Space>
                <Button
                  type={'primary'}
                  onClick={async () => {
                    await handleClick();
                  }}
                >
                  查询
                </Button>
                <Button
                  onClick={async () => {
                    const result = (await handleReadEncryptedCardNo(
                      card as CardReader.CardReaderSetting,
                    )) as TypeUtil.RequestResult<string>;

                    if (result.success) {
                      const no = result.data;

                      searchForm.setFieldsValue({ [formName]: no });

                      await handleClick();
                    }
                  }}
                >
                  读卡
                </Button>
              </Space>
            </Form.Item>
          </ProFormGroup>
        </>
      )}
    </ProForm>
  );
};

export { SearchMemberInfoNoVenue };
