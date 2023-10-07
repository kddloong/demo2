import { styled } from '@umijs/max';
import { UseLink } from '@/components/UseLink';
import { BookOutlined, UpCircleOutlined } from '@ant-design/icons';

const EmptyHeaderBox = styled.div`
  display: flex;
  background-color: #237ffe;
  color: white;
  padding: 22px;
  flex-direction: column;

  position: relative;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const FirstLine = styled.div`
  font-size: 18px;
`;

const SecondLine = styled.div`
  margin-top: 10px;
  font-size: 14px;
`;

const EmptyHeader = () => {
  return (
    <>
      <EmptyHeaderBox>
        <div style={{ position: 'absolute', top: '24px', right: '24px' }}>
          <UpCircleOutlined
            style={{
              fontSize: '25px',
            }}
          />
        </div>

        <FirstLine>Hi,欢迎使用应用 Paas平台!</FirstLine>
        <SecondLine>
          轻松创建、部署和管理你的应用。提升研发效率,降赶业务成本。
          <UseLink hasUnderline color={'#fff'} noFlex>
            <BookOutlined style={{ marginRight: '4px' }} />
            开启引导
          </UseLink>
        </SecondLine>
      </EmptyHeaderBox>
    </>
  );
};

export { EmptyHeader };
