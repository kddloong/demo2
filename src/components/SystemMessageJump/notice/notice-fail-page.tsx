import React from 'react';
import MyIcon from '@/components/MyIcon';
import { history } from '@umijs/max';
import { Button, Card, Divider, Result, Space } from 'antd';

interface CertStatusProps {
  refuseReason?: string;
  releaseTime: string;
  noticeType: string;
  title: string;
  description: string;
  refuseSubtitle?: string;
}

const NoticeFailPage: React.FC<CertStatusProps> = (props) => {
  const { releaseTime, noticeType, title, description, refuseSubtitle } = props;

  function getExtra() {
    if (noticeType !== 'check') {
      return [
        <Button
          type="primary"
          key="console"
          onClick={() => {
            if (noticeType === 'enterprise-fail') {
              history.push('/enterprise/certif?isFrom=certi');
            }
          }}
        >
          修改信息
        </Button>,
      ];
    } else {
      return [];
    }
  }

  return (
    <Card>
      <Result
        status="error"
        title={title}
        subTitle={
          <div>
            <div> {refuseSubtitle} </div>
          </div>
        }
        extra={getExtra()}
      />

      <Divider></Divider>
      <div style={{ margin: ' 20px 0', fontSize: '20px' }}>您提交的内容有以下不予通过的内容：</div>
      <Space style={{ lineHeight: '18px' }}>
        <MyIcon type="icon-chahao" style={{ fontSize: '18px' }} />
        <div style={{ fontSize: '18px' }}>{description}</div>
      </Space>
      <Divider></Divider>
      <div style={{ marginTop: '20px' }}>审核时间： {releaseTime}</div>
    </Card>
  );
};

export default NoticeFailPage;
