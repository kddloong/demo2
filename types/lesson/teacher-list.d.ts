import { UploadFile } from 'antd/es/upload/interface';

declare namespace Teacher {
  export type TeacherItem = {
    name: string;
    gender: string;
    phoneNo: string;
    honour?: string; //取得荣誉
    imageUrls: string;
    specialty?: string; // 专业领域
    status: string; // 0离职， 1在职
    tags?: string;
    avatarUrl: string;
    id?: string;
    venueId: string;
  };

  export type TeacherFormItem = Omit<TeacherItem, 'avatarUrl' | 'tags' | 'imageUrls'> & {
    avatarUrl: UploadFile[];
    tags: string[];
    imageUrls: UploadFile[];
  };
}
