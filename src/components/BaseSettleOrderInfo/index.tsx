import { ProCard, ProForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import '@/components/area-and-ticket/SettleOrder/styles.css';
import { basicRule, phone_RegExp } from '@/utils/utils';
import type { FormInstance } from 'antd';
import type { FC } from 'react';
import { MemberCardListForPayment } from '@/components/area-and-ticket/MemberCardListForPayment';
import { TypeUtil } from 'types/utils';
import { SearchMemberCardForPayment } from '@/components/area-and-ticket/SearchMemberCardForPayment';
import { MemberUserInfo } from '../../../types/member/member/user-info';

export type MainType = 'race' | 'lesson' | 'sell' | 'rent' | 'venue';

type BaseSettleOrderInfoProps = {
  form: FormInstance;
  memberCardList: MemberUserInfo.MemberCardListItem[];
  setMemberCardList: TypeUtil.SetState<MemberUserInfo.MemberCardListItem[]>;
  venueId?: string;

  type?: string;
  source?: string;

  clickCard: (data: MemberUserInfo.MemberCardListItem) => void;

  // 分为 比赛， 课程， 售卖， 出租， 场地与售票
  mainType: MainType;
  requireName?: boolean;
  readCardAuth?: boolean;
  searchMemberAuth?: boolean;
};

const BaseSettleOrderInfo: FC<BaseSettleOrderInfoProps> = (props) => {
  const {
    form: infoForm,
    memberCardList,
    setMemberCardList,
    venueId,
    requireName = false,
    readCardAuth = true,
    searchMemberAuth = true,
  } = props;

  const { type, source } = props;

  const { clickCard } = props;

  const { mainType } = props;

  const rules = requireName
    ? {
        rules: [basicRule],
      }
    : {};

  return (
    <>
      <ProCard title={<span className={'modal-title'}>会员信息</span>}>
        <ProForm submitter={false} layout={'horizontal'} className={'my-form'} form={infoForm}>
          <SearchMemberCardForPayment
            setData={setMemberCardList}
            venueId={venueId}
            type={mainType}
            readCardAuth={readCardAuth}
            searchMemberAuth={searchMemberAuth}
          />

          <ProFormText name={'memberId'} hidden />

          <ProFormText name={'memId'} hidden />

          <MemberCardListForPayment
            memberCardList={memberCardList}
            clickCard={clickCard}
            wrapLayout={'horizontal'}
          />

          <ProFormText
            name={'phoneNo'}
            label={'手机号'}
            rules={[
              mainType !== 'sell' ? basicRule : {},
              { pattern: phone_RegExp, message: '请输入正确的手机号' },
            ]}
          />

          <ProFormText name={'contact'} label={'姓名'} {...rules} />

          {mainType === 'venue' && (
            <>
              {type !== 'occupy' && (
                <>
                  {source === 'area' && (
                    <ProFormDigit
                      name={'preMobilizationNumber'}
                      rules={[basicRule]}
                      label={'进场人数'}
                      min={1}
                    />
                  )}
                </>
              )}
              {type === 'occupy' && (
                <>
                  <ProFormText name={'reason'} label={'占用理由'} rules={[basicRule]} />
                </>
              )}
            </>
          )}
        </ProForm>
      </ProCard>
    </>
  );
};

export { BaseSettleOrderInfo };
