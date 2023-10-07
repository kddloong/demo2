import { basicRule, DATE_FORMAT } from '@/utils/utils';
import { ProFormDatePicker, ProFormDependency, ProFormGroup } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import type { FC } from 'react';

interface DateRangeProps {
  name?: [string, string];
  label?: [string, string];
}

const DateRange: FC<DateRangeProps> = (props) => {
  const { name = ['startDate', 'endDate'], label = ['开始日期', '结束日期'] } = props;

  return (
    <>
      <ProFormGroup>
        <ProFormDatePicker
          name={name[0]}
          label={label[0]}
          rules={[basicRule]}
          width={120}
          transform={(value) => {
            const params = {
              [`${name[0]}`]: dayjs(value).format(DATE_FORMAT),
            };

            return params;
          }}
        />

        <ProFormDependency name={[name[0]]}>
          {(values) => {
            console.log(`values[name[0]]`, values[name[0]]);

            return (
              <ProFormDatePicker
                name={name[1]}
                label={[label[1]]}
                rules={[basicRule]}
                width={120}
                fieldProps={{
                  disabledDate: (current) => {
                    return current <= dayjs(values[name[0]]).endOf('day');
                  },
                }}
                transform={(value) => {
                  return {
                    [`${name[1]}`]: dayjs(value).format(DATE_FORMAT),
                  };
                }}
              />
            );
          }}
        </ProFormDependency>
      </ProFormGroup>
    </>
  );
};

export { DateRange };
