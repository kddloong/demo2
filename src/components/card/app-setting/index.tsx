import './styles.css';
import { FC, ReactNode } from 'react';

interface AppSettingProps {
  title: string;
  children: ReactNode;

  noBodyTopMargin?: boolean;

  noCardTopMargin?: boolean;

  extraNode?: ReactNode;
}

const AppSetting: FC<AppSettingProps> = (props) => {
  const {
    title,
    children,
    noBodyTopMargin = false,
    noCardTopMargin = false,
    extraNode = false,
  } = props;
  return (
    <>
      <div className={`setting-card ${noCardTopMargin ? 'no-padding' : ''}`}>
        <div className={'setting-card-header'}>
          <div className={'setting-card-header-left'}>{title}</div>
          <div className={'setting-card-header-right'}>{extraNode}</div>
        </div>
        <div className={`setting-card-body ${noBodyTopMargin ? 'no-padding' : ''}`}>{children}</div>
      </div>
    </>
  );
};

export { AppSetting };
