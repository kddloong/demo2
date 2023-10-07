import { CLIENT_VERSION as version } from '@/utils/utils';
import { RequestResult } from 'types/utils';
import { deleteRes, get, post } from '@/services/request/request_tools';
import { TicketSetting } from '../../../types/ticket/tickets';

/**
 * @author ssss
 * @param venueId
 */
export async function fetchVenueTicketsList(
  venueId: string,
): Promise<RequestResult<TicketSetting.BaseTicketParams[]>> {
  return get(`/venue-service/${version}/cgs/venue/operate/venueTicketList`, { venueId });
}

/**
 * @author ssss
 * @param params
 */
export async function saveTicketSetting(params: TicketSetting.SaveParams): Promise<RequestResult> {
  return post(`/venue-service/${version}/cgs/venue/operate/saveTicket`, params);
}

/**
 * @author ssss
 * @param id
 */
export async function deleteTicketSetting(id: string): Promise<RequestResult> {
  return deleteRes(`/venue-service/${version}/cgs/venue/operate/deleteVenueTicket`, { id });
}

/**
 * @author ssss
 * @param id
 */
export async function fetchVenueTicketSettingById(
  id: string,
): Promise<RequestResult<TicketSetting.ReturnParams>> {
  return get(`/venue-service/${version}/cgs/venue/operate/getTicket/${id}`, {});
}

/**
 * 改变票务设置的状态
 * @author sssss
 * @param id
 * @param action
 */
export async function changeVenueTicketSettingStatus(
  id: string,
  action: 'start' | 'stop',
): Promise<RequestResult> {
  return post(`/venue-service/${version}/cgs/venue/operate/${action}VenueTicket`, { id });
}
