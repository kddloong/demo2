import { ProFormDigit } from '@ant-design/pro-components';
import { basicRule } from '@/utils/utils';
import type { FC } from 'react';

type LimitDigitRangeProps = {
  name: string;
  min: number;
  max: number;
  label: string;
};

const LimitDigitRange: FC<LimitDigitRangeProps> = (props) => {
  const { name, label, min, max } = props;

  return (
    <ProFormDigit
      name={name}
      label={`${label}(${min}-${max})`}
      width={'md'}
      fieldProps={{
        precision: 0,
      }}
      rules={[
        { type: 'number' },
        basicRule,
        ({}) => ({
          validator(_, value) {
            if (min && value < min) {
              return Promise.reject(new Error(`请输入大于${min}的数`));
            }

            if (max && value > max) {
              return Promise.reject(new Error(`请输入小于${max}的数`));
            }

            return Promise.resolve();
          },
        }),
      ]}
    />
  );
};

export { LimitDigitRange };
