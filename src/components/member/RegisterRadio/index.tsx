import type { FC } from 'react';
import { useContext, useEffect, useState } from 'react';
import { Radio } from 'antd';
import { Charge } from './components/Charge';
import './style.css';
import { InvestCardTypeEnum } from '@/utils/enums';
import { bgObj } from '@/utils/member/setting/setting';
import { ApplyMemberCardContext } from '@/pages/member/invest/apply-for-member-card/context';
import { Expire } from './components/Expire';
import { Count } from './components/Count';
import { registerRadioClassnames } from '@/components/member/RegisterRadio/styles';
import { DepositMemberContext } from '@/pages/member/invest/card-payment/context';

interface IRegisterRadioProps {
  data:
    | MemberCardConfigSetting.TimesItem[]
    | MemberCardConfigSetting.ChargeDataItem[]
    | MemberCardConfigSetting.NumberItem[];
  configId: string;
  /*卡片类型 0储值卡 1计次卡 2期限卡*/
  cardType: InvestCardTypeEnum | string;
  //选择的充值子项
  choose: string;
  // 赋值detailId
  changeChoose: any;
}

const RegisterRadio: FC<IRegisterRadioProps> = ({
  data = [],
  choose,
  changeChoose,
  cardType,
  configId,
}) => {
  const { styles } = registerRadioClassnames();

  const { setChooseConfigInfo } = useContext(ApplyMemberCardContext);

  const { setChooseConfigInfo: setDepositChooseConfigInfo } = useContext(DepositMemberContext);

  const [settingData, setSettingData] = useState<MemberCardConfigSetting.DetailCompleteItem[]>([]);

  useEffect(() => {
    const result = data.map((item) => {
      if (cardType === InvestCardTypeEnum.STORE_CARD) {
        return {
          configDetailId: (item as MemberCardConfigSetting.ChargeDataItem).chargeDetailId,
          ...item,
        };
      } else if (cardType === InvestCardTypeEnum.EXPIRE_CARD) {
        return {
          configDetailId: (item as MemberCardConfigSetting.TimesItem).timeConfigId,
          ...item,
        };
      } else if (cardType === InvestCardTypeEnum.COUNT_CARD) {
        return {
          configDetailId: (item as MemberCardConfigSetting.NumberItem).numberConfigId,
          ...item,
        };
      }
      return null;
    });

    setSettingData(result as MemberCardConfigSetting.DetailCompleteItem[]);
  }, []);

  return (
    <Radio.Group
      className={'register-radio'}
      name={configId}
      value={choose}
      onChange={changeChoose}
    >
      {settingData.map((detail) => (
        <Radio
          value={detail.configDetailId}
          key={detail.configDetailId}
          onClick={() => {
            if (setChooseConfigInfo) {
              setChooseConfigInfo({
                configId,
                detailType: cardType,
                price: detail.amount,
                detailId: detail.configDetailId,
              });
            }

            if (setDepositChooseConfigInfo) {
              setDepositChooseConfigInfo({
                configId,
                detailType: cardType,
                price: detail.amount,
                detailId: detail.configDetailId,
              });
            }
          }}
        >

          <div
            className={`radio-item ${styles['radio-item']}`}
            style={{ backgroundImage: bgObj[cardType as keyof typeof bgObj] }}
          >
            <div className={'left-img'} />
            <div className={'right-content'}>
              {cardType === InvestCardTypeEnum.STORE_CARD && <Charge data={detail} />}

              {cardType === InvestCardTypeEnum.EXPIRE_CARD && <Expire data={detail} />}

              {cardType === InvestCardTypeEnum.COUNT_CARD && <Count data={detail} />}
            </div>
          </div>
        </Radio>
      ))}
    </Radio.Group>
  );
};
export default RegisterRadio;
