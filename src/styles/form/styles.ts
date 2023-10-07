import { createStyles } from 'antd-style';

/**
 * 设置Form下的Form.Item的label宽度，
 * @date 2023-09-18
 * 注意事项： 1. 需要删除Form组件的labelCol属性
 */
export const formLabelStyles = createStyles(({ css }) => ({
  'base-form': css`
    .ant-form-item-label {
      width: 120px;
    }
  `,
}));

export const showCashStyles = createStyles(({ css }) => ({
  'need-box': css`
    display: flex;
    text-align: center;
    width: 100%;
    padding: 2px;
    margin-bottom: 24px;

    > div {
      width: 50%;
    }

    > .left-need-box {
      text-align: right;
    }

    > .right-need-box {
      margin-left: 2%;
      width: 48%;
      text-align: left;
    }
  `,
}));

export const modalTitleStyles = createStyles(({ css }) => ({
  'modal-title': css`
    font-size: 24px;
    font-weight: bold;
  `,
}));
