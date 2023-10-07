import { styled } from '@umijs/max';

const LoginBody = styled.section`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 24px 0;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBodyForClient = styled.section`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 24px 0;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PanelContainer = styled.div`
  min-height: calc(100vh - 49px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;
const PanelFooter = styled.div`
  margin-top: 24px;
  position: sticky;
  top: 100%;
  text-align: center;
`;
const OuterBox = styled.div`
  box-sizing: border-box;
`;
const ContentBox = styled.div`
  display: flex;
  box-shadow: 0 0 60px rgba(84, 89, 104, 0.05);
  background: #fff;
  flex-direction: column;
  width: 456px;
  min-height: 540px;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  position: relative;
  justify-content: center;

  .ant-pro-form-login-container {
    padding-top: 0;
  }
`;
const ViewHeader = styled.div`
  user-select: none;
  padding: 24px 32px 0;
  margin-bottom: 16px;
  box-sizing: border-box;

  > img {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    margin-bottom: 4px;
  }

  .title {
    color: #282d3c;
    font-weight: 600;
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export {
  LoginBody,
  PanelContainer,
  PanelFooter,
  OuterBox,
  ContentBox,
  ViewHeader,
  LoginBodyForClient,
};
