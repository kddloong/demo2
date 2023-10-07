import { uploadFaceInfoClassnames } from '@/pages/member/invest/apply-for-member-card/styles';
import { Button, Checkbox, message, Space } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useContext, useRef, useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { handleFetchFaceDeviceForMember } from '@/utils/device/face/list';
import { LabelValueItem } from '../../../../../../../types/utils';
import BigNumber from 'bignumber.js';
import { postFile } from '@/services/request/request_tools';
import { CLIENT_VERSION as version, DATE_TIME_FORMAT, sendLog } from '@/utils/utils';
import dayjs from 'dayjs';
import { ApplyMemberCardContext } from '@/pages/member/invest/apply-for-member-card/context';
import {
  handleSendFaceInfoToDevice,
  handleSendFaceInfoToPerson,
  handleSendFaceInfoToPersonFace,
} from '@/utils/device/face/config';
import { clone, zipObject } from 'lodash';

const UploadFaceInfo = () => {
  const { styles } = uploadFaceInfoClassnames();

  const { memberId } = useContext(ApplyMemberCardContext);

  const [faceDeviceList, setFaceDeviceList] = useState<LabelValueItem[]>([]);

  const [isVideo, setIsVideo] = useState(true);

  const [checkedValue, setCheckedValue] = useState<string[]>([]);

  const [imageUrl, setImageUrl] = useState('');

  const [sendInfo, setSendInfo] = useState<Record<number, [boolean, boolean, boolean]> | null>(
    null,
  );

  useAsyncEffect(async () => {
    const result = await handleFetchFaceDeviceForMember();

    if (result.success) {
      setFaceDeviceList(result.data);

      if (result.data?.length > 0) {
        const sendList = Array.from({ length: result.data.length }, (n, v) => v);

        const sendRecord = result.data.map(() => [false, false, false]);

        setSendInfo(zipObject(sendList, sendRecord) as Record<number, [boolean, boolean, boolean]>);
      } else {
        setSendInfo({ 0: [false, false, false] });
      }
    }
  }, []);

  const videoRef = useRef<HTMLVideoElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  function successFunc(mediaStream) {
    if (videoRef) {
      const video = videoRef.current;

      if (video && 'srcObject' in video) {
        video.srcObject = mediaStream;
        video.onloadedmetadata = () => {
          video?.play();
        };
      }
    }
  }

  function errorFunc(err) {
    const newMessage = err.message || err;
    const response = {
      'permission denied': '浏览器禁止本页面使用摄像头，请开启相关的权限',
      'requested device not found': '未检测到摄像头',
    };
    message.warning(response[newMessage.toLowerCase()] || '未知错误');
  }

  const openMedia = () => {
    const opt = {
      audio: false,
      video: {
        width: 460,
        height: 300,
      },
    };

    if ('mediaDevices' in navigator) {
      navigator?.mediaDevices?.getUserMedia(opt)?.then(successFunc).catch(errorFunc) ??
        message.warning('请检查摄像头!');
    } else {
      console.log(`浏览器限制摄像头权限， 请检查`);
    }
  };

  const closeMedia = () => {
    const video = videoRef.current;

    const stream = video?.srcObject;

    if (video && stream) {
      if ('getTracks' in stream) {
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop();
        });
      }
    }
  };

  async function uploadFaceInfo(blob: Blob) {
    return await postFile(`${API_URL}/third-service/${version}/third/file/fileUpload`, {
      files: blob,
    });
  }

  function dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(',');

    if (arr.length <= 0) {
      return;
    }
    const mime = arr[0].match(/:(.*?);/)[1];

    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  const getImg = async () => {
    const video = videoRef.current;

    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    if (!video) {
      return;
    }

    canvas.width = 460;
    canvas.height = 300;

    const ctx = canvas?.getContext('2d');

    if (!ctx) {
      message.warning('获取canvas2d失败');
      return;
    }

    ctx.drawImage(video, 0, 0, 460, 300, 0, 0, 460, 300);

    //将图片资源转换为字符串
    const imgStr11 = canvas.toDataURL('image/jpeg', 0.9);

    let $Blob = dataURLtoBlob(imgStr11);

    // 这个图片多少kb
    const size = new BigNumber($Blob?.size).div(1024).toNumber();

    if (size > 200) {
      const rate = new BigNumber(190).div(size).dp(2);

      const newImageStr = canvas.toDataURL('image/jpeg', rate);

      $Blob = dataURLtoBlob(newImageStr);
    }

    if ($Blob) {
      const result = await uploadFaceInfo($Blob);

      if (result?.success) {
        setImageUrl(result?.data);

        closeMedia();
      }
    } else {
      sendLog(`${dayjs().format(DATE_TIME_FORMAT)}获取文件对象失败`);
    }
  };

  async function send() {
    if (!memberId) {
      return;
    }

    for (let i = 0; i < checkedValue.length; i++) {
      const baseParams = {
        memberId,
        devIndexIds: checkedValue[i],
      };
      const deviceResult = await handleSendFaceInfoToDevice(baseParams);

      const personResult = await handleSendFaceInfoToPerson(baseParams);

      const faceResult = await handleSendFaceInfoToPersonFace({ ...baseParams, imageUrl });

      const newSendInfo = clone(sendInfo);

      if (!!newSendInfo) {
        // newSendInfo[i] = [deviceResult.success, personResult.success, faceResult.success];
        newSendInfo[i] = [deviceResult.success, personResult.success, faceResult.success];
        setSendInfo(newSendInfo);
      } else {
        sendLog(`人脸下发信息获取失败!`);
      }
    }
  }

  return (
    <>
      <div className={styles['face-box']}>
        <div className={styles['image-box']}>
          <div className="header">
            <p>请将人脸对准屏幕并保持不动</p>
          </div>
          <div className="body">
            {!isVideo ? (
              <image />
            ) : (
              <>
                <video
                  ref={videoRef}
                  id={'player'}
                  style={{
                    width: '460px',
                    height: '300px',
                  }}
                  autoPlay
                  playsInline
                />
                <canvas
                  ref={canvasRef}
                  style={{
                    backgroundColor: '#000000',
                    visibility: 'hidden',
                  }}
                  id={'picture'}
                />
              </>
            )}
          </div>
          <div className="footer">
            <p>人脸上传成功</p>
          </div>
        </div>
        <div className={styles['button-box']}>
          <Space>
            <Button type={'primary'} onClick={async () => send()}>
              下发至人脸设备
            </Button>
            <Button type={'primary'} onClick={() => openMedia()}>
              打开摄像头
            </Button>
            <Button onClick={() => getImg()}>拍照</Button>
          </Space>
        </div>
        <div className={styles['ability-box']}>
          {faceDeviceList?.map((item, faceIndex) => {
            return (
              <div className={styles['ability-row']}>
                <div className={'item-title'}>
                  <Checkbox
                    onChange={(e) => {
                      const status = e.target.checked;

                      if (status) {
                        setCheckedValue((origin) => origin.concat(item.value));
                      } else {
                        setCheckedValue(checkedValue.filter((value1) => value1 !== item.value));
                      }
                    }}
                  />
                  {item.label}
                </div>
                <div>
                  {sendInfo?.[faceIndex]?.[0] ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                  用户下发成功
                </div>
                <div>
                  {sendInfo?.[faceIndex]?.[1] ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                  会员卡下发成功
                </div>
                <div>
                  {sendInfo?.[faceIndex]?.[2] ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                  人脸下发成功
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UploadFaceInfo;
