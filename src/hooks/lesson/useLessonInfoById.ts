import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { stringToCheckBox } from '@/utils/utils';
import { handleLessonDataById2 } from '@/utils/lesson/lesson-list';
import { Lesson } from 'types/lesson/lesson-list';

/**
 * 自定义Hook
 * 根据课程id获取课程信息
 * */
const useLessonInfoById = (lessonId: string, type: string = '') => {
  const [lessonInfo, setLessonInfo] = useState<Lesson.LessonItemAndTeacherName | null>(null);

  useAsyncEffect(async () => {
    const result = await handleLessonDataById2(lessonId);

    if (type === 'add') {
      return;
    }

    if (result.success && 'id' in result?.data) {
      const resultData = result.data;

      if (resultData.imageUrls && typeof resultData.imageUrls === 'string') {
        Object.assign(resultData, {
          imageUrls: stringToCheckBox(resultData.imageUrls).map((image, imageIndex) => {
            return {
              name: `${imageIndex}`,
              uid: `${imageIndex}`,
              url: image,
              status: 'done',
            };
          }),
        });
      }

      if (resultData.imageUrls === '') {
        Object.assign(resultData, {
          imageUrls: [],
        });
      }

      if (resultData.bannerImageUrl && typeof resultData.bannerImageUrl === 'string') {
        Object.assign(resultData, {
          bannerImageUrl: stringToCheckBox(resultData.bannerImageUrl).map((image, imageIndex) => {
            return {
              name: `${imageIndex}`,
              uid: `${imageIndex}`,
              url: image,
              status: 'done',
            };
          }),
        });
      } else {
        Object.assign(resultData, {
          bannerImageUrl: [],
        });
      }

      if (resultData?.servicePersonIds) {
        Object.assign(resultData, {
          servicePersonIds: stringToCheckBox(resultData?.servicePersonIds),
        });
      }

      setLessonInfo(resultData);
    }
  }, []);

  return lessonInfo;
};

export { useLessonInfoById };
