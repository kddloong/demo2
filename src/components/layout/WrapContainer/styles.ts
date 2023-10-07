import { createStyles } from 'antd-style';

const layoutClassnames = createStyles(({ css }) => ({
  'base-wrapper': css`
    .ant-pro-page-container-children-container div:first-child {
      margin-top: 0 !important;
    }
  `,
}));

export { layoutClassnames };
