import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { beforeUpload, CLIENT_VERSION as version, getBase64 } from '@/utils/utils';
import { TypeUtil } from 'types/utils';
import { createStyles } from 'antd-style';

interface UploadAvatarProps {
  imageUrl: string;

  listType?: 'picture-card' | 'picture-circle';

  setImageUrl: TypeUtil.SetState<string>;

  width?: number;

  height?: number;

  success?: (url: string) => Promise<void> | void;
}

const UploadAvatar: React.FC<UploadAvatarProps> = (props) => {
  const {
    imageUrl,
    setImageUrl,
    listType = 'picture-card',
    height = 75,
    width = 75,
    success = () => {},
  } = props;
  const [loading, setLoading] = useState(false);

  const { styles } = createStyles(({ css }) => ({
    [`avatar-upload`]: css`
      display: flex !important;
      justify-content: center;

      img {
        border-radius: 50%;
      }

      &.ant-upload-wrapper.ant-upload-picture-card-wrapper .ant-upload.ant-upload-select {
        width: ${width}px;
        height: ${height}px;

        margin-inline-end: 0;
        margin-bottom: 0;
        overflow: hidden;
      }
    `,
  }))();

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, () => {
        setLoading(false);
        setImageUrl(info.file.response.data);
      });
      const newUrl = info.file.response.data;

      success(newUrl);
    }
  };

  const uploadButton = <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>;

  return (
    <>
      <Upload
        name="avatar"
        action={`${API_URL}/third-service/${version}/third/file/fileUpload`}
        listType={listType}
        className={styles[`avatar-upload`]}
        showUploadList={false}
        headers={{
          Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
        }}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </>
  );
};

export { UploadAvatar };
