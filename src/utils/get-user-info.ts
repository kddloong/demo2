import { terminal } from '@@/core/terminal';
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import { history } from '@@/core/history';
import { sendLog } from '@/utils/utils';
import { handleFetchBizInfo } from '@/utils/biz';

export const fetchUserInfo = async () => {
  sendLog('execute get user info...');
  try {
    const msg = await queryCurrentUser({
      skipErrorHandler: true,
    });

    const bizMsg = await handleFetchBizInfo(msg.data.tenantId);

    terminal.log(bizMsg);

    sendLog('fetch user info success!');

    // 多处用到这个id
    window.localStorage.setItem('currentUserId', msg.data.id);

    return { ...msg.data, logo: bizMsg?.data?.logo };
  } catch (error) {
    sendLog('fetch user info error!!!');

    localStorage.removeItem('accessToken');
    history.push('/user/login');
  }
  return undefined;
};
