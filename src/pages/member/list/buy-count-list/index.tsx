import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { columns as userListColumns } from './columns';
import { useAccess, useModel } from '@umijs/max';
import { handleBuyCountList } from '@/utils/member/list/buy-count';
import { setMemberCardNoColumn } from '@/utils/columnUtils';
import { CardReader } from '../../../../../types/device/encrypted-card/card-setting';
import { BuyCount } from '../../../../../types/member/list/buy-count';
import { WrapContainer } from '@/components/layout/WrapContainer';

/**
 * 充值记录列表
 * @constructor
 */
const BuyCountList = () => {
  const actionRef = useRef<ActionType>();

  const access = useAccess();

  const { card } = useModel('readcard');

  const columns: ProColumns<BuyCount.BuyCountItem>[] = [
    setMemberCardNoColumn(card as CardReader.CardReaderSetting),
    ...userListColumns,
  ];

  return (
    <WrapContainer content={'在这里你可以查看所有会员购次记录'}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        scroll={{ x: 1800 }}
        request={async (params) => {
          return await handleBuyCountList({
            ...params,
            field: 'createDate',
            order: 'desc',
          });
        }}
        columns={columns}
        search={
          !access?.['member:buy-count:search']
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

export default BuyCountList;
