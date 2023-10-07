import React from 'react';
import { basicRule, IP_RegExp, port_RegExp, STOP_STATUS, useStatusOptions } from '@/utils/utils';
import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import { Card, Form } from 'antd';
import { Access, useAccess } from '@umijs/max';
import {
  connectTypeOptions,
  handleFetchHKDeviceConfig,
  handleSaveHKDeviceConfig,
} from '@/utils/device/face/config';
import { UseStatusEnum } from '@/utils/enums';
import { MyPageContainer } from '@/components/card/MyPageContainer';

const FaceConfig: React.FC = () => {
  const [form] = Form.useForm();

  const access = useAccess();

  const accessPrefix = `device:haikang-face:setting:`;

  useAsyncEffect(async () => {
    const data = await handleFetchHKDeviceConfig();

    if (data.success) {
      form.setFieldsValue(data.data);
    }
  }, []);

  return (
    <>
      <Card
        className={'card-info-style'}
        style={{ minWidth: 800, minHeight: 412, boxShadow: 'none' }}
        bordered={false}
        title={'人脸配置'}
      >
        <MyPageContainer>
          <ProForm
            style={{ marginTop: 8, maxWidth: 1000 }}
            name="basic"
            form={form}
            layout="vertical"
            initialValues={{
              isStart: STOP_STATUS,
            }}
            submitter={{
              render: (props, doms) => {
                return [
                  <Access key={'submit'} accessible={!access?.[`${accessPrefix}submit`]}>
                    {doms[1]}
                  </Access>,
                ];
              },
            }}
            onFinish={async (values) => {
              await handleSaveHKDeviceConfig(values);
            }}
          >
            <ProFormRadio.Group
              name={'isStart'}
              label={'是否启用'}
              rules={[basicRule]}
              options={useStatusOptions}
            />
            <ProFormText name={'id'} hidden />

            <ProFormDependency name={['isStart']}>
              {({ isStart }) => {
                if (isStart === UseStatusEnum.NORMAL_STATUS) {
                  return (
                    <>
                      <ProFormText
                        name={'ip'}
                        label={'ip'}
                        placeholder={'请输入ip'}
                        width={'md'}
                        rules={[basicRule, { message: '请输入正确的ip地址', pattern: IP_RegExp }]}
                      />{' '}
                      <ProFormDigit
                        name={'port'}
                        width={'md'}
                        label={'端口'}
                        tooltip={'一般是80'}
                        rules={[
                          basicRule,
                          {
                            message: '请输入正确的端口号',
                            pattern: port_RegExp,
                          },
                        ]}
                      />
                      <ProFormRadio.Group
                        label={'接入方式'}
                        name={'type'}
                        tooltip={
                          '如果设备接入微耕，由服务端控制开门则选微耕接入，如果是设备直接接入闸机，则选海康接入'
                        }
                        rules={[basicRule]}
                        options={connectTypeOptions}
                      />
                    </>
                  );
                }

                return null;
              }}
            </ProFormDependency>
          </ProForm>{' '}
        </MyPageContainer>
      </Card>
    </>
  );
};
export default FaceConfig;
