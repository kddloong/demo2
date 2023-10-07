import { history } from '@@/core/history';
import {
  BuildOutlined,
  DownOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import '@umijs/max';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import React from 'react';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        onClick={() => {
          history.push('/helpCenter/message');
        }}
      >
        客服咨询
      </a>
    ),
    icon: <MessageOutlined />,
  },
  {
    key: '2',
    label: (
      <a
        onClick={() => {
          history.push('/helpCenter/workOrder');
        }}
      >
        帮助文档
      </a>
    ),
    icon: <BuildOutlined />,
  },
  {
    key: '3',
    label: (
      <a
        onClick={() => {
          history.push('/enterprise/work-order/manage/add?type=create');
        }}
      >
        新建工单
      </a>
    ),
    icon: <QuestionCircleOutlined />,
  },
];
export const RightHelp: React.FC = () => {
  return (
    <>
      <Dropdown menu={{ items }}>
        <a
          style={{ fontSize: 14, color: '#585858', marginLeft: 12 }}
          onClick={(e) => e.preventDefault()}
        >
          帮助 <DownOutlined style={{ color: '#585858', marginTop: 24 }} />
        </a>
      </Dropdown>
    </>
  );
};
