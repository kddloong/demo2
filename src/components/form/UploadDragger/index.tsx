import type { UploadProps } from '@/components/form/UploadSingleImage';
import { CLIENT_VERSION as version, isImage } from '@/utils/utils';
import { ProFormUploadDragger } from '@ant-design/pro-components';
import { Form, Image } from 'antd';
import type { FC } from 'react';
import React, { useState } from 'react';
import './style.css';
import type { RcFile } from 'antd/lib/upload/interface';

type BeforeUploadValueType = void | boolean | string | Blob | File;

type UploadDraggerProps = Omit<UploadProps, 'form'> & {
  icon?: React.ReactNode;
  beforeUpload?: (
    file: RcFile,
    FileList: RcFile[],
  ) => BeforeUploadValueType | Promise<BeforeUploadValueType>;

  onChange?: (imageUrl: string) => void;
  className?: string;
};

const UploadDragger: FC<UploadDraggerProps> = (props) => {
  const {
    name,
    label,
    disabled,
    extra,
    showLayout = 'horizontal',
    noRule = false,
    icon = false,
    beforeUpload = () => true,
    onChange = () => {},
    className = '',
  } = props;

  const [visible, setVisible] = useState(false);

  const [imgStr, setImgStr] = useState('');

  const form = Form.useFormInstance();

  const [uploadSuccess, setUploadSuccess] = useState(true);

  return (
    <>
      {/*todo 修改样式*/}
      <ProFormUploadDragger
        name={name}
        label={label}
        max={1}
        icon={icon}
        className={`myDragger ${className}`}
        labelCol={showLayout === 'horizontal' ? undefined : { span: 24 }}
        extra={extra || false}
        disabled={disabled}
        action={`${API_URL}/third-service/${version}/third/file/fileUpload`}
        onChange={(info) => {
          if (info.file?.status === 'uploading') {
            setUploadSuccess(false);
            return;
          }

          if (info.file?.status === 'done') {
            setUploadSuccess(true);
            form.setFieldsValue({
              [`${name}`]: [
                {
                  uid: '1',
                  name: info.file?.response?.data,
                  url: info.file?.response?.data,
                  status: 'done',
                },
              ],
            });

            onChange?.(info.file?.response?.data);
          }
        }}
        fieldProps={{
          listType: 'picture-card',
          headers: {
            //@ts-ignore
            Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
          },
          onPreview: (file) => {
            if (file?.url) {
              if (isImage(file?.url)) {
                setImgStr(file.url as string);

                setVisible(true);
              } else {
                window.open(file.url, '_blank');
              }
            }
          },
          beforeUpload: beforeUpload,
        }}
        rules={
          noRule
            ? [
                () => ({
                  validator: () => {
                    return uploadSuccess ? Promise.resolve() : Promise.reject('请等待文件上传完成');
                  },
                }),
              ]
            : [
                () => ({
                  validator: () => {
                    return uploadSuccess ? Promise.resolve() : Promise.reject('请等待文件上传完成');
                  },
                }),
                {
                  required: true,
                  message: '请上传文件',
                },
              ]
        }
      />

      <Image
        width={200}
        style={{ display: 'none' }}
        src={imgStr}
        preview={{
          visible,
          src: imgStr,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </>
  );
};

export { UploadDragger };
