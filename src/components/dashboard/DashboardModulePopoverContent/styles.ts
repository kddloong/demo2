import { createStyles } from 'antd-style';

export const dashboardPopoverStyles = createStyles(({ css }) => ({
  divider: css`
    border-top: 1px solid #ecedf0;
    height: 0;
    margin: 7px 0;
  `,
  item: css`
    color: #2e405e;
    cursor: pointer;
    font-size: 1rem;
    line-height: 1em;
    padding: 10px 16px;
    position: relative;

    &:hover {
      background: #f5f6f8;
    }
  `,
  redText: css`
    color: #de350b !important;
  `,
}));
