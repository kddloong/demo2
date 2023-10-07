import { BellOutlined } from '@ant-design/icons';
import { Badge, Spin, Tabs } from 'antd';
import classNames from 'classnames';

import React from 'react';
import HeaderDropdown from '../HeaderDropdown';
import type { NoticeIconTabProps } from './NoticeList';
import NoticeList from './NoticeList';
import './styles.css';

const { TabPane } = Tabs;

export type NoticeIconProps = {
  count?: string | number;
  bell?: React.ReactNode;
  className?: string;
  loading?: boolean;
  onClear?: (tabName: string, tabKey: string) => void;
  onItemClick?: (item: API.NoticeIconItem, tabProps: NoticeIconTabProps) => void;
  onViewMore?: (tabProps: NoticeIconTabProps, e: MouseEvent) => void;
  onTabChange?: (tabTile: string) => void;
  style?: React.CSSProperties;
  onPopupVisibleChange?: (visible: boolean) => void;
  popupVisible?: boolean;
  clearText?: string;
  viewMoreText?: string;
  clearClose?: boolean;
  emptyImage?: string;
  children?: React.ReactElement<NoticeIconTabProps>[];
};

const NoticeIcon: React.FC<NoticeIconProps> & {
  Tab: typeof NoticeList;
} = (props) => {
  const getNotificationBox = (): React.ReactNode => {
    const {
      children,
      loading,
      onClear,
      onTabChange,
      onItemClick,
      onViewMore,
      clearText,
      viewMoreText,
    } = props;
    if (!children) {
      return null;
    }
    const panes: React.ReactNode[] = [];
    React.Children.forEach(children, (child: React.ReactElement<NoticeIconTabProps>): string => {
      if (!child) {
        return;
      }
      const { list, title, count, tabKey, showClear, showViewMore } = child.props;
      const len = list && list.length ? list.length : 0;
      const msgCount = count || count === 0 ? count : len;

      const tabTitle: string =
        msgCount > 999 ? `${title} (999+)` : msgCount > 0 ? `${title} (${msgCount})` : title;

      panes.push(
        <TabPane tab={tabTitle} key={tabKey}>
          <NoticeList
            clearText={child?.props?.clearText}
            viewMoreText={viewMoreText}
            list={list}
            tabKey={tabKey}
            onClear={(): void => child.props?.onClear && child.props?.onClear()}
            onItemClick={(item): void => {
              child.props?.onItemClick?.(item);
            }}
            onViewMore={(event): void =>
              child?.props?.onViewMore && child?.props?.onViewMore(child.props, event)
            }
            showClear={showClear}
            showViewMore={showViewMore}
            title={title}
          />
        </TabPane>,
      );
    });
    return (
      <>
        <Spin spinning={loading} delay={300}>
          <Tabs className={'tabs'} onChange={onTabChange}>
            {panes}
          </Tabs>
        </Spin>
      </>
    );
  };

  const { className, count, bell } = props;

  const noticeButtonClass = classNames(className, 'noticeButton');
  const notificationBox = getNotificationBox();
  const NoticeBellIcon = bell || <BellOutlined className={'icon'} />;
  const trigger = (
    <span className={classNames(noticeButtonClass)}>
      <Badge count={count} style={{ boxShadow: 'none' }} className={'badge'}>
        {NoticeBellIcon}
      </Badge>
    </span>
  );
  if (!notificationBox) {
    return trigger;
  }

  return (
    <HeaderDropdown
      placement="bottomRight"
      overlay={notificationBox}
      overlayClassName={'popover myPopover'}
      trigger={['hover']}
    >
      {trigger}
    </HeaderDropdown>
  );
};

NoticeIcon.defaultProps = {
  emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
};

NoticeIcon.Tab = NoticeList;

export default NoticeIcon;
