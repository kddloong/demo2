import { history } from '@@/exports';
import { message } from 'antd';
import NoticeIcon from './NoticeIcon';
import './styles.css';
import { useModel } from '@umijs/max';
import { handleReadAll } from '@/utils/system-message/system-message';
import { handleReadAnnouncementById } from '@/utils/system-message/announcement';
import ReadModal from '@/components/ReadModal';
import { useState } from 'react';
import { Announcement } from '../../../types/system-message/announcement/announcement';
import { handleReadInformById, handleReadMessageById } from '@/utils/system-message/inform';
import { Inform } from '../../../types/system-message/inform/inform';
import { handleReadMessage } from '@/utils/help-center/message/message';

const NoticeIconView = () => {
  const { messageData, refreshFun } = useModel('notice');

  const [announceModalOpen, setAnnounceModalOpen] = useState(false);
  const [informModalOpen, setInformModalOpen] = useState(false);
  const [announcementId, setAnnouncementId] = useState('');
  const [announcementData, setAnnouncementData] = useState<Announcement.AnnouncementDetail>();
  const [informData, setInformData] = useState<Inform.InformDetail>();

  const refreshNotice = async () => {
    refreshFun();
  };

  return (
    <>
      <NoticeIcon
        className={'action'}
        count={messageData?.totalNum || 0}
        loading={false}
        clearText="清空"
        viewMoreText="查看更多"
        onViewMore={() => message.info('Click on view more')}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="message"
          count={messageData?.mesNum || 0}
          list={messageData?.messages}
          onItemClick={async (messageItem) => {
            await handleReadMessageById(messageItem.id as string);
            await refreshNotice();
          }}
          title={`消息`}
          clearText={'全部已读'}
          onClear={async () => {
            await handleReadAll();
            await refreshNotice();
          }}
          emptyText="您已读完所有消息"
          showViewMore
          onViewMore={() => {
            history.push(`/enterprise/help/message`);
          }}
        />
        <NoticeIcon.Tab
          tabKey="inform"
          count={messageData?.notNum || 0}
          list={messageData?.notices}
          onItemClick={async (noticeItem) => {
            console.log(`noticeItem`, noticeItem);
            /**
             * 1000 工单回复
             * 1001 企业审核通过
             * 1002 企业审核不通过
             * 1003 运营端手动发的通知
             * 1004 用户更改密码
             *
             */
            if (noticeItem.category === '1000') {
              history.push(
                `/enterprise/work-order/manage/check?type=check&id=${noticeItem.detailId}`,
              );
              await handleReadMessage(noticeItem.id as string);
            } else if (noticeItem.category === '1001') {
              // 企业审核通过
              if (noticeItem.isRead === '0') {
                // 未读
                history.push(
                  `/system-message/notice-jump?noticeType=enterprise-success&releaseTime=${noticeItem.releaseTime}`,
                );
              } else {
                history.push(`/enterprise/certif`);
              }
              await handleReadMessage(noticeItem.id as string);
            } else if (noticeItem.category === '1002') {
              if (noticeItem.isRead === '0') {
                // 未读
                history.push(
                  `/system-message/notice-jump?noticeType=enterprise-fail&releaseTime=${noticeItem.releaseTime}&auditLogId=${noticeItem.auditLogId}`,
                );
              } else {
                history.push(`/enterprise/certif`);
              }
              await handleReadMessage(noticeItem.id as string);
            } else if (noticeItem.category === '1003') {
              const res = await handleReadInformById(noticeItem.id as string);
              const resData = res.data;
              setInformModalOpen(true);
              setInformData(resData);
            } else if (noticeItem.category === '1004') {
              const res = await handleReadInformById(noticeItem.id as string);
            }
            await refreshNotice();
          }}
          title="通知"
          clearText={'全部已读'}
          onClear={async () => {
            await handleReadAll();
            await refreshNotice();
          }}
          emptyText="您已读完所有通知"
          showViewMore
          onViewMore={() => {
            history.push(`/enterprise/help/message`);
          }}
        />

        <NoticeIcon.Tab
          tabKey="notification"
          count={messageData?.annNum || 0}
          list={messageData?.announcement}
          title="公告"
          clearText={'全部已读'}
          onClear={async () => {
            await handleReadAll();
            await refreshNotice();
          }}
          onItemClick={async (announcementItem) => {
            // 无论是否已读， 点击一条公告就调一次【读公告】接口
            const res = await handleReadAnnouncementById(announcementItem.id as string);
            const resData = res.data;
            setAnnouncementData(resData);
            setAnnounceModalOpen(true);
            setAnnouncementId(announcementItem.id as string);
            await refreshNotice();
          }}
          emptyText="你已查看所有公告"
          showViewMore
          onViewMore={() => {
            //  跳转到系统通知列表页面
            history.push(`/enterprise/help/message`);
          }}
        />
      </NoticeIcon>

      {announceModalOpen && (
        <ReadModal
          id={announcementId}
          readModalOpen={announceModalOpen}
          setReadModalOpen={setAnnounceModalOpen}
          modalData={announcementData}
        />
      )}
      {informModalOpen && (
        <ReadModal
          readModalOpen={informModalOpen}
          setReadModalOpen={setInformModalOpen}
          modalData={informData}
        />
      )}
    </>
  );
};
export default NoticeIconView;
