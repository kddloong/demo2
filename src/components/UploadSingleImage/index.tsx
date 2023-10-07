import { CLIENT_VERSION as version, isImage } from '@/utils/utils';
import { ProFormUploadButton } from '@ant-design/pro-components';
import { Image } from 'antd';
import React, { useState } from 'react';
import type { RcFile } from 'antd/lib/upload/interface';

type BeforeUploadValueType = void | boolean | string | Blob | File;

interface UploadProps {
  name: string;
  label: string;
  form: any;
  disabled: boolean;
  extra?: React.ReactNode | string;
  type?: 'text' | 'picture' | 'picture-card';
  showLayout?: '' | 'horizontal';
  hidden?: boolean;
  // 是否限制必填
  noRule?: boolean;
  readonly?: boolean;
}

/**
 * 封装了一个ProFormUploadButton, 用于上传和展示一张图片
 * @date 2022-03-08 15:04:10
 * @param props
 * @constructor
 * @version 1.0.0
 */
const UploadSingleImage: React.FC<
  UploadProps & {
    beforeUpload?: (
      file: RcFile,
      FileList: RcFile[],
    ) => BeforeUploadValueType | Promise<BeforeUploadValueType>;
  }
> = (props) => {
  const {
    name,
    label,
    form,
    disabled,
    extra,
    type = 'picture-card',
    showLayout = '',
    hidden = false,
    noRule = false,
    readonly = false,
    beforeUpload = () => {
      return true;
    },
  } = props;

  const [visible, setVisible] = useState(false);

  const [imgStr, setImgStr] = useState('');

  const [uploadSuccess, setUploadSuccess] = useState(true);

  return (
    <>
      <ProFormUploadButton
        name={name}
        readonly={readonly}
        label={label}
        labelCol={showLayout === 'horizontal' ? undefined : { span: 24 }}
        max={1}
        hidden={hidden}
        extra={extra || false}
        disabled={disabled}
        listType={type}
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
          }
        }}
        fieldProps={{
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
          beforeUpload,
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

export { UploadSingleImage, UploadProps };
