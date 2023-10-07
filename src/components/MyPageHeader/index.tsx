import { PageHeader } from '@ant-design/pro-components';
import React, { FC } from 'react';
import '@/styles/global.css';
import { history } from '@umijs/max';

interface MyPageHeaderProps {
  backFunc?: () => void;
  subTitle?: string;
}

const MyPageHeader: FC<MyPageHeaderProps> = (props) => {
  const {
    backFunc = () => {
      history.back();
    },
    subTitle = '返回',
  } = props;

  return (
    <>
      <div onClick={() => backFunc()} style={{ cursor: 'pointer' }}>
        <PageHeader className={'global_user-page-header'} subTitle={subTitle} onBack={() => {}} />
      </div>
    </>
  );
};

export { MyPageHeader };
