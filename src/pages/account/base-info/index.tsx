import {
  PageLoading,
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import { Button, Col, Form, message, Row, Space, Spin, Upload } from 'antd';
import { lazy, Suspense, useState } from 'react';
import '@/pages/account/center/components/BaseView.css';
import { genOptionsFromObj, phone_RegExp, stringToCheckBox } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { AvatarView } from './components/AvatarView';
import { Access, useAccess } from '@umijs/max';
import { handleBaseBase, handleSaveVenueData } from '@/utils/account/base-info';
import { handleDictionary } from '@/utils/main/main/dictionary';
import { trueOrFalseOptions } from '@/utils/options';
import { handleGetCurrentUserInfo } from '@/utils/account/center';
import { WrapContainer } from '@/components/layout/WrapContainer';

// 头像组件 方便以后独立，增加裁剪之类的功能
// @ts-ignore
const AvatarViewComp = () => {
  const MyMap = lazy(() => import('@/pages/account/base-info/components/map'));

  const [form] = Form.useForm();
  const [textForm] = Form.useForm();

  const [headImgUrl, setHeadImgUrlUrl] = useState('');

  const [initAddress, setInitAddress] = useState({ lat: 32.50216472, lon: 119.97284634 });

  const [albumUrl, setAlbumUrl] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const access = useAccess();

  useAsyncEffect(async () => {
    const result = await handleBaseBase();

    if (result.success && 'name' in result.data) {
      const resultData = result.data;

      textForm.setFieldsValue({
        precaution: resultData.precaution,
        notice: resultData.notice,
      });

      const imageUrlArr = [{ url: resultData.imageUrl, name: '1', uid: '1', status: 'done' }];

      Object.assign(resultData, {
        imageUrl: imageUrlArr,
      });

      setInitAddress({ lat: resultData.lat, lon: resultData.lon });
      setHeadImgUrlUrl(
        imageUrlArr[0].url || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      );

      setAlbumUrl(stringToCheckBox(resultData.albumUrl) || []);

      //解构赋值 把versions独立出去 其他的值放到otherResult里面
      const { versions, createName, ...otherResult } = resultData;

      form.setFieldsValue({ ...otherResult });
    }
  }, []);

  useAsyncEffect(async () => {
    const result = await handleGetCurrentUserInfo();

    if (result.success) {
      const resultData = result.data;

      if ('nickName' in resultData) {
        form.setFieldsValue({
          userName: resultData.userName,
          phone: resultData.phone,
          realName: resultData.realName,
        });
      }
    }
  }, []);

  return (
    <WrapContainer content={'当前用户池的所有用户，在这里你可以对用户进行统一管理。'}>
      <ProCard>
        <Row>
          <Col span={12}>
            <ProForm layout={'horizontal'} form={form} submitter={false}>
              <Row>
                <Col span={12}>
                  <ProFormText name="name" label={'场馆名称'} readonly />
                  <ProFormSelect
                    name="type"
                    label={'场馆类型'}
                    readonly
                    request={async () => {
                      return await handleDictionary('venue_type');
                    }}
                  />
                  <ProFormText name="venueNo" label={'场馆编号'} readonly />

                  <ProFormText
                    name={'phoneNo'}
                    label={'联系方法'}
                    rules={[{ pattern: phone_RegExp, message: '请输入正确的联系方式' }]}
                    width={180}
                  />
                </Col>

                <Col span={12}>
                  <ProFormSelect
                    name="isUseFree"
                    label={'是否支持低免'}
                    readonly
                    options={genOptionsFromObj(trueOrFalseOptions)}
                  />
                  <ProFormTextArea name="address" label={'详细地址'} readonly />

                  <ProFormText name={'contact'} label={'联系人'} width={180} />
                </Col>
              </Row>
              <>
                <div className={'avatar_title'}>场馆图片</div>
                <div className={'avatar'}>
                  {loading ? (
                    <Spin />
                  ) : (
                    <img src={headImgUrl} alt="avatar" width={450} height={280} />
                  )}
                </div>
                <Upload
                  showUploadList={false}
                  accept=".jpg, .png, .bmp, .gif, .webp"
                  headers={{
                    Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
                  }}
                  action={API_URL}
                  beforeUpload={(file) => {
                    // 这里写这个是为了监听 上传事件
                    if (file.size / 1024 / 1024 < 50) {
                      setHeadImgUrlUrl('');

                      setLoading(true);

                      return true;
                    } else {
                      message.error('上传文件限制50M');
                      return Upload.LIST_IGNORE;
                    }
                  }}
                  onChange={async (info) => {
                    if (info?.file?.status === 'done') {
                      setLoading(false);

                      setHeadImgUrlUrl(info.file.response.data);

                      form.setFieldsValue({
                        imageUrl: [
                          {
                            url: info.file.response.data,
                            status: 'done',
                            name: '123',
                            uid: '1',
                          },
                        ],
                      });
                    }
                  }}
                >
                  <span style={{ color: 'red' }}>建议图片尺寸为 1366*578</span>

                  <div className={'buttons_view'}>
                    <Space>
                      <Button>
                        <UploadOutlined />
                        更换场馆图片
                      </Button>
                    </Space>
                  </div>
                </Upload>
              </>
              <Row>
                <Col span={24}>
                  <AvatarView albumUrl={albumUrl} setAlbumUrl={setAlbumUrl} />
                </Col>
              </Row>
            </ProForm>
          </Col>

          <Col span={12}>
            <Row>
              <Col>地图定位</Col>
            </Row>
            <Row style={{ marginTop: 10 }}>
              <Col span={24}>
                <Suspense fallback={<PageLoading />}>
                  <MyMap initAddress={initAddress} />
                </Suspense>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <ProForm layout={'vertical'} form={form} submitter={false}>
                  <Row>
                    <Col span={12}>
                      <ProFormText name={'lon'} label={'经度'} width={'md'} readonly />
                    </Col>

                    <Col span={12}>
                      <ProFormText name={'lat'} label={'纬度'} width={'md'} readonly />
                    </Col>
                  </Row>
                </ProForm>
              </Col>
            </Row>
            <Access key={'save'} accessible={!access?.['sys:base-info:save']}>
              <Button
                type="primary"
                style={{ float: 'right' }}
                onClick={async () => {
                  const data = form.getFieldsValue(true);

                  const text = textForm.getFieldsValue(true);

                  if (data.imageUrl) {
                    Object.assign(data, { imageUrl: data.imageUrl[0].url });
                  }

                  if (albumUrl.length > 0) {
                    Object.assign(data, { albumUrl: albumUrl.join(',') });
                  }

                  const result = await handleSaveVenueData(data, text);

                  if (result) {
                    form.setFieldsValue(result);
                    textForm.setFieldsValue(result);
                  }
                }}
              >
                保存
              </Button>
            </Access>
          </Col>
        </Row>
      </ProCard>
    </WrapContainer>
  );
};

export default AvatarViewComp;
