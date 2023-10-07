import { ProFormText } from '@ant-design/pro-components';
import './style.css';

const MyFormInput = (props: { name: string }) => {
  const { name } = props;
  return (
    <div className={'my-ant-input'}>
      <ProFormText.Password
        name={name}
        fieldProps={{
          size: 'large',
          /*prefix: <LockOutlined />,*/
          bordered: true,
        }}
        placeholder="密码"
        rules={[
          {
            required: true,
            message: '密码是必填项！',
          },
        ]}
      />
    </div>
  );
};

export default MyFormInput;
