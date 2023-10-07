import { MemberSettingCharge } from './components/charge';
import { MemberSettingNumber } from './components/number';
import { MemberSettingTime } from './components/time';
import {
  handleFetchOperateAndShop,
  handleMemberSettingInfoById,
  handleSaveMemberSetting,
  memberTypeObj,
} from '@/utils/member/setting/setting';
import {
  avatarImage,
  basicRule,
  genOptionsFromObj,
  handleImageArr,
  NEGATIVE_STATUS,
  POSITIVE_STATUS,
  stringToCheckBox,
} from '@/utils/utils';
import {
  ProCard,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useModel, useSearchParams } from '@umijs/max';
import { useAsyncEffect } from 'ahooks';
import { Button, Form } from 'antd';
import { CirclePicker } from 'react-color';
import { MyPageHeader } from '@/components/MyPageHeader';
import { printContent } from '@/utils/device/receipt/print';
import { MyPageContainer } from '@/components/card/MyPageContainer';
import { addMemberClassnames } from '@/pages/member/add-member-setting/styles';
import { UploadSingleImage } from '@/components/form/UploadSingleImage';
import { UploadFile } from 'antd/es/upload/interface';
import { handleFetchContractModeSelect } from '@/utils/setting/base-setting/contract';

const backgroundColorTypeOptions = [
  {
    label: '无',
    value: NEGATIVE_STATUS,
  },
  {
    label: '纯色',
    value: POSITIVE_STATUS,
  },
  {
    label: '自定义图片',
    value: '2',
  },
];

const AddMemberSetting = () => {
  const { styles } = addMemberClassnames();

  const [form] = Form.useForm();

  const [searchParams] = useSearchParams();

  const settingId = searchParams.get('id') as string;

  const type = searchParams.get('type') as string;

  useAsyncEffect(async () => {
    if (settingId) {
      const result = (await handleMemberSettingInfoById(
        settingId,
      )) as MemberCardConfigSetting.SettingItem;

      form.setFieldsValue({
        ...result,
        venueIds: stringToCheckBox(result?.venueIds),
        useType: stringToCheckBox(result?.useType),
        backgroundImage: avatarImage(result?.backgroundImage),
      });
    }
  }, [settingId]);

  const { initialState } = useModel('@@initialState');
  return (
    <>
      <MyPageHeader />

      <ProCard>
        <MyPageContainer minWidth={800} maxWidth={800}>
          <ProForm<MemberCardConfigSetting.SaveSettingItem & { backgroundImage: UploadFile[] }>
            onFinish={async (values) => {
              const backgroundColor = form.getFieldValue('backgroundColor');

              if (values.venueIds) {
                Object.assign(values, {
                  venueIds: (values.venueIds as string[])?.join(',') || '',
                });
              }

              if (values.useType) {
                Object.assign(values, {
                  useType: (values.useType as string[])?.join(',') || '',
                });
              }

              if (values?.backgroundType === POSITIVE_STATUS) {
                Object.assign(values, {
                  backgroundColor,
                });
              }

              if (values?.backgroundType === '2') {
                Object.assign(values, {
                  backgroundImage: handleImageArr(values?.backgroundImage as UploadFile[]),
                });
              }

              //储值卡
              if (values.type === '0') {
                if ('chargeDetails' in values) {
                  const result = values.chargeDetails?.map((item) => {
                    if (values.isChargeDiscount === '0') {
                      Object.assign(item, {
                        amountGive: 0,
                      });
                    }

                    if (values.isConsumeDisCount === '0') {
                      Object.assign(item, {
                        sales: 0,
                      });
                    }

                    return item;
                  });

                  Object.assign(values, {
                    chargeDetails: result,
                  });
                }
              }

              Object.assign(values, {
                agree: values?.agree || '',
              });

              const result = await handleSaveMemberSetting(values);

              if (result) {
                history.back();
              }
            }}
            submitter={{
              render: (submitProps) => {
                return [
                  <Button
                    type="primary"
                    key="submit"
                    onClick={() => {
                      submitProps.form?.submit?.();
                    }}
                  >
                    保存
                  </Button>,
                  <Button
                    key={'print'}
                    onClick={async () => {
                      const pData = form.getFieldValue('agree');
                      printContent(pData);
                    }}
                  >
                    打印协议
                  </Button>,
                ];
              },
            }}
            initialValues={{
              useType: ['0'],
              type: '0',
              isConsumeDisCount: '0',
              isLevel: '0',
              isChargeDiscount: '0',
              chargeDetails: [{ amount: 0 }],
              times: [{ amount: 0 }],
              numbers: [{ amount: 0 }],
              backgroundType: NEGATIVE_STATUS,
              backgroundImage: [],
            }}
            labelCol={{ span: 24 }}
            form={form}
          >
            <ProFormText name={'id'} hidden />

            <ProFormText name={'memConfigId'} hidden />

            <ProFormGroup>
              <ProFormText
                name={'name'}
                fieldProps={{
                  maxLength: 7,
                  showCount: true,
                }}
                rules={[basicRule]}
                label={'会员卡名称'}
                placeholder={'名称不超过7个字'}
              />
            </ProFormGroup>

            <ProFormRadio.Group
              disabled={type === 'edit'}
              name={'type'}
              rules={[{ ...basicRule, message: '请选择会员卡类型' }]}
              label={'会员卡类型'}
              options={genOptionsFromObj(memberTypeObj)}
            />

            <ProFormCheckbox.Group
              name={'venueIds'}
              label={'适用项目'}
              rules={[{ ...basicRule, message: '请选择适用项目' }]}
              request={async () => {
                return await handleFetchOperateAndShop(
                  initialState?.currentUser?.tenantId as string,
                );
              }}
            />

            <ProFormRadio.Group
              name={'backgroundType'}
              label={'背景颜色'}
              options={backgroundColorTypeOptions}
            />

            <ProFormDependency name={['backgroundType']}>
              {({ backgroundType }) => {
                if (backgroundType === POSITIVE_STATUS) {
                  return (
                    <ProFormDependency rules={[basicRule]} name={['backgroundColor']}>
                      {({ backgroundColor }) => {
                        return (
                          <CirclePicker
                            className={styles['background-color-form']}
                            color={backgroundColor}
                            onChange={(color: any) => {
                              form.setFieldsValue({
                                backgroundColor: color?.hex,
                              });
                            }}
                          />
                        );
                      }}
                    </ProFormDependency>
                  );
                }

                if (backgroundType === '2') {
                  return <UploadSingleImage name={'backgroundImage'} label={''} disabled={false} />;
                }
                return null;
              }}
            </ProFormDependency>

            <ProFormDependency name={['type']}>
              {({ type: settingType }) => {
                if (settingType === '0') {
                  return <MemberSettingCharge />;
                } else if (settingType === '1') {
                  return <MemberSettingTime />;
                } else if (settingType === '2') {
                  return <MemberSettingNumber />;
                } else {
                  return null;
                }
              }}
            </ProFormDependency>

            <ProFormSelect
              name={'agree'}
              label={'会员卡合同'}
              placeholder={'请选择使用的合同模板'}
              width={'md'}
              request={async () => {
                const result = await handleFetchContractModeSelect();

                return result.data;
              }}
            />

            <ProFormSelect
              name={'description'}
              label={'会员卡协议'}
              placeholder={'请选择使用的协议模板'}
              width={'md'}
              request={async () => {
                const result = await handleFetchContractModeSelect();

                return result.data;
              }}
            />
          </ProForm>
        </MyPageContainer>
      </ProCard>
    </>
  );
};

export default AddMemberSetting;
