import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';
import { columns as areaVenueCheckListColumns } from './columns';
import { useAccess } from '@umijs/max';
import { venueIdFormSelect } from '@/utils/columnUtils';
import { fromSetting } from '@/utils/enums';
import { handleAreaCheckList } from '@/utils/ticket/check';
import { VenueCheck } from '../../../../types/ticket/check';
import { WrapContainer } from '@/components/layout/WrapContainer';

/**
 * 查看场地的订单的核销明细
 * @date 2022-01-21 16:16:38
 * @returns {JSX.Element}
 * @constructor
 */
const VenueCheckList = () => {
  const actionRef = useRef();

  const access = useAccess();

  const columns = [
    { ...(venueIdFormSelect as ProColumns), width: '8%', title: '场地项目名称' },
    ...areaVenueCheckListColumns,
  ];

  return (
    <WrapContainer content={'当前用户池的所有用户，在这里你可以对用户进行统一管理。'}>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        scroll={{ x: 1500 }}
        request={async (params) => {
          return await handleAreaCheckList({
            ...params,
            field: 'createDate',
            order: 'desc',
            orderItem: fromSetting.FROM_VENUE,
          } as VenueCheck.VenueCheckDataParams);
        }}
        columns={columns}
        search={
          access?.['ticket:detail:check-search']
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

export default VenueCheckList;
