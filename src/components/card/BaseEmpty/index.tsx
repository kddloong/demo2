import { styled } from '@umijs/max';
import { Button, Divider, Space } from 'antd';
import './styles.css';
import { FC, ReactNode } from 'react';

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BaseEmptyTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 24px;
`;

const EmptyContentBox = styled.div`
  background-color: #fafafa;
  display: flex;
  padding: 40px 55px;
`;

const EmptyLeftContent = styled.div`
  display: flex;
  align-items: flex-start;
  text-align: left;
`;

const LeftContent = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const EmptyRightContent = styled.div`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
`;

const RightUL = styled.ul`
  text-align: left;
  color: grey;
  font-weight: normal;
  font-size: 14px;
  list-style-type: disc;
  list-style-position: inside;
  padding-inline-start: 0px;
  margin: 8px 0 0 0;
`;

interface BaseEmptyProps {
  title?: string;
  left?: {
    title?: string;
    description?: string;
  };
  right?: {
    title?: string;
    list?: string[];
  };
  submitter?:
    | {
        createButtonText?: string;
        onCreate?: () => Promise<void> | void;
        showButtonText?: string;
        onShow?: () => Promise<void> | void;
      } & { render?: false | (() => ReactNode) };
}

const BaseEmpty: FC<BaseEmptyProps> = (props) => {
  const {
    left: {
      title: leftTitle = '创建应用服务',
      description:
        leftDescription = '这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述',
    } = {},
    right: {
      title: rightTitle = '帮助你更好的创建应用服务',
      list: rightList = ['如何创建应用服务', '如何查看服务发布文档', '帮助文档'],
    } = {},
    submitter: {
      createButtonText = '创建应用',
      render = false,
      showButtonText = '查看demo',
      onCreate = () => {},
      onShow = () => {},
    } = {},
    title = '暂无应用服务',
  } = props;

  return (
    <>
      <EmptyContainer>
        <BaseEmptyTitle>{title}</BaseEmptyTitle>

        <EmptyContentBox className={'vertical'}>
          <EmptyLeftContent>
            <div></div>
            <LeftContent className={'left-content'}>
              <div>{leftTitle}</div>
              <div className={'left-description'}>{leftDescription}</div>
              <div style={{ marginTop: 8 }}>
                <Space style={{ marginTop: 8 }}>
                  {render ? (
                    render?.()
                  ) : (
                    <>
                      <Button
                        type={'primary'}
                        onClick={async () => {
                          await onCreate();
                        }}
                      >
                        {createButtonText}
                      </Button>
                      <Button
                        onClick={async () => {
                          await onShow();
                        }}
                      >
                        {showButtonText}
                      </Button>
                    </>
                  )}
                </Space>
              </div>
            </LeftContent>
          </EmptyLeftContent>
          <Divider type={'vertical'} style={{ margin: '0 35px' }} />
          <EmptyRightContent>
            <div className="right-title">{rightTitle}</div>
            <RightUL>
              {rightList.map((item) => (
                <li>{item}</li>
              ))}
            </RightUL>
          </EmptyRightContent>
        </EmptyContentBox>
      </EmptyContainer>
    </>
  );
};

export { BaseEmpty };
