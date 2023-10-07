import { createStyles } from 'antd-style';

/**
 * @namespace UploadFaceInfo
 */
export const uploadFaceInfoClassnames = createStyles(({ css }) => ({
  'face-box': css`
    max-width: 600px;
    box-sizing: border-box;
  `,
  'image-box': css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    > .header {
      font-size: 16px;
    }

    > .body {
      width: 460px;
      height: 300px;
      background-color: #5f6d84;

      image {
        height: 100%;
        width: 100%;
      }
    }

    > .footer {
    }
  `,
  'button-box': css`
    padding: 10px 0;
  `,
  'ability-box': css`
    border: 1px solid #000000d9;
    width: 100%;
    height: 100px;
  `,
  'ability-row': css`
    display: grid;
    grid-template-columns: 110px 1fr 1fr 1fr;
    align-items: center;

    > div {
      padding: 2px;

      > .anticon {
        margin: 0 3px;
      }
    }

    > .item-title {
      text-align: center;
    }

    > div:first-child {
      background-color: #2acce2;
    }

    > div:nth-child(2) {
      background-color: #4873c1;
    }

    > div:nth-child(3) {
      background-color: #c2d6ff;
    }

    > div:nth-child(4) {
      background-color: aquamarine;
    }
  `,
}));

export const chooseCardClassnames = createStyles(({ css }) => ({
  'step-two': css`
    width: 800px;
  `,
  'choose-box': css`
    max-height: 800px;
    overflow-y: auto;
    overscroll-behavior-y: contain;
    /*怎么验证*/
    scroll-snap-type: y mandatory;
    scrollbar-width: none;
    margin-bottom: 20px;

    &::-webkit-scrollbar {
      display: none;
    }

    /*css主要部分的样式*/ /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/

    //&::-webkit-scrollbar {
    //  width: 10px; /*对垂直流动条有效*/
    //  height: 10px; /*对水平流动条有效*/
    //}
    //
    ///*定义滚动条的轨道颜色、内阴影及圆角*/
    //
    //&::-webkit-scrollbar-track {
    //  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
    //  background-color: transparent;
    //  border-radius: 3px;
    //}
    //
    ///*定义滑块颜色、内阴影及圆角*/
    //&::-webkit-scrollbar-thumb {
    //  border-radius: 7px;
    //  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .1);
    //  background-color: #E8E8E8;
    //}
    //
    ///*定义两端按钮的样式*/
    //
    //&::-webkit-scrollbar-button {
    //  display: none;
    //}
    //
    ///*定义右下角汇合处的样式*/
    //
    //&::-webkit-scrollbar-corner {
    //  background: khaki;
    //}
  `,
}));

export const agreeAndContractClassnames = createStyles(({ css }) => ({
  'step-three': css`
    width: 800px;
    min-height: 200px;
  `,
}));
