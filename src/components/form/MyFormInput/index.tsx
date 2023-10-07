import { ProFormText } from '@ant-design/pro-components';
import type { ReactNode } from 'react';
import './style.css';

const MyFormInput = (props: {
  prefix?: string | ReactNode;
  placeholder?: string;
  name?: string;
}) => {
  const { name } = props;
  return (
    <div className={'my-ant-input'}>
      <ProFormText
        name={name}
        fieldProps={{
          size: 'large',
          bordered: true,
        }}
        placeholder={props.placeholder}
      />
    </div>
  );
};

export default MyFormInput;
