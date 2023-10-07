import { styled } from '@umijs/max';
import { CheckCircleOutlined } from '@ant-design/icons';
import { FC, ReactNode } from 'react';
import './styles.css';

const StepCardBox = styled.div`
  width: 100%;
  display: flex;
  padding: 5px;
`;

const IconBox = styled.div`
  width: 35px;
  padding: 5px;
`;

const RightContent = styled.div`
  display: flex;
  text-align: left;
  font-size: 16px;
  margin-left: 5px;
  flex-direction: column;
`;

interface StepCardProps {
  title?: string;

  desc?: string;

  action?: ReactNode;
}

const StepCard: FC<StepCardProps> = (props) => {
  const { title, desc = '这是一段任务描述这是一段任务描述这是一段任务描述这是一段任务描述' } =
    props;
  return (
    <>
      <StepCardBox>
        <IconBox>
          <CheckCircleOutlined
            style={{
              fontSize: '20px',
            }}
          />
        </IconBox>
        <RightContent>
          <div className="step-card_title">{title}</div>
          <div className="step-card_child_desc">{desc}</div>
          <div className="step-card_child_action">{props.action}</div>
        </RightContent>
      </StepCardBox>
    </>
  );
};

export { StepCard };
