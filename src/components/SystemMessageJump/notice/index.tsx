import React, { useEffect, useState } from 'react';
import { useSearchParams } from '@umijs/max';
import NoticeSuccessPage from '@/components/SystemMessageJump/notice/notice-success-page';
import NoticeFailPage from '@/components/SystemMessageJump/notice/notice-fail-page';
import { useAsyncEffect } from 'ahooks';
import { handleFetchInformAudit } from '@/utils/system-message/inform';
import { Inform } from '../../../../types/system-message/inform/inform';

const NoticeJumpIndex: React.FC = () => {
  const [noticeType, setNoticeType] = useState('');

  const [auditTime, setAuditTime] = useState('');
  const [refuseDesc, setRefuseDesc] = useState('');

  const [searchParams] = useSearchParams();
  const type = searchParams.get('noticeType');
  const releaseTime = searchParams.get('releaseTime');
  const auditLogId = searchParams.get('auditLogId');

  useEffect(() => {
    setNoticeType(type as string);
  }, [type]);

  // 这个接口用于获取企业审核不通过的拒绝原因
  useAsyncEffect(async () => {
    if (auditLogId) {
      const res = await handleFetchInformAudit(auditLogId);
      const resData = res.data as Inform.InformLogType;
      setAuditTime(resData.auditTime);
      setRefuseDesc(resData.description);
    }
  }, [auditLogId]);

  return (
    <>
      {noticeType === 'enterprise-success' && (
        <NoticeSuccessPage
          releaseTime={releaseTime as string}
          title={'企业认证信息审核通过'}
          noticeType={noticeType}
          subTitle={'恭喜你的企业信息认证通过，点击确认通过查看认证内容。'}
        />
      )}

      {noticeType === 'enterprise-fail' && (
        <NoticeFailPage
          title={'企业认证信息审核未通过'}
          noticeType={noticeType}
          releaseTime={auditTime}
          refuseSubtitle={'请仔细查看不予通过的内容，并再次提交审核'}
          description={refuseDesc}
        />
      )}
    </>
  );
};
export default NoticeJumpIndex;
