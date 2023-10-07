import { ProCard, ProFormText } from '@ant-design/pro-components';
import './styles.css';
import { Form, Tabs } from 'antd';
import React, { createContext, useEffect, useState } from 'react';
import { useSearchParams } from '@umijs/max';
import { useRequest } from 'ahooks';
import { MyPageHeader } from '@/components/MyPageHeader';
import { UploadAvatar } from '@/components/form/UploadAvatar';
import { Lesson } from '../../../../../types/lesson/lesson-list';
import { handleAddLesson, handleLessonDataById2 } from '@/utils/lesson/lesson-list';
import { LessonCategoryEnum } from '@/utils/enums';
import { LessonBaseInfo } from './components/Basic';
import { RelatedCombo } from '@/components/lesson/lesson-list/EditLessonForm/components/RelatedCombo';
import { LessonArrangeTable } from '@/components/lesson/lesson-arrange/LessonArrangeTable';

export const LessonContext = createContext<{
  lessonInfo: Lesson.LessonItem | null;
  refresh?: () => void;
}>({
  lessonInfo: null,
});
const EditLessonForm = () => {
  const [searchParams] = useSearchParams();

  const lessonId = searchParams.get('lessonId') || '';

  const category = searchParams.get('category') as LessonCategoryEnum;

  const [form] = Form.useForm();

  const [lessonInfo, setLessonInfo] = useState<Lesson.LessonItem | null>(null);

  const [imageUrl, setImageUrl] = useState('');

  const { data, refresh } = useRequest(handleLessonDataById2, {
    defaultParams: [lessonId],
  });

  useEffect(() => {
    if (data) {
      if (data.success) {
        const result = data;

        if (result.success) {
          const resultData = result.data;

          form.setFieldsValue(resultData);
          setImageUrl(resultData?.bannerImageUrl || '');
          setLessonInfo(resultData);
        }
      }
    }
  }, [data]);

  function getLessonArrange(lessonCategory: LessonCategoryEnum) {
    if (lessonCategory === LessonCategoryEnum.GROUP_LESSON) {
      return (
        <>
          <LessonArrangeTable
            category={LessonCategoryEnum.GROUP_LESSON}
            isIndependentPage={false}
          />
        </>
      );
    }

    if (lessonCategory === LessonCategoryEnum.PRIVATE_LESSON) {
    }

    return null;
  }

  const tabsItem = [
    {
      key: 'tab0',
      label: `基础信息`,
      children: <LessonBaseInfo />,
    },
    {
      key: 'tab1',
      label: `关联套餐`,
      children: <RelatedCombo />,
    },
    {
      key: 'tab2',
      label: '上课记录',
      children: '开发中',
    },
    {
      key: 'tab3',
      label: '关联排课',
      children: getLessonArrange(category),
    },
    {
      key: 'tab4',
      label: '评价管理',
      children: '开发中',
    },
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  const uploadSuccess = async (newUrl: string) => {
    if (lessonInfo) {
      await handleAddLesson({
        ...lessonInfo,
        bannerImageUrl: newUrl,
      });
    }
  };

  return (
    <>
      <MyPageHeader />
      <ProCard>
        <div
          style={{
            minWidth: '1000px',
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            minHeight: '80vh',
          }}
        >
          <div className={'header-box'}>
            <div className="app-info">
              <div className={'app-info-box'}>
                <div className="info-box-left">
                  <UploadAvatar
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    success={uploadSuccess}
                  />
                </div>
                <div className="info-box-right">
                  <div className={'styles_titleText'}>{lessonInfo?.name}</div>
                  <div className={'styles_bottomText'}>
                    {LessonCategoryEnum[lessonInfo?.category as keyof typeof LessonCategoryEnum]}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProFormText name={'clientId'} hidden />{' '}
          <LessonContext.Provider value={{ lessonInfo, refresh }}>
            <Tabs defaultActiveKey="0" items={tabsItem} onChange={onChange} />
          </LessonContext.Provider>
        </div>
      </ProCard>
    </>
  );
};

export { EditLessonForm };
