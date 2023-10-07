import { history } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import React, { useState } from 'react';

type StatusSuccessProps = {
  releaseTime?: string;
  noticeType: string;
  title: string;
  subTitle: string;
  btnText?: string;
};

const NoticeSuccessPage: React.FC<StatusSuccessProps> = (props) => {
  const { releaseTime, noticeType, title, subTitle, btnText = '确认' } = props;

  const [checkUserId, setCheckUserId] = useState('');
  const [reportOpen, setReportOpen] = useState(false);

  // useAsyncEffect(async () => {
  //   if (deviceId) {
  //     const res = await getSingleDeviceById(deviceId as string);
  //     const resData = res.data as DeviceDataType.DeviceDataTypeDetail;
  //     setCheckUserId(resData.checkUser);
  //   }
  // }, []);

  return (
    <>
      <Card>
        <Result
          status="success"
          title={title}
          subTitle={
            <div>
              <div style={{ marginTop: '20px' }}>审核时间： {releaseTime}</div>
              <div>{subTitle}</div>
            </div>
          }
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                if (noticeType === 'enterprise-success') {
                  history.push(`/enterprise/certif`);
                }
              }}
            >
              {btnText}
            </Button>,
          ]}
        />
      </Card>
    </>
  );
};

export default NoticeSuccessPage;
