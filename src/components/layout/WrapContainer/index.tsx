import { PageContainer } from '@ant-design/pro-components';
import { FC, ReactNode } from 'react';
import { layoutClassnames } from '@/components/layout/WrapContainer/styles';

interface WrapContainerProps {
  // 对该页面的描述
  content: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * 封装好的页头组件, 使用该组件创建表格页面
 * @param props
 * @constructor
 */
const WrapContainer: FC<WrapContainerProps> = (props) => {
  const { content, children, className = '' } = props;

  const { styles } = layoutClassnames();

  return (
    <>

        <PageContainer
          header={{
            style: {
              backgroundColor: '#fff',
            },
          }}
          content={content}
          className={`${styles['base-wrapper']} ${className}`}
        >
          {children}
        </PageContainer>
    </>
  );
};

export { WrapContainer };
