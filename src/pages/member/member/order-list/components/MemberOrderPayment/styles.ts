import { createStyles } from 'antd-style';

export const memberOrderPaymentClassnames = createStyles(({ css }) => ({
  'base-form': css`
    .simple-form-label {
      margin-bottom: 0;

      .ant-form-item-label {
        text-align: left;
      }
    }

    .simple-form-label-tags {
      margin-bottom: 12px;

      .ant-form-item-label {
        text-align: left;
      }
    }
  `,
  'choose-card': css`
    width: 230px;
    height: 120px;
    background-size: 230px 120px;
    //background: url("/public/images/card_store.png");
  `,
}));
