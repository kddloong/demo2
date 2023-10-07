import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { columns as userListColumns } from './columns';
import { useAccess, useModel } from '@umijs/max';
import { handleCutCountList } from '@/utils/member/list/cut-count';
import { setMemberCardNoColumn } from '@/utils/columnUtils';
import { CardReader } from '../../../../../types/device/encrypted-card/card-setting';
import { RequestTableParam } from '../../../../../types/utils';
import { WrapContainer } from '@/components/layout/WrapContainer';

/**
 * 扣减次数记录列表
 * @constructor
 */
const CutCountList = () => {
  const actionRef = useRef<ActionType>();

  const access = useAccess();

  const { card } = useModel('readcard');

  const columns: ProColumns<CutCount.CutCountListItem>[] = [
    setMemberCardNoColumn(card as CardReader.CardReaderSetting),
    ...userListColumns,
  ];

  return (
    <WrapContainer content={'在这里你可以查看所有会员扣减次数记录'}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        scroll={{ x: 1800 }}
        request={async (params) => {
          return await handleCutCountList({
            ...params,
            field: 'createDate',
            order: 'desc',
          } as RequestTableParam);
        }}
        columns={columns}
        search={
          !access?.['member:cut-count:search']
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

export default CutCountList;
