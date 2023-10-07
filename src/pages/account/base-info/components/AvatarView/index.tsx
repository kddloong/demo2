import { Col, Space } from 'antd';
import { useEffect, useState } from 'react';
import '@/pages/account/center/components/BaseView.css';
import chunk from 'lodash/chunk';
import { ProFormUploadButton } from '@ant-design/pro-components';
import { CLIENT_VERSION as version } from '@/utils/utils';
import './styles.css';
import { CloseOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { TypeUtil } from 'types/utils';

// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = (props: { albumUrl: string[]; setAlbumUrl: TypeUtil.SetState<string[]> }) => {
  const [albumArr, setAlbumArr] = useState<string[][]>();
  const { albumUrl, setAlbumUrl } = props;

  const [uploadSuccess, setUploadSuccess] = useState(true);

  useEffect(() => {
    const albumUrlArr = chunk(albumUrl, 4);

    setAlbumArr(albumUrlArr);
  }, [albumUrl.length]);

  return (
    <Col span={12}>
      <div
        className={'avatars_title'}
        style={{
          marginTop: 24,
        }}
      >
        场馆图集
      </div>

      <Space direction={'vertical'}>
        {albumArr?.map((item, rowIndex) => {
          return (
            <Space key={`${nanoid()}`}>
              {item.map((albumUrls, columnIndex) => {
                return (
                  <>
                    <div className={'img-div'}>
                      <img src={albumUrls} width={120} height={80} alt={''} />

                      <div className={'delete'}>
                        <CloseOutlined
                          onClick={async () => {
                            const sy = rowIndex * 4 + columnIndex;

                            const newAlbumUrls = Array.from(albumUrl);
                            newAlbumUrls.splice(sy, 1);

                            setAlbumUrl(newAlbumUrls);
                          }}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </Space>
          );
        })}
      </Space>

      <div />

      <Space style={{ marginTop: '10px' }}>
        <ProFormUploadButton
          name="butt"
          title={'上传场馆图集'}
          action={`${API_URL}/third-service/${version}/third/file/fileUpload`}
          onChange={(info) => {
            if (info.file?.status === 'uploading') {
              setUploadSuccess(false);
              return;
            }

            if (info.file?.status === 'done') {
              setUploadSuccess(true);
              const newArr = Array.from(albumUrl);

              newArr?.push(info.file?.response?.data);

              setAlbumUrl(newArr);
            }
          }}
          rules={[
            () => ({
              validator: () => {
                return uploadSuccess ? Promise.resolve() : Promise.reject('请等待文件上传完成');
              },
            }),
          ]}
          fieldProps={{
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
            },
            showUploadList: false,
          }}
        />
      </Space>
    </Col>
  );
};

export { AvatarView };
