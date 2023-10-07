import { ProForm, ProFormRadio } from '@ant-design/pro-components';
import { handleDictionaryForPayType } from '@/utils/main/main/dictionary';
import { useContext } from 'react';
import { ApplyMemberCardContext } from '@/pages/member/invest/apply-for-member-card/context';

const PayCard = () => {
  const { chooseConfigInfo } = useContext(ApplyMemberCardContext);

  return (
    <>
      <div className={'step-finish'}>
        <ProForm.Item name="selectCharge" label="已选充值" className={'charged'}>
          <div className={'radio-item'}>
            <div
              className={'left-img'}
              style={{
                backgroundImage: 'url(' + require('/public/member/pic_1.png') + ')',
              }}
            />
            <div className={'right-content'}>
              {/*{chooseConfigInfo?.detailType === InvestCardTypeEnum.STORE_CARD ? (*/}
              {/*  <p>*/}
              {/*    {chooseConfigInfo?.price}元 (赠送*/}
              {/*    {showConfigInfo.amountGive}元)*/}
              {/*  </p>*/}
              {/*) : (*/}
              {/*  <p>*/}
              {/*    {showConfigInfo.cardName as string}(*/}
              {/*    {chooseConfigInfo?.detailType === InvestCardTypeEnum.COUNT_CARD*/}
              {/*      ? `送${showConfigInfo.numberGive}次`*/}
              {/*      : `送${showConfigInfo.daysGive}天`}*/}
              {/*    )*/}
              {/*  </p>*/}
              {/*)}*/}
              <p>支付金额：{chooseConfigInfo?.price}元</p>
            </div>
          </div>
        </ProForm.Item>
        <ProForm.Item name="checkbox" label="已选充值">
          <div>{chooseConfigInfo?.price}元</div>
        </ProForm.Item>
        <ProFormRadio.Group
          name="payType"
          label="选择付款方式"
          request={async () => {
            const result = await handleDictionaryForPayType();

            if (result) {
              return result.filter((item) => item.value !== '4');
            }

            return [];
          }}
        />
      </div>
    </>
  );
};

export default PayCard;
