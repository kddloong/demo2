import { basicRule } from '@/utils/utils';
import { Form, Input } from 'antd';
import BigNumber from 'bignumber.js';
import type { FC } from 'react';

interface TwoInputRangeProps {
  type: 'number' | undefined;
  name: [string, string];
  label: string;
  message: string; // 验证,
  limitRange?: [number, number];
  readonly?: boolean;
}

const TwoInputRange: FC<TwoInputRangeProps> = (props) => {
  const { type, label, name, message, limitRange = [], readonly = false } = props;

  const numberInput = (function () {
    return type === 'number'
      ? {
          type: 'number',
        }
      : {};
  })();

  return (
    <>
      <Form.Item label={label} style={{ marginBottom: 0 }}>
        <Form.Item
          name={name[0]}
          rules={[
            { ...basicRule, message: `请输入${message}的最小值` },
            ({}) => ({
              /**
               * 第一个值必须大于0
               * 如果有限制,大于第一个
               * @param _
               * @param value
               */
              validator(_, value) {
                if (+value === 0) {
                  return Promise.reject('请输入大于0的数');
                }

                if (limitRange?.length === 0) {
                  return Promise.resolve();
                } else {
                  if (+value >= limitRange[0] && +value <= limitRange[1] - 1) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(`请输入大于${limitRange[0]}并且小于${limitRange[1] - 1}的数`),
                  );
                }
              },
            }),
          ]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input disabled={readonly} {...numberInput} />
        </Form.Item>
        <Form.Item
          name={name[1]}
          rules={[
            {
              ...basicRule,
              message: `请输入${message}的最大值`,
            },
            ({ getFieldValue }) => ({
              /**
               * 第二个数需要
               * @param _
               * @param value
               */
              validator(_, value) {
                if (
                  !value ||
                  new BigNumber(value).comparedTo(new BigNumber(getFieldValue(name[0]))) === 1
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(`请输入大于${getFieldValue(name[0])}的数`));
              },
            }),
            ({}) => ({
              validator(_, value) {
                if (limitRange?.length === 0) {
                  return Promise.resolve();
                } else {
                  if (+value >= limitRange[0] && +value <= limitRange[1]) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(`请输入大于${limitRange[0]}并且小于${limitRange[1]}的数`),
                  );
                }
              },
            }),
          ]}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input disabled={readonly} {...numberInput} />
        </Form.Item>
      </Form.Item>
    </>
  );
};

export { TwoInputRange };
