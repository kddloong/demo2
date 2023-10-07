import { basicRule, genOptionsFromObj, trueFalseOptions } from '@/utils/utils';
import {
  ProForm,
  ProFormDependency,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import { Alert, Card, Form, message } from 'antd';
import { Access, useAccess } from '@umijs/max';
import {
  handleFetchReadCardListSelect,
  handleSaveEntityCardConfig,
} from '@/utils/member/member/member';
import { MemberUser } from 'types/member/member/member';
import { getDataFromCookies, saveDataIntoCookies } from '@/utils/cookiesUtil';
import { handleFetchCardReaderSettings } from '@/utils/device/encrypted-card/card-setting';

const PhysicalCardConfig = () => {
  const [form] = Form.useForm();

  const access = useAccess();

  const accessPrefix = `device:read-card:setting:`;

  useAsyncEffect(async () => {
    let myLocalConfigData = getDataFromCookies('Card_Reader_Config');

    if (!myLocalConfigData) {
      const readResult = await handleFetchCardReaderSettings();

      if (readResult.success) {
        myLocalConfigData = readResult.data;
      }
    }

    if (myLocalConfigData !== null) {
      form.setFieldsValue(myLocalConfigData);
    } else {
      message.warning('未进行读卡器配置或cookie已被删除，请重新配置');
    }
  }, []);

  return (
    <>
      <Card
        className={'card-info-style'}
        style={{ minWidth: 800, minHeight: 412, boxShadow: 'none' }}
        title={'实体卡配置'}
        bordered={false}
      >
        <Alert
          message="注意事项"
          description="读卡器配置保存在本地cookies里，请不要删除本地cookies。如果本地cookies被清空，需要重新进行读卡器配置。"
          type="warning"
          showIcon
        />
        <ProForm<MemberUser.EntityConfigParams>
          style={{ marginTop: 8, maxWidth: 800 }}
          name="basic"
          form={form}
          layout="vertical"
          submitter={{
            render: (props, doms) => {
              return [
                <Access key={'submit'} accessible={!access?.[`${accessPrefix}submit`]}>
                  {doms[1]}
                </Access>,
              ];
            },
          }}
          initialValues={{ isPositive: '0' }}
          onFinish={async (values) => {
            // todo 不要用写死 字符串字面量
            if (values.isStart === '1') {
              const res = await handleSaveEntityCardConfig(values);
              if (res.success) {
                message.success('操作成功');
                saveDataIntoCookies(values, 'Card_Reader_Config');
                form.setFieldsValue({ ...values });
              }
            } else {
              form.setFieldsValue(values);
              message.success('操作成功');
            }
          }}
        >
          <ProFormRadio.Group
            label="是否使用读卡器"
            name="isStart"
            options={genOptionsFromObj(trueFalseOptions('是', '否'))}
          />
          <ProFormText hidden name={'id'} label={'id'} />
          <ProFormDependency name={['isStart', 'id']}>
            {({ isStart }) => {
              if (isStart === '1') {
                return (
                  <>
                    <ProFormSelect
                      name={'deviceNo'}
                      label={'设备编号'}
                      placeholder={'请输入设备编号'}
                      width={'md'}
                      rules={[basicRule]}
                      request={async () => {
                        const res = await handleFetchReadCardListSelect();
                        return res.data;
                      }}
                    />

                    <ProFormGroup>
                      <ProFormText
                        width={'md'}
                        name={'serialPort'}
                        label={'串口号'}
                        placeholder={'请输入串口号'}
                        rules={[basicRule]}
                      />

                      {/*<Form.Item label={' '}>*/}
                      {/*  <Space>*/}
                      {/*    <Button*/}
                      {/*      onClick={async () => {*/}
                      {/*        const ip = form.getFieldValue('ip');*/}

                      {/*        const port = form.getFieldValue('port');*/}

                      {/*        const url = `http://${ip}:${port}/card/getComPort`;*/}

                      {/*        testCom(url).then((res) => {*/}
                      {/*          if (res.success) {*/}
                      {/*            form.setFieldsValue({*/}
                      {/*              serialPort: res.data || '',*/}
                      {/*            });*/}

                      {/*            window.localStorage.setItem('serialPort', res.data || '');*/}
                      {/*          }*/}
                      {/*        });*/}
                      {/*      }}*/}
                      {/*    >*/}
                      {/*      检测串口*/}
                      {/*    </Button>*/}

                      {/*    <Button*/}
                      {/*      onClick={async () => {*/}
                      {/*        const com = form.getFieldValue('serialPort');*/}

                      {/*        if (!com) {*/}
                      {/*          message.warning('请获取通信串口号再测试连接');*/}
                      {/*          return;*/}
                      {/*        }*/}

                      {/*        const ip = form.getFieldValue('ip');*/}

                      {/*        const port = form.getFieldValue('port');*/}

                      {/*        const base_url = `http://${ip}:${port}`;*/}

                      {/*        const url = `${base_url}/card/testConnect`;*/}

                      {/*        axios*/}
                      {/*          .get(url, {*/}
                      {/*            params: { com },*/}
                      {/*            headers: {*/}
                      {/*              origin: base_url,*/}
                      {/*            },*/}
                      {/*          })*/}
                      {/*          .then((res) => {*/}
                      {/*            // @ts-ignore*/}
                      {/*            if (!res) {*/}
                      {/*              message.warning('请检查系统服务是否启动');*/}
                      {/*            } else {*/}
                      {/*              message.info(res?.msg);*/}
                      {/*            }*/}
                      {/*          })*/}
                      {/*          .catch((err) => {*/}
                      {/*            console.log(err);*/}
                      {/*          });*/}
                      {/*      }}*/}
                      {/*    >*/}
                      {/*      测试连接*/}
                      {/*    </Button>*/}

                      {/*    <Button*/}
                      {/*      onClick={() => {*/}
                      {/*        const com = form.getFieldValue('serialPort');*/}

                      {/*        const isPositive = form.getFieldValue('isPositive');*/}

                      {/*        const ip = form.getFieldValue('ip');*/}

                      {/*        const port = form.getFieldValue('port');*/}

                      {/*        readPhysicalCard({*/}
                      {/*          isPositive,*/}
                      {/*          ip,*/}
                      {/*          port,*/}
                      {/*          serialPort: com,*/}
                      {/*        }).then((res) => {*/}
                      {/*          console.log(`res`, res);*/}

                      {/*          form.setFieldsValue({*/}
                      {/*            textCard: res?.data || '',*/}
                      {/*          });*/}
                      {/*        });*/}
                      {/*      }}*/}
                      {/*    >*/}
                      {/*      测试读卡*/}
                      {/*    </Button>*/}
                      {/*  </Space>*/}
                      {/*</Form.Item>*/}

                      {/*<ProFormText name={'textCard'} initialValue={'   '} label={' '} readonly />*/}
                    </ProFormGroup>

                    <ProFormTextArea
                      name={'macAddress'}
                      label={'MAC地址 ( 有多个时用分号隔开 )'}
                      placeholder={'请输入设备编号'}
                      width={'md'}
                      rules={[basicRule]}
                    />
                  </>
                );
              }
              return <></>;
            }}
          </ProFormDependency>
        </ProForm>
      </Card>
    </>
  );
};
export default PhysicalCardConfig;
