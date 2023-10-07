import {
  ProFormDependency,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import {
  basicRule,
  email_RegExp,
  IDCard_RegExp,
  phone_RegExp,
  pictureStrToUploadFile,
  sexOptions,
} from '@/utils/utils';
import { handleSearchUserInfoByPhoneNo } from '@/utils/member/member/member';
import { MemberUser } from '../../../../../../../types/member/member/member';
import { nations } from '@/utils/nation';

const MemberInfo = () => {
  const form = Form.useFormInstance();

  return (
    <>
      <div className={'step-one'}>
        <div className={'right'}>
          <ProFormText name={'id'} hidden />

          <ProFormText
            name="name"
            label="姓名"
            width="md"
            placeholder="请输入名称"
            rules={[{ required: true }]}
          />

          <ProFormGroup>
            <ProFormText
              name="phoneNo"
              label="手机号"
              width="md"
              placeholder="请输入手机号"
              rules={[basicRule, { pattern: phone_RegExp, message: '请输入正确的手机号' }]}
            />
            <ProFormDependency name={['phoneNo']}>
              {({ phoneNo }) => {
                return (
                  <Form.Item label={' '}>
                    <Button
                      onClick={async () => {
                        const result = await handleSearchUserInfoByPhoneNo(phoneNo);

                        if (result.success && result.data) {
                          const resultData = result.data as MemberUser.MemberUserListItem;

                          if (resultData?.avatarUrl) {
                            Object.assign(resultData, {
                              avatarUrl: pictureStrToUploadFile(resultData.avatarUrl as string),
                            });
                          } else {
                            Object.assign(resultData, {
                              avatarUrl: [],
                            });
                          }

                          form.setFieldsValue(result.data);
                        }
                      }}
                    >
                      信息查询
                    </Button>
                  </Form.Item>
                );
              }}
            </ProFormDependency>
          </ProFormGroup>

          <ProFormText
            name="idCard"
            label="身份证号"
            width="md"
            placeholder="请输入身份证号"
            rules={[{ pattern: IDCard_RegExp, message: '请输入正确的身份证号' }]}
          />

          <ProFormGroup key={'sex'}>
            <ProFormSelect name="sex" label="性别" width="md" options={sexOptions} />{' '}
            <ProFormSelect
              name={'nation'}
              options={nations}
              fieldProps={{
                showSearch: true,
                optionFilterProp: 'value',
                filterOption: (input, option) => {
                  return (option?.label?.toString() ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase());
                },
              }}
              placeholder={'请输入民族'}
              label={'会员民族'}
            />
          </ProFormGroup>
          <ProFormText
            name="email"
            label="邮箱"
            width="md"
            placeholder="请输入邮箱"
            rules={[{ pattern: email_RegExp, message: '请输入正确的邮箱号' }]}
          />

          <ProFormText name={'address'} label={'家庭住址'} />

          <ProFormGroup key={'matrimony'}>
            <ProFormText
              width="md"
              name={'matrimony'}
              placeholder={'请输入婚姻状况'}
              label={'婚姻状况'}
            />
            <ProFormText
              width="md"
              name={'educationBackground'}
              placeholder={'请输入学历'}
              label={'学历'}
            />
          </ProFormGroup>

          <ProFormText
            width="md"
            name={'graduateSchool'}
            placeholder={'请输入毕业院校'}
            label={'毕业院校'}
          />

          <ProFormText name={'memo'} label={'备注'} width={'md'} />

          <ProFormText name={'status'} hidden />
        </div>
      </div>
    </>
  );
};

export default MemberInfo;
