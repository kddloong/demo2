import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { TicketSetting } from '../../../types/ticket/tickets';
import { handleFetchVenueTicketsList } from '@/utils/ticket/tickets';

export const useTicketsSettingList = (venueId: string, refresh: boolean) => {
  const [data, setData] = useState<TicketSetting.BaseTicketParams[]>();

  useAsyncEffect(async () => {
    const result = await handleFetchVenueTicketsList(venueId);

    if (result.success) {
      setData(result.data || []);
    }
  }, [venueId, refresh]);

  return data;
};
