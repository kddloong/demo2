import { ProFormInstance, StepsForm } from '@ant-design/pro-components';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import {
  ApplyMemberCardContext,
  ShowMemberCardContext,
} from '@/pages/member/invest/apply-for-member-card/context';
import MemberInfo from '@/pages/member/invest/apply-for-member-card/components/MemberInfo';
import ChooseCard from '@/pages/member/invest/apply-for-member-card/components/ChooseCard';
import { InvestCard } from 'types/member/invest/invest';
import PayCard from '@/pages/member/invest/apply-for-member-card/components/PayCard';
import UploadFaceInfo from '@/pages/member/invest/apply-for-member-card/components/UploadFaceInfo';
import PhysicalCard from '@/pages/member/invest/apply-for-member-card/components/PhysicalCard';
import { handleOpenCard, handleSaveMemberUser } from '@/utils/member/invest/invest';
import { sendLog } from '@/utils/utils';
import AgreeAndContract from '@/pages/member/invest/apply-for-member-card/components/AgreeAndContract';
import { rechargeRemake } from '@/utils/member/member/recharge';
import { handleBindCardToMember } from '@/utils/member/member/user-info';
import { message } from 'antd';
import { useSearchParams, history } from '@umijs/max';

type FormValue = {
  jobInfo: {
    name: string;
    type: number;
  };
  syncTableInfo: {
    timeRange: [Dayjs, Dayjs];
    title: string;
  };
};

const ApplyForMemberCard = () => {
  const [searchParams] = useSearchParams();

  const headerMemberId = searchParams.get('memberId') || '';

  const formMapRef = useRef<MutableRefObject<ProFormInstance<any> | undefined>[]>([]);

  const [memberId, setMemberId] = useState('1699952555228332033');

  const [current, setCurrent] = useState(1);

  const [venueId, setVenueId] = useState('');

  const [baseConfigInfo, setBaseConfigInfo] = useState<InvestCard.BaseConfigInfoParams>({
    configId: '',
    detailType: '',
    price: 0,
    detailId: '',
  });

  useEffect(() => {
    if (!!headerMemberId) {
      setMemberId(headerMemberId);
      setCurrent(1);
    }
  }, [headerMemberId]);

  const formValue: FormValue = {
    jobInfo: {
      name: 'normal job',
      type: 1,
    },
    syncTableInfo: {
      timeRange: [dayjs().subtract(1, 'm'), dayjs()],
      title: 'example table title',
    },
  };

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(formValue);
      }, time);
    });
  };

  useEffect(() => {
    waitTime(1000).then(() => {
      // 编辑场景下需要使用formMapRef循环设置formData
      formMapRef?.current?.forEach((formInstanceRef) => {
        formInstanceRef?.current?.setFieldsValue(formValue);
      });
    });
  }, []);

  /**
   * 保存会员信息
   * @param values
   */
  async function saveMemberInfo(values) {
    const result = await handleSaveMemberUser(values);

    setMemberId(result.data);

    if (!result.data) {
      sendLog(`保存会员信息失败, 返回memberId为空`);
    }

    return result.success;
  }

  async function getChooseCard() {
    const { configId, detailId } = baseConfigInfo;

    return Promise.resolve(!!configId && !!detailId);
  }

  async function openCard() {
    const result = await handleOpenCard({
      venueId,
      memberId: memberId,
      configId: baseConfigInfo.configId,
      type: baseConfigInfo.detailType,
    });

    return result.success;
  }

  async function pay(values) {
    await rechargeRemake({
      venueId,
      memberId,
      source: 'add-member',
      config: baseConfigInfo,
      action: () => {
        return () => {
          setCurrent((current1) => current1 + 1);

          return true;
        };
      },
      payType: values.payType,
    });
  }

  async function bind(values) {
    const result = await handleBindCardToMember(values.entity, memberId);

    if (result.success) {
      history.back();
    }
  }

  return (
    <>
      <ApplyMemberCardContext.Provider
        value={{
          memberId,
          setMemberId,
          chooseConfigInfo: baseConfigInfo,
          setChooseConfigInfo: setBaseConfigInfo,
          current,
        }}
      >
        <ShowMemberCardContext.Provider
          value={{
            venueId,
            setVenueId,
          }}
        >
          <StepsForm
            stepsRender={(steps, defaultDom) => {
              return defaultDom;
            }}
            onCurrentChange={(current1) => {
              setCurrent(current1);
            }}
            current={current}
            formMapRef={formMapRef}
            stepsProps={{}}
            onFinish={() => {
              return Promise.resolve(true);
            }}
          >
            <StepsForm.StepForm
              name="step1"
              title="填写会员信息"
              onFinish={async (values) => {
                return await saveMemberInfo(values);
              }}
            >
              <MemberInfo />
            </StepsForm.StepForm>
            <StepsForm.StepForm
              name="step2"
              title={'办理会员卡'}
              onFinish={async () => {
                return await getChooseCard();
              }}
            >
              <ChooseCard />
            </StepsForm.StepForm>
            <StepsForm.StepForm
              layout={'vertical'}
              name={'step3'}
              title={'协议'}
              onFinish={async (values) => {
                // 只有子组件description 有值时， 这里的values.isChoose 才有值，才不是undefined, 如果是undefined默认赋值true, 跳过协议的验证
                const isChoose = values?.isChoose ?? true;

                if (!isChoose) {
                  message.warning('请阅读并同意会员卡协议');
                  return;
                }

                return await openCard();
              }}
            >
              <AgreeAndContract />
            </StepsForm.StepForm>
            <StepsForm.StepForm
              name={'step4'}
              title={'支付'}
              onFinish={async (values) => {
                await pay(values);
              }}
            >
              <PayCard />
            </StepsForm.StepForm>
            <StepsForm.StepForm name={'step5'} title={'人脸信息录入'}>
              <UploadFaceInfo />
            </StepsForm.StepForm>
            <StepsForm.StepForm
              name={'step6'}
              title={'实体卡录入'}
              layout={'vertical'}
              onFinish={async (values) => {
                if (!values.entity) {
                  history.back();
                }else {
                  await bind(values);
                }
              }}
            >
              <PhysicalCard />
            </StepsForm.StepForm>
          </StepsForm>
        </ShowMemberCardContext.Provider>
      </ApplyMemberCardContext.Provider>
    </>
  );
};
export default ApplyForMemberCard;
