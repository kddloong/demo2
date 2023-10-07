import { selectDataType } from '@/utils/constant';
import {
  avatarImage,
  basicRule,
  beforeUploadOnlyFile,
  FREE_PRICE,
  genOptionsFromObj,
  handleImageArr,
  POSITIVE_STATUS,
  priceTypeOptions,
  sexOptions,
  stringToCheckBox,
  trueFalseOptions,
  valueMinZeroRule,
} from '@/utils/utils';
import { history, useSearchParams } from '@umijs/max';
import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import { Button, Card, Form } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { MyRichText } from '@/components/MyRichText';
import { MyPageHeader } from '@/components/MyPageHeader';
import { TwoInputRange } from '@/components/form/TwoInputRange';
import { handleVenueForParentId } from '@/utils/setting/manage/venue-setting';
import { handleTeacherSelectData } from '@/utils/lesson/teacher/tercher-list';
import {
  bannerImageSuggestion,
  handleAddLesson,
  handleLessonDataById2,
} from '@/utils/lesson/lesson-list';
import { handleLessonTargetPersonSelectData } from '@/utils/lesson/base/target-person';
import { UploadSingleImage } from '@/components/form/UploadSingleImage';
import { handleTrainLessonTypeSelectData } from '@/utils/lesson/base/lesson-type';
import { UploadMultipleImage } from '@/components/form/UploadMultipleImage';
import { FC } from 'react';
import { MyPageContainer } from '@/components/card/MyPageContainer';
import { LessonCategoryEnum } from '@/utils/enums';

interface LessonFormProps {
  category: '0' | '1' | '2';
}

