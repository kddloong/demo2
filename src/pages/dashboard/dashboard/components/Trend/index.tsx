import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';
import './index.css';

export type TrendProps = {
  colorful?: boolean;
  flag: 'up' | 'down';
  style?: React.CSSProperties;
  reverseColor?: boolean;
  className?: string;
};

const Trend: React.FC<TrendProps> = ({
  colorful = true,
  reverseColor = false,
  flag,
  children,
  className,
  ...rest
}) => {
  const classString = classNames(
    'trend-item',
    {
      ['trend-item-grey']: !colorful,
      ['reverse-color']: reverseColor && colorful,
    },
    className,
  );
  return (
    <div {...rest} className={classString} title={typeof children === 'string' ? children : ''}>
      <span>{children}</span>
      {flag && (
        <span className={'flag'}>
          {flag === 'up' ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </span>
      )}
    </div>
  );
};

export default Trend;
