import { BaseEmpty } from '@/components/card/BaseEmpty';

const a = () => {
  return (
    <>
      <BaseEmpty
        title={'暂无应用服务'}
        left={{
          title: '创建应用服务',
          description:
            '这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述',
        }}
        right={{
          title: '帮助你更好的创建应用服务',
          list: ['如何创建应用服务', '如何查看服务发布文档', '帮助文档'],
        }}
        submitter={{
          createButtonText: '创建场馆',
          onCreate: () => {
            console.log(`e`);
          },
          onShow: () => {
            console.log(`a`);
          },
        }}
      />
    </>
  );
};
