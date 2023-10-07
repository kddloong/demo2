import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Col, Form, Row } from 'antd';
import { useAsyncEffect } from 'ahooks';
import './BaseView.css';
import { handleGetCurrentUserInfo } from '@/utils/account/center';

const BaseView = () => {
  const [form] = Form.useForm();

  useAsyncEffect(async () => {
    const result = await handleGetCurrentUserInfo();

    if (result.success) {
      const resultData = result.data;

      if ('userName' in resultData) {
        form.setFieldsValue({
          userName: resultData.userName,
          phone: resultData.phone,
          realName: resultData.realName,
        });
      }
    }
  }, []);

  return (
    <div className={'base-view'}>
      <div className={'left'}>
        <ProForm layout={'horizontal'} form={form} submitter={false}>
          <Row>
            <Col span={9}>
              <ProFormText
                width="md"
                readonly
                name="userName"
                tooltip={'登录的用户名'}
                label={'用户名'}
                hidden={false}
              />
              <ProFormText width="md" readonly name="phone" label={'手机'} hidden={false} />
              <ProFormText width="md" readonly name="realName" label={'真名'} hidden={false} />
              <ProFormText width="md" readonly name="nickName" label={'昵称'} hidden={false} />
            </Col>
          </Row>
        </ProForm>
      </div>
    </div>
  );
};

export default BaseView;
