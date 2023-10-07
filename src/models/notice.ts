import { useRequest } from '@@/exports';
import { useState } from 'react';
import { handleFetchUnreadDiffMessageCount } from '@/utils/system-message/system-message';
import { localStorageAccessToken } from '@/utils/utils';

export default function Notice() {
  const {
    data: messageData,
    refresh: refreshFun,
    run: runUnreadDiffMessageCountModel,
  } = useRequest(handleFetchUnreadDiffMessageCount, {
    manual: true, // 手动触发，避免在未登录之前就调用
    pollingInterval: localStorageAccessToken ? 18000 : undefined, // token存在的前提下每三分钟调一次接口
  });

  const [count, setCount] = useState(0);
  return { count: count, setCount, messageData, refreshFun, runUnreadDiffMessageCountModel };
}
