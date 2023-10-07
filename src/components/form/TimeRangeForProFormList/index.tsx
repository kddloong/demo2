import { basicRule, TIME_FORMAT } from '@/utils/utils';
import type { FormListActionType } from '@ant-design/pro-components';
import { ProFormDependency, ProFormGroup, ProFormTimePicker } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import type { FC, MutableRefObject } from 'react';
import { Space } from 'antd';

interface ITimeRangeForProFormListProps {
  name?: [string, string];
  label?: [string, string];
  format?: string;
  // 该组件 在列表的第几行
  listIndex: number;
  actionRef: MutableRefObject<FormListActionType<any> | undefined>;
}

function range(start: number, end: number) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

/**
 * 专门用于适配ProFormList
 * 因为取值方式不同， 做判断太累了
 * @param props
 * @constructor
 */
const TimeRangeForProFormList: FC<ITimeRangeForProFormListProps> = (props) => {
  const {
    name = ['startTime', 'endTime'],
    label = ['开始时间', '结束时间'],
    format = 'HH:mm',
  } = props;

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

            // transform={(value) => {
            // 这个 transform 会显示 invalid date， 所以先注释掉
            //   const params = {
            //     [`${name[0]}`]: dayjs(value).format(TIME_FORMAT),
            //   };
            //
            //   return params;
            // }}
          />

          <ProFormDependency name={[name[0]]}>
            {(values) => {
              return (
                <>
                  <ProFormTimePicker
                    name={name[1]}
                    label={[label[1]]}
                    width={120}
                    rules={[basicRule]}
                    fieldProps={{
                      format,
                      disabledHours: () => {
                        const beginTime = values[name[0]];

                        const begin = dayjs(beginTime, TIME_FORMAT);

                        return range(0, begin.hour());
                      },
                    }}
                    // transform={(value) => {
                    //   return {
                    //     [`${name[1]}`]: dayjs(value).format(TIME_FORMAT),
                    //   };
                    // }}
                  />
                </>
              );
            }}
          </ProFormDependency>
        </Space>
      </ProFormGroup>
    </>
  );
};

export { TimeRangeForProFormList };
