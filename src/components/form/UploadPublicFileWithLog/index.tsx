import type { UploadProps } from '@/components/form/UploadSingleImage';
import { CLIENT_VERSION as version, isImage, stringToCheckBox } from '@/utils/utils';
import { ProFormUploadButton } from '@ant-design/pro-components';
import { Form, Image } from 'antd';
import { useState } from 'react';

interface UploadMultipleImageProps extends UploadProps {
  maxLength?: null | number;
}

/**
 * 封装了一个ProFormUploadButton, 用于上传和展示多个图片
 * @date 2022-03-08 15:14:10
 * @param props
 * @constructor
 * @version 1.0.0
 */
const UploadPublicFileWithLog: React.FC<UploadMultipleImageProps> = (props) => {
  const {
    name,
    label,
    disabled,
    extra,
    showLayout = 'horizontal',
    noRule = false,
    type = 'picture-card',
    readonly = false,
    maxLength = null,
    extraParams = {},
  } = props;

  const form = Form.useFormInstance();

  const dataType = Object.prototype.toString.call(form.getFieldValue(name));

  const [visible, setVisible] = useState(false);

  const [imgStr, setImgStr] = useState('');

  const [uploadSuccess, setUploadSuccess] = useState(true);

  const maxConfig = (function getMaxConfig(disabledStatus: boolean) {
    return disabledStatus
      ? {
          max:
            dataType !== '[object Array]'
              ? stringToCheckBox(form.getFieldValue(name)).length
              : form.getFieldValue(name).length,
        }
      : {};
  })(disabled);

  const maxLength1 = (() => {
    return maxLength && Number(maxLength) > 0 ? { max: Number(maxLength) } : {};
  })();

  return (
    <>
      <ProFormUploadButton
        name={name}
        readonly={readonly}
        label={label}
        {...maxConfig}
        {...maxLength1}
        labelCol={showLayout === 'horizontal' ? undefined : { span: 24 }}
        extra={extra || false}
        disabled={disabled}
        listType={type}
        action={`${API_URL}/third-service/${version}/third/file/publicfileUploadWithLog`}
        onChange={(info) => {
          const images = form.getFieldValue(name);

          if (info.file?.status === 'uploading') {
            setUploadSuccess(false);
            return;
          }

          if (info.file?.status === 'done') {
            setUploadSuccess(true);
            images[images.length - 1] = {
              uid: `${images.length - 1}`,
              name: info.file?.response?.data.name,
              url: info.file?.response?.data.path,
              status: 'done',
            };

            form.setFieldsValue({
              [name]: images,
            });
          }
        }}
        fieldProps={{
          data: extraParams,
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
          beforeUpload: () => {
            // const isTxt = file.type === 'text/plain';
            // if (!isTxt) {
            //   message.error('请上传txt文件！');
            //   return isTxt || Upload.LIST_IGNORE;
            // }
            // return true;
          },
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

      {visible && (
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
      )}
    </>
  );
};

export { UploadPublicFileWithLog };
