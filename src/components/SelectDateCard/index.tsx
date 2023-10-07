import { DatePicker } from 'antd';
import '@/pages/good/dashboard/style.css';
import { ProCard } from '@ant-design/pro-components';
import type { FC, ReactNode } from 'react';
import { createContext, useState } from 'react';
import type { Dayjs } from 'dayjs';
import { TypeUtil } from 'types/utils';
import { getTimeDistance } from '@/utils/utils';

const { RangePicker } = DatePicker;

export type TimeType = 'today' | 'week' | 'month' | 'year';

type RangeValue = [Dayjs | null, Dayjs | null] | null;

export const SelectDateCardContext = createContext<
  Partial<{
    rangePickerValue: RangeValue;
    setRangePickerValue: TypeUtil.SetState<RangeValue>;
    dateType: string;
  }>
>({ rangePickerValue: getTimeDistance('today') });

/**
 * 统计
 * @param props
 * @constructor
 */
const SelectDateCard: FC<{ children: ReactNode }> = (props) => {
  const [rangePickerValue, setRangePickerValue] = useState<RangeValue>(getTimeDistance('today'));

  const [dateType, setDateType] = useState('today');

  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
    setDateType(type);
  };

  const handleRangePickerChange = (value: RangeValue) => {
    setRangePickerValue(value);
    setDateType('');
  };

  const isActive = (type: TimeType) => {
    // setDateType(type);
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as Dayjs, 'day') &&
      rangePickerValue[1].isSame(value[1] as Dayjs, 'day')
    ) {
      return 'currentDate';
    }
    return '';
  };

  return (
    <SelectDateCardContext.Provider value={{ rangePickerValue, setRangePickerValue, dateType }}>
      <ProCard
        bordered={false}
        bodyStyle={{ padding: 0 }}
        tabs={{
          tabPosition: 'top',
          activeKey: 'sales',
          tabBarExtraContent: (
            <>
              <div className={'sales-extra-wrap'}>
                <div className={'sales-extra'}>
                  <a className={isActive('today')} onClick={() => selectDate('today')}>
                    今日
                  </a>
                  <a className={isActive('week')} onClick={() => selectDate('week')}>
                    本周
                  </a>
                  <a className={isActive('month')} onClick={() => selectDate('month')}>
                    本月
                  </a>
                  <a className={isActive('year')} onClick={() => selectDate('year')}>
                    本年
                  </a>
                </div>
                <RangePicker
                  value={rangePickerValue}
                  onChange={handleRangePickerChange}
                  style={{ width: 256 }}
                />
              </div>
            </>
          ),
        }}
      >
        {props.children}
      </ProCard>
    </SelectDateCardContext.Provider>
  );
};

export { SelectDateCard };
