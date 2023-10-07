import { Col, Form, Row } from 'antd';
import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import {
  avatarImage,
  basicRule,
  beforeUploadOnlyFile,
  FREE_PRICE,
  genOptionsFromObj,
  handleImageArr,
  priceTypeOptions,
  sexOptions,
  stringToCheckBox,
  trueFalseOptions,
  valueMinZeroRule,
} from '@/utils/utils';
import React, { useContext, useEffect } from 'react';
import '../../styles.css';
import { formStyle } from '../../utils';
import { handleVenueForParentId } from '@/utils/setting/manage/venue-setting';
import { UploadMultipleImage } from '@/components/form/UploadMultipleImage';
import { handleTeacherSelectData } from '@/utils/lesson/teacher/tercher-list';
import { handleLessonTargetPersonSelectData } from '@/utils/lesson/base/target-person';
import { selectDataType } from '@/utils/constant';
import { handleTrainLessonTypeSelectData } from '@/utils/lesson/base/lesson-type';
import { UploadSingleImage } from '@/components/form/UploadSingleImage';
import { TwoInputRange } from '@/components/form/TwoInputRange';
import { handleAddLesson } from '@/utils/lesson/lesson-list';
import { Lesson } from '../../../../../../../types/lesson/lesson-list';
import { LessonContext } from '../..';
import { LessonCategoryEnum } from '@/utils/enums';

const LessonBaseInfo = () => {
  const { lessonInfo, refresh } = useContext(LessonContext);

  const [form] = Form.useForm();

  useEffect(() => {
    if (lessonInfo) {
      if (lessonInfo?.imageUrls) {
        if (typeof lessonInfo?.imageUrls === 'string') {
          const images = stringToCheckBox(lessonInfo?.imageUrls);

          Object.assign(lessonInfo, {
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
        Object.assign(lessonInfo, { imageUrls: [] });
      }

      if (lessonInfo?.contract) {
        if (typeof lessonInfo?.contract === 'string') {
          Object.assign(lessonInfo, {
            contract: avatarImage(lessonInfo.contract),
          });
        }
      } else {
        Object.assign(lessonInfo, { contract: [] });
      }

      Object.assign(lessonInfo, { teacherId: stringToCheckBox(lessonInfo.teacherId) });

      form.setFieldsValue({ ...lessonInfo });
    }
  }, [lessonInfo]);

  return (
    <>
      <ProForm<Lesson.LessonItem>
        style={formStyle}
        onFinish={async (values) => {
          const obj: Lesson.LessonItem = {
            ...values,
            imageUrls: handleImageArr(values?.imageUrls),
            contract: handleImageArr(values?.contract),
            teacherId: values?.teacherId.join(','),
          };

          const result = await handleAddLesson(obj);

          if (result) {
            refresh?.();
          }
        }}
        submitter={{
          render: (props, doms) => {
            return [doms[1]];
          },
        }}
        form={form}
      >
        <ProFormText name={'id'} hidden />

        <ProFormText name={'status'} hidden />

        <ProFormText name={'category'} hidden />

        <Row gutter={48}>
          <Col span={12}>
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

            {lessonInfo?.category === LessonCategoryEnum.GROUP_LESSON && (
              <ProFormRadio.Group
                name={'isSupportCombo'}
                rules={[basicRule]}
                hidden={lessonInfo?.category !== LessonCategoryEnum.PRIVATE_LESSON}
                label={'是否支持套餐购买'}
                options={genOptionsFromObj(trueFalseOptions('是', '否'))}
              />
            )}

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
          </Col>
          <Col span={12}>
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
          </Col>

          <Col span={24}>
            <ProFormGroup>
              <ProFormRadio.Group
                name={'priceType'}
                rules={[basicRule]}
                label={'收费类型'}
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
                          label={'价格'}
                          min={0.01}
                        />
                        <ProFormDigit
                          name={'memPrice'}
                          rules={[basicRule]}
                          label={'会员价格'}
                          min={0.01}
                        />
                      </ProFormGroup>
                    );
                  }
                  return null;
                }}
              </ProFormDependency>
            </ProFormGroup>

            <UploadSingleImage
              name={'contract'}
              label={'课程合同'}
              disabled={false}
              type={'text'}
              beforeUpload={beforeUploadOnlyFile}
              extra={'请上传不大于10M的 docx 或 pdf 格式的文件'}
            />

            <UploadMultipleImage
              noRule={true}
              name={'imageUrls'}
              label={'课程图片(可上传最多5张图片)'}
              disabled={false}
              maxLength={5}
            />

            <ProFormTextArea
              name={'honour'}
              label={'取得荣誉'}
              placeholder={'请输入私教老师取得的荣誉'}
            />

            <ProFormTextArea
              name={'specialty'}
              label={'专业领域'}
              placeholder={'请输入私教老师的专业领域'}
            />
          </Col>
        </Row>
      </ProForm>
    </>
  );
};
export { LessonBaseInfo };
