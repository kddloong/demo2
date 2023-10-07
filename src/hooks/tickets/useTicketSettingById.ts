import { useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import { stringToCheckBox } from '@/utils/utils';
import { handleFetchVenueTicketSettingById } from '@/utils/ticket/tickets';
import { TicketSetting } from '../../../types/ticket/tickets';

export const useTicketSettingById = (type: string, settingId: string, visible: boolean) => {
  const [settingData, setSettingData] = useState({});

  const [formatSettingData, setFormatSettingData] = useState({});

  useAsyncEffect(async () => {
    if (type === 'edit' && visible) {
      const result = await handleFetchVenueTicketSettingById(settingId);

      if (result.success) {
        const resultData = result.data as TicketSetting.ReturnParams;

        if (resultData.imageUrl) {
          Object.assign(resultData, {
            imageUrl: stringToCheckBox(resultData.imageUrl as string).map((item, index) => {
              return {
                uid: index,
                url: item,
                status: 'done',
                name: index,
              };
            }),
          });
        }

        if (resultData.limitPersonId) {
          Object.assign(resultData, {
            limitPersonId: stringToCheckBox(resultData.limitPersonId),
          });
        }

        const { ticketWeeks, ticketDays, ticketHolidays, ...others } = resultData;

        const newData = others;

        if (resultData.ticketWeeks) {
          const weekResult = resultData.ticketWeeks.map((week) => {
            return {
              specialId: week.id,
              price: week.price,
              startTime: week.startTime,
              endTime: week.endTime,
              week: week.week,
              venueId: week.venueId,
              type: week.type,
            };
          });

          Object.assign(newData, {
            specials: weekResult,
            originWeekSpecials: weekResult,
            originDaySpecials: [],
          });
        }

        if (resultData.ticketDays) {
          const dayResult = resultData.ticketDays.map((day) => {
            return {
              specialId: day.id,
              price: day.price,
              startTime: day.startTime,
              endTime: day.endTime,
              endDate: day.endDate,
              startDate: day.startDate as string,
              venueId: day.venueId,
              type: day.type,
            };
          });

          Object.assign(newData, {
            specials: dayResult,
            originDaySpecials: dayResult,
            originWeekSpecials: [],
          });
        }

        if (resultData.ticketHolidays) {
          const dayResult = resultData.ticketHolidays.map((holiday) => {
            return {
              holidayId: holiday.id,
              holidayConfigId: holiday.holidayConfigId,
              price: holiday.price,
              venueId: holiday.venueId,
            };
          });

          Object.assign(newData, { holidays: dayResult });
        }

        setFormatSettingData(newData);

        setSettingData(result.data);
      }
    }
  }, [settingId, visible]);

  return { originData: settingData, showData: formatSettingData };
};
