import { dashboardPopoverStyles } from '@/components/dashboard/DashboardModulePopoverContent/styles';
import { modalConfirm } from '@/utils/model-confirm';
import { handleDeleteRowById } from '@/utils/deleteById';
import { CLIENT_VERSION as version } from '@/utils/utils';
import { FC } from 'react';

type DashboardModulePopoverContentProps = { moduleId: string; refreshDashboard: () => void };
const DashboardModulePopoverContent: FC<DashboardModulePopoverContentProps> = (props) => {
  const { styles } = dashboardPopoverStyles();

  const { moduleId, refreshDashboard } = props;

  return (
    <>
      {/*<div className={styles.divider}></div>*/}
      <div
        className={`${styles.item} ${styles.redText}`}
        onClick={async () => {
          await modalConfirm(
            '移除组件',
            '确定要移除该组件?可通过顶部的[添加组件]重新添加',
            async () => {
              const result = await handleDeleteRowById(
                `/user-service/${version}/sys/position/${moduleId}`,
              );

              if (result.success) {
                refreshDashboard?.();
              }
            },
          );
        }}
      >
        移除
      </div>
    </>
  );
};

export { DashboardModulePopoverContent };
