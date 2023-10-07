import { Switch } from 'antd';
import React, { Fragment, useRef } from 'react';
import {
  handleFetchMessageGroupList,
  handleMessageOff,
  handleMessageOn,
} from '@/utils/system-message/message';
import { ActionType, ProList } from '@ant-design/pro-components';
import './style.css';

const MyMessageSetting: React.FC = () => {
  const actionRef = useRef<ActionType>();

  function refreshTable() {
    actionRef.current?.reload();
  }

  return (
    <Fragment>
      <ProList<any>
        actionRef={actionRef}
        rowKey="name"
        request={async () => {
          return await handleFetchMessageGroupList();
        }}
        metas={{
          // dataIndex 对应后端的数据字段
          title: {
            dataIndex: 'name',
          },
          description: {
            dataIndex: 'description',
          },
          actions: {
            render: (text, row) => [
              <Switch
                key={row.id}
                checked={row.openStatus === '1'}
                onChange={async (checked: boolean) => {
                  const res = checked
                    ? await handleMessageOn(row.id)
                    : await handleMessageOff(row.id);
                  if (res.success) {
                    refreshTable();
                  }
                }}
              />,
            ],
          },
        }}
      />
    </Fragment>
  );
};

export default MyMessageSetting;
