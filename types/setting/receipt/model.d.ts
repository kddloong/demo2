import type { BaseResponseField, LabelValueItem } from '@/type/data';
import type { UploadFile } from 'antd/es/upload/interface';

declare namespace ReceiptModel {
  interface ModelItem {
    avatar: string | UploadFile[];
    clientId: string;
    deptId: string;
    email: string;
    id: string;
    nickName: string;
    password: string;
    phone: string;
    realName: string;
    sex: string;
    status: string;
    tenantId: string;
    userCode: string;
    userName: string;
    createDate: string;
    roleId: string | string[] | LabelValueItem[];
  }

  type ModelListItem = ModelItem & BaseResponseField;
}
