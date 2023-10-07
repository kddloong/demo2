import { Avatar, List, Typography } from 'antd';

import classNames from 'classnames';
import React, { useEffect } from 'react';
import './styles.css';
import { removeHtmlTags } from '@/utils/utils';
import dayjs from 'dayjs';
import { useSafeState } from 'ahooks';
import relativeTime from 'dayjs/plugin/relativeTime';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.extend(localeData);

const { Paragraph } = Typography;

export type NoticeIconTabProps = {
  count?: number | string;
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title: string;
  tabKey: API.NoticeIconItemType;
  onItemClick?: (item: API.NoticeIconItem) => void;
  onClear?: () => void;
  emptyText?: string;
  clearText?: string;
  viewMoreText?: string;
  list: API.NoticeIconItem[];
  onViewMore?: (e: any) => void;
};
const NoticeList: React.FC<NoticeIconTabProps> = ({
  list = [],
  onItemClick,
  onClear,
  title,
  onViewMore,
  emptyText,
  showClear = true,
  clearText,
  viewMoreText,
  showViewMore = false,
}) => {
  const [myCurrentDate, setMyCurrentDate] = useSafeState('');

  useEffect(() => {
    const currentDate = dayjs();
    setMyCurrentDate(currentDate);
  }, []);

  if (!list || list.length === 0) {
    return (
      <div className={'notFound'}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          alt="not found"
        />
        <div>{emptyText}</div>
      </div>
    );
  }

  dayjs.locale('zh-cn'); // 设置为中文
  return (
    <div>
      <List<API.NoticeIconItem>
        className={'list'}
        dataSource={list}
        renderItem={(item, i) => {
          const itemCls = classNames('item', {
            ['read']: item.isRead === '1',
          });

          const leftIcon = item.avatar ? (
            typeof item.avatar === 'string' ? (
              <Avatar className={'avatar'} src={item.avatar} />
            ) : (
              <span className={'iconElement'}>{item.avatar}</span>
            )
          ) : null;

          return (
            <List.Item
              className={itemCls}
              key={item.key || i}
              onClick={() => {
                onItemClick?.(item);
              }}
            >
              <List.Item.Meta
                className={'meta'}
                avatar={leftIcon}
                title={
                  <div className={'title'} style={{ fontWeight: 'bold' }}>
                    {item.title}
                    <div className={'extra'}>{item.extra}</div>
                  </div>
                }
                description={
                  <div>
                    <div className={'description'}>
                      <Paragraph ellipsis={true ? { rows: 2 } : false}>
                        {removeHtmlTags(item.content)}
                      </Paragraph>
                    </div>
                    <div className={'datetime'}>
                      {/*{moment(item.releaseTime, 'YYYY-MM-DD HH:mm').fromNow()}*/}
                      {dayjs(item.releaseTime, 'YYYY-MM-DD HH:mm').from(myCurrentDate)}
                    </div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
      <div className={'bottomBar'}>
        {showClear ? <div onClick={onClear}>{clearText}</div> : null}
        {showViewMore ? (
          <div
            onClick={(e) => {
              if (onViewMore) {
                onViewMore(e);
              }
            }}
          >
            {viewMoreText}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default NoticeList;
