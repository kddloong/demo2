export type ColumnPartType = {
  // 描述
  description: string;
  id: string;
  // 上级栏目id
  parentId: string;
  // 排序
  sort: string;
  // 状态 0：草稿 1：上线 2：下线
  status: string;
  // 标题
  title: string;
  // 类型 0：单文章 1：文章列表 2：图文列表
  type: string;
};
