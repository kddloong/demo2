import { NORMAL_STATUS, STOP_STATUS, trueFalseOptions } from '@/utils/utils';
import { TrafficTypeEnum } from '@/utils/enums';

const trueOrFalseOptions = trueFalseOptions('是', '否');

const isFreeTrueOrFalseOptions = [
  {
    label: '免费',
    value: '0',
  },
  {
    label: '收费',
    value: '1',
  },
];

/**
 * 正常和禁用
 */
export const normalAndDisabledObj = {
  [STOP_STATUS]: {
    label: '禁用',
    color: 'grey',
  },
  [NORMAL_STATUS]: {
    label: '正常',
    color: 'green',
  },
};

export { trueOrFalseOptions, isFreeTrueOrFalseOptions };

export const trafficTypeOptions = [
  {
    label: '无',
    value: TrafficTypeEnum.NONE,
  },
  {
    label: '宇视',
    value: TrafficTypeEnum.YU_SHI,
  },
  {
    label: '海康',
    value: TrafficTypeEnum.HAI_KANG,
  },
];
