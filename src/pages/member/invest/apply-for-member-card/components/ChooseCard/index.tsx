import { FC, useContext, useState } from 'react';
import { Button, Form, message, RadioChangeEvent } from 'antd';
import { useModel } from '@@/exports';
import {
  ProFormDependency,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import {
  handleFetchMemberConfigDataByVenueId,
  handleFetchMemberConfigDataByVenueIdAndId,
  handleFetchMemberConfigSelectDataByVenueId,
} from '@/utils/member/invest/invest';
import { handleFetchOperateAndShop } from '@/utils/member/setting/setting';
import { LabelValueItem } from 'types/utils';
import { chooseCardClassnames } from '@/pages/member/invest/apply-for-member-card/styles';
import {
  ApplyMemberCardContext,
  ShowMemberCardContext,
} from '@/pages/member/invest/apply-for-member-card/context';
import ShowMemberCardItem from '@/components/member/ShowMemberCardItem';

interface ChooseConfigInvestCardProps {
  hasMemberId: boolean;
}

const ChooseCard: FC<ChooseConfigInvestCardProps> = () => {
  const { styles } = chooseCardClassnames();

  const { setVenueId } = useContext(ShowMemberCardContext);

  const { memberId } = useContext(ApplyMemberCardContext);

  const [settingData, setSettingData] = useState<MemberCardConfigSetting.SaveSettingItem[]>([]);

  const [chooseRadioValue, setChooseRadioValue] = useState('');

  const changeRadio = (e: RadioChangeEvent) => {
    setChooseRadioValue(e?.target?.value);
  };

  const [changeFlag, setChangeFlag] = useState(false);

  const [loading, setLoading] = useState(false);

  const form = Form.useFormInstance();

  const { initialState } = useModel('@@initialState');

  return (
    <>
      <div className={styles['step-two']}>
        <ProFormGroup key="group4" label="选择会员卡适用">
          <ProFormText
            name={'memberId'}
            label={'memberId'}
            allowClear={false}
            hidden
            initialValue={memberId}
          />

          <ProFormSelect
            label="场地项目选择"
            allowClear={false}
            name="venueId"
            width="xs"
            fieldProps={{
              onChange: async (value) => {
                setLoading(true);

                setChooseRadioValue('');

                const memberCardResult = await handleFetchMemberConfigDataByVenueId(value);

                if (memberCardResult.success) {
                  setLoading(false);

                  setSettingData(memberCardResult.data);
                } else {
                  setLoading(false);
                }

                if (setVenueId) {
                  setVenueId(value);
                }

                form.setFieldsValue({ configId: null });
              },
            }}
            request={async () => {
              return await handleFetchOperateAndShop(initialState?.currentUser?.tenantId as string);
            }}
          />

          <ProFormDependency name={['venueId']}>
            {({ venueId }) => {
              return (
                <ProFormSelect
                  name="configId"
                  label="会员卡名称"
                  params={venueId}
                  width="lg"
                  placeholder="请选择会员卡的充值类型"
                  request={async () => {
                    return (await handleFetchMemberConfigSelectDataByVenueId(
                      venueId,
                    )) as LabelValueItem[];
                  }}
                  fieldProps={{
                    onChange: async (value) => {
                      if (!venueId) {
                        message.warning('请选择场地项目!');
                        return;
                      }

                      setLoading(true);

                      setChooseRadioValue('');
                      const memberCardResult = await handleFetchMemberConfigDataByVenueIdAndId(
                        venueId,
                        value,
                      );

                      if (memberCardResult.success) {
                        setLoading(false);
                        setSettingData(memberCardResult.data);
                      } else {
                        setLoading(false);
                      }
                    },
                    onClear: () => {
                      setChangeFlag(!changeFlag);
                    },
                  }}
                />
              );
            }}
          </ProFormDependency>

          <Form.Item label={' '}>
            <Button
              onClick={() => {
                form.resetFields();
                setSettingData([]);
                setChooseRadioValue('');
              }}
            >
              重置
            </Button>
          </Form.Item>
        </ProFormGroup>

        <ShowMemberCardItem
          loading={loading}
          settingData={settingData}
          chooseRadioValue={chooseRadioValue}
          changeRadio={changeRadio}
        />
      </div>
    </>
  );
};

export default ChooseCard;
