import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/utils/utils';

interface dayjsArrayOptionsIter {
  /**
   * 如果为true, 不计算最后一天
   */
  excludeEnd?: boolean;
  step?: number;
}

interface FormatOptionsIter {
  formatUnit: 'days' | 'minutes';
  formatText: string;
}

/**
 * 生成dayjs数组
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @param options
 * @param formatOptions
 */
export const generatedayjsArray = (
  startDate: string,
  endDate: string,
  formatOptions: FormatOptionsIter = {
    formatText: DATE_FORMAT,
    formatUnit: 'days',
  },
  options: dayjsArrayOptionsIter = {},
) => {
  //计算 开始时间 和 结束时间的间隔
  const diff = dayjs(endDate, formatOptions.formatText).diff(
    dayjs(startDate, formatOptions.formatText),
    formatOptions.formatUnit,
  );

  // 加上步骤计算
  const finalDIff = diff / (options?.step || 1);

  // 返回结果
  if (options.excludeEnd) {
    return Array.from({ length: finalDIff }, (n, v) => {
      return dayjs(startDate).add(v * (options?.step || 1), formatOptions.formatUnit);
    });
  } else {
    return Array.from({ length: finalDIff + 1 }, (n, v) => {
      return dayjs(startDate).add(v * (options?.step || 1), formatOptions.formatUnit);
    });
  }
};
