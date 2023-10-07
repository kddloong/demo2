import { basicRule, TIME_FORMAT } from '@/utils/utils';
import { ProFormGroup, ProFormTimePicker } from '@ant-design/pro-components';
import { Form, Space } from 'antd';
import dayjs from 'dayjs';
import type { FC } from 'react';

interface ITimeRangeProps {
  name?: [string, string];
  label?: [string, string];
  format?: string;
}

function range(start: number, end: number) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

const TimeRange: FC<ITimeRangeProps> = (props) => {
  const {
    name = ['startTime', 'endTime'],
    label = ['开始时间', '结束时间'],
    format = 'HH:mm',
  } = props;

  const form = Form.useFormInstance();

  return (
    <>
      <ProFormGroup>
        <Space>
          <ProFormTimePicker
            name={name[0]}
            label={label[0]}
            rules={[basicRule]}
            width={120}
            fieldProps={{
              format,
            }}
            transform={(value) => {
              const params = {
                [`${name[0]}`]: dayjs(value, TIME_FORMAT).format(TIME_FORMAT),
              };

              return params;
            }}
          />

          <ProFormTimePicker
            name={name[1]}
            label={[label[1]]}
            width={120}
            rules={[basicRule]}
            fieldProps={{
              format,
              disabledHours: () => {
                const beginTime = form.getFieldValue(name[0]);

                const now = dayjs(beginTime, TIME_FORMAT);

                return range(0, now.minute() === 30 ? now.hour() + 1 : now.hour());
              },
              // disabledTime: (date) => {
              //   const newBeginTime = form.getFieldValue(name[0]);
              //
              //   const now = dayjs(newBeginTime, 'HH:mm');
              //
              //   if (!date || !date.isSame(now, 'd')) {
              //     return;
              //   }
              //   return {
              //     disabledHours: () =>
              //       range(0, now.minute() === 30 ? now.hour() + 1 : now.hour()),
              //     disabledMinutes: () => {
              //       return [];
              //     },
              //     disabledSeconds: () => {
              //       return [];
              //     },
              //   };
              // },
            }}
            transform={(value) => {
              return {
                [`${name[1]}`]: dayjs(value, TIME_FORMAT).format(TIME_FORMAT),
              };
            }}
          />
        </Space>
      </ProFormGroup>
    </>
  );
};

export { TimeRange };
