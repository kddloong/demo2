import { DATE_FORMAT, getTimeDistance } from '@/utils/utils';
import { useAsyncEffect, useSize } from 'ahooks';
import { Card, DatePicker, Typography } from 'antd';
import BigNumber from 'bignumber.js';
import { useRef, useState } from 'react';
import '../style.less';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { handleIncome } from '@/utils/dashboard/dashboard';
import { DateRangeSelect } from '@/components/form/DateRangeSelect';

export type TimeType = 'today' | 'week' | 'month' | 'year';
const { Text } = Typography;

const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

const DashboardRevenueRate = () => {
  const [rangePickerValue, setRangePickerValue] = useState<RangeValue>(getTimeDistance('today'));

  const ref = useRef(null);
  const size = useSize(ref);

  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };

  const handleRangePickerChange = (dates: RangeValue) => {
    setRangePickerValue(dates);
  };

  const isActive = (type: TimeType) => {
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
      return 'current-date';
    }
    return '';
  };

  useAsyncEffect(async () => {
    const result = await handleIncome({
      fromDate: rangePickerValue?.[0]
        ? rangePickerValue[0].format(DATE_FORMAT)
        : dayjs().startOf('day').format(DATE_FORMAT),
      toDate: rangePickerValue?.[1]
        ? rangePickerValue[1].format(DATE_FORMAT)
        : dayjs().format(DATE_FORMAT),
    });

    let totalNum = 0;

    result.forEach((item) => {
      totalNum = new BigNumber(item.value).plus(totalNum).toNumber();
    });
  }, [rangePickerValue]);

  return (
    <Card
      ref={ref}
      className={'sales-card'}
      bordered={false}
      title={
        <div>
          <div>场馆营收额类别占比</div>
        </div>
      }
      style={{
        height: '100%',
      }}
      extra={
        <div className={'sales-extra-wrap'}>
          <div className={'sales-extra'}>
            {(size?.width as number) > 680 ? (
              <>
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
              </>
            ) : (
              <>
                <DateRangeSelect selectDate={selectDate} />
              </>
            )}
          </div>
          <RangePicker
            allowClear={false}
            value={rangePickerValue}
            onChange={(values) => {
              if (!values) {
                return;
              }
              handleRangePickerChange(values);
            }}
            style={{ width: 256 }}
          />
        </div>
      }
    >
      <div>
        <Text>营业额</Text>
        {/*<Pie {...config} />*/}
      </div>
    </Card>
  );
};

export default DashboardRevenueRate;
