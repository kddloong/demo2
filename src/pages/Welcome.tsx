import React, { FC, useEffect } from 'react';
import { useModel } from '@umijs/max';

const SystemDashboard: FC = () => {
  const { runUnreadDiffMessageCountModel } = useModel('notice');

  const { setInitialState, initialState } = useModel('@@initialState');

  useEffect(() => {
    runUnreadDiffMessageCountModel();
  }, []);

  return (
    <>
      <div>123123</div>
    </>
  );
};
export default SystemDashboard;