const LessonForm: FC<LessonFormProps> = (props) => {
  const { category } = props;

  console.log(`category`, category);

  const [searchParams] = useSearchParams();

  const lessonId = searchParams.get('lessonId');

  const type = searchParams.get('type');

  const [form] = Form.useForm();

  useAsyncEffect(async () => {
    if (type !== 'add') {
      const result = await handleLessonDataById2(lessonId as string);

      const data = result?.data;

      const teacherId = stringToCheckBox(data?.teacherId);

      if (data?.imageUrls as string) {
        if (typeof data?.imageUrls === 'string') {
          const images = stringToCheckBox(data?.imageUrls);

          Object.assign(data, {
            imageUrls: (images as string[]).map((item, index) => {
              return {
                src: item,
                uid: index.toString(),
                url: item,
                done: 'status',
                name: index.toString(),
              };
            }),
          });
        }
      } else {
        Object.assign(data, { imageUrls: [] });
      }

      if (data?.bannerImageUrl) {
        if (typeof data?.bannerImageUrl === 'string') {
          const bannerImage = stringToCheckBox(data?.bannerImageUrl);

          Object.assign(data, {
            bannerImageUrl: (bannerImage as string[]).map((item, index) => {
              return {
                src: item,
                uid: index.toString(),
                url: item,
                done: 'status',
                name: index.toString(),
              };
            }),
          });
        }
      } else {
        Object.assign(data, { bannerImageUrl: [] });
      }

      Object.assign(data, { contract: avatarImage(data?.contract) });

      form.setFieldsValue({ ...data, teacherId });
    }
  }, []);

  return (
    <>
      <MyPageHeader />
      <Card bordered={false}>
        <MyPageContainer minWidth={800} maxWidth={800}>
          <ProForm
            style={{ marginTop: 8, maxWidth: 800 }}
            name="basic"
            form={form}
            submitter={{
              render: (props, doms) => {
                return [
                  doms[1],
                  <Button key={'back'} onClick={() => history.back()}>
                    返回
                  </Button>,
                ];
              },
            }}
            disabled={type === 'show'}
            layout="vertical"
            initialValues={{
              status: '1',
              sort: '',
              isFree: '0',
              isLimitAge: '0',
              priceType: '0',
              price: 0,
              genderLimit: '-1',
              category,
              isSupportCombo: category === LessonCategoryEnum.PRIVATE_LESSON ? POSITIVE_STATUS : '',
            }}
            onFinish={async (values) => {
              const imageUrls = (values.imageUrls as UploadFile[])
                ?.map((item) => item.url)
                .join(',');

              const bannerImageUrl = (values.bannerImageUrl as UploadFile[])
                ?.map((item) => item.url)
                .join(',');

              const contract = handleImageArr(values.contract);

              const teacherId = values.teacherId.join(',');

              Object.assign(values, { imageUrls, bannerImageUrl, contract, teacherId });

              const result = await handleAddLesson(values);

              if (result) {
                form.resetFields();
                history.back();
              }
            }}
          >
            <ProFormText name={'id'} hidden />

            <ProFormText name={'category'} hidden />

            <ProFormText
              name="name"
              label="课程名称"
              width={'md'}
              placeholder={'请输入课程名称'}
              rules={[
                {
                  required: true,
                  message: '请输入课程名称',
                },
              ]}
            />

            <ProFormSelect
              name={'venueId'}
              width={'md'}
              placeholder={'请选择课程所属场馆'}
              rules={[{ ...basicRule, message: '请选择场馆' }]}
              label={'所属场馆(门店)'}
              request={async () => {
                return await handleVenueForParentId();
              }}
              fieldProps={{
                onChange: () => {
                  form.setFieldsValue({
                    teacherId: [],
                  });
                },
              }}
            />

            <ProFormText name={'status'} hidden />

            <ProFormDependency name={['venueId']}>
              {({ venueId }) => {
                return (
                  <ProFormSelect
                    name="teacherId"
                    label="课程老师"
                    width={'md'}
                    fieldProps={{
                      mode: 'multiple',
                    }}
                    params={venueId}
                    rules={[
                      {
                        required: true,
                        message: '请选择私教老师',
                      },
                    ]}
                    request={async () => {
                      return await handleTeacherSelectData({
                        type: selectDataType.NORMAL_DATA,
                        venueId,
                      });
                    }}
                  />
                );
              }}
            </ProFormDependency>

            <ProFormSelect
              name={'targetPersonId'}
              label={'课程适用人群'}
              width={'md'}
              rules={[
                {
                  required: true,
                  message: '请选择课程适用人群',
                },
              ]}
              request={async () => {
                return await handleLessonTargetPersonSelectData(selectDataType.NORMAL_DATA);
              }}
            />

            <ProFormTreeSelect
              name="typeId"
              label="课程类型"
              width={'md'}
              rules={[
                {
                  required: true,
                  message: '请选择课程类型',
                },
              ]}
              request={async () => {
                const result = await handleTrainLessonTypeSelectData();
                return result.data;
              }}
            />

            <ProFormRadio.Group
              name={'isMem'}
              label={'是否仅限会员购买'}
              options={genOptionsFromObj(trueFalseOptions('是', '否'))}
              rules={[basicRule]}
            />

            <ProFormRadio.Group
              name={'isSupportCombo'}
              rules={[basicRule]}
              hidden={category === LessonCategoryEnum.GROUP_LESSON}
              label={'是否支持套餐购买'}
              options={genOptionsFromObj(trueFalseOptions('是', '否'))}
            />

            <ProFormGroup>
              <ProFormRadio.Group
                name={'priceType'}
                rules={[basicRule]}
                label={'是否收费'}
                options={priceTypeOptions}
              />
              <ProFormDependency name={['priceType']}>
                {({ priceType }) => {
                  if (priceType !== FREE_PRICE) {
                    return (
                      <ProFormGroup>
                        <ProFormDigit
                          name={'price'}
                          rules={[basicRule]}
                          label={'原价'}
                          min={0.01}
                        />
                        <ProFormDigit
                          name={'memPrice'}
                          rules={[basicRule]}
                          label={'实价'}
                          min={0.01}
                        />
                      </ProFormGroup>
                    );
                  }
                  return null;
                }}
              </ProFormDependency>
            </ProFormGroup>

            <ProFormGroup>
              <ProFormRadio.Group
                name={'genderLimit'}
                label={'性别限制'}
                rules={[basicRule]}
                options={[
                  {
                    label: '不限制',
                    value: '-1',
                  },
                  ...sexOptions,
                ]}
              />
            </ProFormGroup>

            <ProFormGroup>
              <ProFormRadio.Group
                rules={[basicRule]}
                name={'isLimitAge'}
                label={'是否限制年龄'}
                options={genOptionsFromObj(trueFalseOptions('限制', '不限制'))}
              />

              <ProFormDependency name={['isLimitAge']}>
                {({ isLimitAge }) => {
                  if (isLimitAge === '1') {
                    return (
                      <TwoInputRange
                        type={'number'}
                        name={['minAge', 'maxAge']}
                        label={'年龄限制范围'}
                        message={'年龄限制'}
                        limitRange={[0, 150]}
                      />
                    );
                  }
                  return null;
                }}
              </ProFormDependency>
            </ProFormGroup>

            <UploadSingleImage
              showLayout={'horizontal'}
              name="bannerImageUrl"
              label="封面图"
              disabled={false}
              extra={bannerImageSuggestion()}
            />

            <UploadMultipleImage
              noRule={true}
              name={'imageUrls'}
              label={'课程图片(可上传最多5张图片)'}
              disabled={false}
              maxLength={5}
            />

            <ProFormDigit
              name={'peoples'}
              label={'可报名人数'}
              width={'md'}
              fieldProps={{
                precision: 0,
              }}
              max={10000}
              rules={[
                basicRule,
                valueMinZeroRule,
                {
                  validator(_: any, value: string) {
                    if (+value <= 10000) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('请输入小于等于10000的数!');
                    }
                  },
                },
              ]}
            />

            <ProFormDigit
              name={'timers'}
              label={'课程时长'}
              fieldProps={{
                precision: 0,
              }}
              rules={[basicRule]}
              width={'md'}
            />

            <UploadSingleImage
              name={'contract'}
              label={'课程合同'}
              disabled={false}
              type={'text'}
              beforeUpload={beforeUploadOnlyFile}
              extra={'请上传不大于10M的 docx 或 pdf 格式的文件'}
            />

            <Form.Item name={'description'} label={'课程描述'}>
              <MyRichText name={'description'} hideImage maxLength={1000} height={500} />
            </Form.Item>

            <ProFormText name={'memo'} label={'备注'} />
          </ProForm>
        </MyPageContainer>
      </Card>
    </>
  );
};
export { LessonForm };
