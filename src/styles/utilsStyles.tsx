import { createStyles } from 'antd-style';

const utilsStyles = createStyles(({ css }) => ({
  disabledLink: {
    color: `rgba(110, 110, 110, 0.43)`,
    pointerEvents: `none`,
  },
  twentyText: css`
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    color: #1d2129;
  `,
  redText: {
    color: 'red',
  },
  myTableChose: css`
    .ant-table-tbody {
      .clicked {
        > td {
          background-color: #fafafa;
        }
      }

      > tr {
        > td.ant-table-cell-row-hover {
          background-color: #fafafa;
        }
      }
    }

    //.ant-pro-table-search {
    //  background-color: #baf;
    //}
  `,
  marginTop10px: css`
    margin-top: 10px;
  `,
  editableTable: css`
    .ant-table-cell-fix-right.ant-table-cell > div {
      justify-content: flex-start !important;
    }
  `,
  baseTable: css`
    .ant-table-thead > tr > th {
      font-weight: 500;
    },
  `,
  myMessageTable: css`
    .ant-table-tbody > tr.ant-table-row:hover > td {
      //background: none !important;
      //font-weight: normal !important;
    }
    .ant-table-tbody {
      .readClass {
        > td {
          font-weight: bold;
        }
      }
    }
  `,
}));

export { utilsStyles };
