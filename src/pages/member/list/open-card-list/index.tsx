import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { columns as userListColumns } from './columns';
import { useAccess, useModel } from '@umijs/max';
import { handleOpenCardList } from '@/utils/member/list/open-card';
import { CardReader } from '../../../../../types/device/encrypted-card/card-setting';
import { RequestTableParam } from '../../../../../types/utils';
import { setMemberCardNoColumn } from '@/utils/columnUtils';
import { WrapContainer } from '@/components/layout/WrapContainer';
import { Button, Space } from 'antd';
import { Access, history } from '@@/exports';
import { PlusOutlined } from '@ant-design/icons';

/**
 * 充值记录列表
 * @constructor
 */
const OpenCardList = () => {
  const actionRef = useRef<ActionType>();

  const access = useAccess();

  const { card } = useModel('readcard');

  const columns: ProColumns<OpenCard.OpenCardItem>[] = [
    setMemberCardNoColumn(card as CardReader.CardReaderSetting),
    ...userListColumns,
  ];

  return (
    <WrapContainer content={'在这里你可以查看所有会员开卡记录'}>
      <ProTable
        headerTitle={
          <Space>
            <Access
              key={'opencard-and-save'}
              accessible={!access?.['member:user-list:opencard-and-save']}
            >
              <Button
                type="primary"
                key="primary"
                onClick={() => {
                  // history.push('../invest/invest-card?type=add');
                  history.push('../invest/apply-for-member-card?type=add');
                }}
              >
                <PlusOutlined /> 新增用户及办卡
              </Button>
            </Access>
          </Space>
        }
        actionRef={actionRef}
        rowKey="id"
        request={async (params) => {
          return await handleOpenCardList({
            ...params,
            field: 'createDate',
            order: 'desc',
          } as RequestTableParam);
        }}
        columns={columns}
        search={
          !access?.['member:open-card:search']
            ? {
                defaultCollapsed: true,
                optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
              }
            : false
        }
      />
    </WrapContainer>
  );
};

export default OpenCardList;
