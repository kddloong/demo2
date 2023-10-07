import { css, styled } from '@umijs/max';

const hasMinHeight = css`
  min-height: 80vh;
`;

export const MyPageContainer = styled.div<{
  isForm?: boolean;
  minWidth?: number;
  maxWidth?: number;
  hasMinHeight?: boolean;
}>`
  width: 100%;

  //background-color: #fff;
  ${(props) => (props?.hasMinHeight ? hasMinHeight : false)}

  margin: 0 auto;
  min-width: ${(props) => (props?.minWidth ? props.minWidth : 1200)}px;
  max-width: ${(props) => (props?.maxWidth ? props.maxWidth : 1200)}px;
`;

MyPageContainer.defaultProps = {
  hasMinHeight: true,
};
