declare namespace LessonType {
  export type LessonTypeItem = {
    //主键
    id?: string;
    //备注
    memo: string;
    //课程类型名称
    name: string;
    //课程类型
    parentId: string;
    //排序
    sort: number;
    //状态 0:停用 1：启用
    status: string;

    children: LessonTypeItem[];
  };
}
