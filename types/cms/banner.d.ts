export type BannerType = {
  // 主键
  id: string;
  // 排序
  sort: string;
  imgUrl: string;
  // 状态 0：草稿 1：上线 2：下线
  status: string;
  // 副标题
  subTitle: string;
  // 标题
  title: string;
};
