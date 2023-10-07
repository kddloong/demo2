import { FC, ReactNode, useState } from 'react';
import './styles.css';
import '@/styles/global.css';
import { EllipsisOutlined, HolderOutlined, SyncOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { DashboardModulePopoverContent } from '@/components/dashboard/DashboardModulePopoverContent';

type DashboardModuleWrapProps = {
  children: ReactNode;

  moduleId: string;

  refreshDashboard: () => void;
};

const DashboardModuleWrap: FC<DashboardModuleWrapProps> = (props) => {
  const { moduleId, refreshDashboard } = props;

  const [borderColor, setBorderColor] = useState('transparent');

  return (
    <>
      <div className="cg-dashboard-module">
        <div className="cg-dashboard-module-header">
          <div className="cg-dashboard-header-border" style={{ borderColor: borderColor }}></div>
          <div className="cg-dashboard-header-title mr-2 div_align-center flex-1 d-flex move-handler">
            <HolderOutlined className={'mr-1'} />
            <h2 className="ui small header flex-1">我的</h2>
          </div>
          <div className="cg-dashboard-header-action d-flex ml-auto div_align-center flex-shrink-0">
            <span className="action-item mr-2">
              <SyncOutlined style={{ fontSize: '18px' }} />
            </span>
            <span className={'action-item'}>
              <Popover
                arrow={false}
                content={
                  <DashboardModulePopoverContent
                    refreshDashboard={() => {
                      refreshDashboard?.();
                    }}
                    moduleId={moduleId}
                  />
                }
              >
                <EllipsisOutlined />
              </Popover>
            </span>
          </div>
        </div>
        <div className="cg-dashboard-module-body">
          <view className="cg-dashboard-module-collection-view">{props.children}</view>
        </div>
      </div>
    </>
  );
};

export { DashboardModuleWrap };
