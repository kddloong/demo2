import React from 'react';
import './index.css';

export type FieldProps = {
  label: React.ReactNode;
  value: React.ReactNode;
  style?: React.CSSProperties;
};

const Field: React.FC<FieldProps> = ({ label, value, ...rest }) => (
  <div className={'field'} {...rest}>
    <span className={'label'}>{label}</span>
    <span className={'number'}>{value}</span>
  </div>
);

export default Field;
