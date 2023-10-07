import type { TimeType } from '@/pages/dashboard/dashboard/components/DashboardRevenueRate';
import { Select } from 'antd';
import type { FC } from 'react';

const { Option } = Select;

interface IDateRangeSelect {
  selectDate: any;
}

/**
 * 时间周期选择器, 提供 今日, 本周, 本月, 本年四个选项
 * @constructor
 */
const DateRangeSelect: FC<IDateRangeSelect> = (props) => {
  const { selectDate } = props;

  return (
    <>
      {' '}
      <Select
        style={{ width: 120 }}
        onSelect={(value: string) => {
          selectDate(value as TimeType);
        }}
        defaultValue={'today'}
      >
        <Option value="today">今日</Option>
        <Option value="week">本周</Option>
        <Option value="month">本月</Option>
        <Option value="year">本年</Option>
      </Select>
    </>
  );
};

export { DateRangeSelect };
