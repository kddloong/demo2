import { RadioChangeEvent, Spin } from 'antd';
import { FC } from 'react';
import { chooseCardClassnames } from '@/pages/member/invest/apply-for-member-card/styles';
import { InvestCardTypeEnum } from '@/utils/enums';
import RegisterRadio from '@/components/member/RegisterRadio';
import { ProForm } from '@ant-design/pro-components';

type ShowMemberCardItemProps = {
  loading: boolean;
  settingData: MemberCardConfigSetting.SaveSettingItem[];
  chooseRadioValue: string;
  changeRadio: (e: RadioChangeEvent) => void;
};

const ShowMemberCardItem: FC<ShowMemberCardItemProps> = (props) => {
  const { loading, settingData, chooseRadioValue, changeRadio } = props;

  const { styles } = chooseCardClassnames();

  return (
    <>
      {loading ? (
        <div className={styles['choose-box']}>
          <Spin />
        </div>
      ) : (
        <div className={styles['choose-box']}>
          {settingData.length > 0 &&
            settingData.map((setting) => {
              if (setting.type === InvestCardTypeEnum.STORE_CARD) {
                return (
                  <ProForm.Item
                    key={setting.id}
                    name="cardName1"
                    label={setting.name}
                    labelCol={{ span: 24 }}
                  >
                    <RegisterRadio
                      configId={setting.id}
                      cardType={InvestCardTypeEnum.STORE_CARD}
                      choose={chooseRadioValue}
                      changeChoose={changeRadio}
                      data={
                        setting.chargeDetails as unknown as MemberCardConfigSetting.ChargeDataItem[]
                      }
                    />
                  </ProForm.Item>
                );
              } else if (setting.type === InvestCardTypeEnum.EXPIRE_CARD) {
                return (
                  <ProForm.Item
                    key={setting.id}
                    name="cardName1"
                    label={setting.name}
                    labelCol={{ span: 24 }}
                  >
                    <RegisterRadio
                      configId={setting.id}
                      cardType={InvestCardTypeEnum.EXPIRE_CARD}
                      choose={chooseRadioValue}
                      changeChoose={changeRadio}
                      data={setting.times as unknown as MemberCardConfigSetting.TimesItem[]}
                    />
                  </ProForm.Item>
                );
              } else if (setting.type === InvestCardTypeEnum.COUNT_CARD) {
                return (
                  <ProForm.Item
                    key={setting.id}
                    name="cardName1"
                    label={setting.name}
                    labelCol={{ span: 24 }}
                  >
                    <RegisterRadio
                      configId={setting.id}
                      cardType={InvestCardTypeEnum.COUNT_CARD}
                      choose={chooseRadioValue}
                      changeChoose={changeRadio}
                      data={setting.numbers as unknown as MemberCardConfigSetting.NumberItem[]}
                    />
                  </ProForm.Item>
                );
              }

              return null;
            })}
        </div>
      )}
    </>
  );
};

export default ShowMemberCardItem;
