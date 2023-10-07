// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;

    id?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type Valid = {
    validCode?: string;
  };

  type ClientId = {
    clientId?: string;
  };

  type RedirectUrl = {
    redirect_uri?: string;
  };

  type PasswordLoginParams = {
    username?: string;
    password?: string;
    deviceId?: string;
  } & Valid;

  type ClientPasswordLoginParams = PasswordLoginParams & ClientId & RedirectUrl;

  type PhoneLoginParams = {
    mobile?: string;
  } & Valid &
    ClientId &
    RedirectUrl;

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type AnnData = {
    announcementId: string;
    content: string;
    id: string;
    isRead: string;
    readTime: string;
    releaseTime: string;
    status: string;
    title: string;
    type: string;
  };

  type MesData = {};
  type NotData = {
    auditLogId: string;
    category: string;
    content: string;
    detailId: string;
    id: string;
    isRead: string;
    releaseTime: string;
    tenantId: string;
    title: string;
    type: string;
  };

  type MessageData = {
    annNum: number;
    announcement: AnnData[];
    mesNum: number;
    messages: MesData[];
    notNum: 4;
    notices: NotData[];
    totalNum: number;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event' | 'inform';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
    category?: string;
    detailId?: string;
    messageData: MessageData;
    isRead?: string;
    releaseTime?: string;
    auditLogId?: string;
  };
}
