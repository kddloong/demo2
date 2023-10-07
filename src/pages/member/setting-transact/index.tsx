import React, { useEffect, useState } from 'react';
import { CheckCard } from '@ant-design/pro-components';
import { Card, Tabs, TabsProps } from 'antd';
import FaceConfig from '@/pages/member/setting-transact/components/components/face-config';
import PhysicalCardConfig from '@/pages/member/setting-transact/components/components/physicalCard-config';
import VirtualCardConfig from '@/pages/member/setting-transact/components/components/virtualCard-config';
import UniAppConfig from '@/pages/member/setting-transact/components/components/uniapp-config';
import './style.css';
import { useAsyncEffect, useRequest } from 'ahooks';
import {
  handleFetchMemberTransactInfo,
  handleSaveMemberTransact,
} from '@/utils/member/setting/setting';
import { WrapContainer } from '@/components/layout/WrapContainer';
import { stringToCheckBox } from '@/utils/utils';
import { MyPageContainer } from '@/components/card/MyPageContainer';

type checkedType = string | number | boolean;

const AddTransactConfig: React.FC = () => {
  const [items, setItems] = useState<TabsProps['items']>([]);
  const [id, setId] = useState('');
  const [checkedValue, setCheckedValue] = useState<checkedType[]>([]);

  const { data } = useRequest(handleFetchMemberTransactInfo, {});

  useEffect(() => {
    if (data?.success && !data.data) {
      setId('');
    } else {
      const resData = data?.data as MemberCardConfigSetting.MemberTransactionInfo;
      setId(resData?.id);
      const typeArr = stringToCheckBox(resData?.type);
      setCheckedValue(typeArr);
    }
  }, [data]);

  useAsyncEffect(async () => {
    const ItemA = {
      key: '3',
      label: `虚拟卡`,
      children: <VirtualCardConfig />,
    };

    const ItemB = {
      key: '0',
      label: `实体卡`,
      children: <PhysicalCardConfig />,
    };

    const ItemC = {
      key: '1',
      label: `人脸识别`,
      children: <FaceConfig />,
    };
    const ItemD = {
      key: '2',
      label: `小程序`,
      children: <UniAppConfig />,
    };

    const obj = {
      '3': ItemA,
      '0': ItemB,
      '1': ItemC,
      '2': ItemD,
    };

    const compArr = checkedValue.map((checked) => obj[checked as keyof typeof obj]);

    setItems(compArr);
  }, [checkedValue]);

  return (
    <WrapContainer content={'在这里你可以对会员卡认证方式进行配置'}>
      <Card>
        <MyPageContainer>
          <div style={{ padding: 24, paddingLeft: 0 }}>
            <CheckCard.Group
              multiple
              onChange={async (value) => {
                if (!!value) {
                  if (
                    typeof value !== 'string' &&
                    typeof value !== 'boolean' &&
                    typeof value !== 'number'
                  ) {
                    setCheckedValue(value);
                    const params = { id, type: value?.join(',') };
                    // 新增的时候返回id，修改就不返回
                    const result = await handleSaveMemberTransact(params);

                    if (!id) {
                      const resultData = result.data;
                      setId(resultData);
                    }
                  }
                }
              }}
              value={checkedValue}
            >
              <CheckCard title="虚拟卡" size={'small'} value="3" />
              <CheckCard title="实体卡" size={'small'} value="0" />
              <CheckCard title="人脸识别" size={'small'} value="1" />
              <CheckCard title="小程序" size={'small'} value="2" />
            </CheckCard.Group>
          </div>

          <div>
            <Tabs onChange={async () => {}} items={items} />
          </div>
        </MyPageContainer>
      </Card>
    </WrapContainer>
  );
};
export default AddTransactConfig;
