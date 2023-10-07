import { ChargeDiscountChildren } from './ChargeDiscountChildren';
import { trueOrFalseOptions } from '@/utils/options';
import type { FormListActionType } from '@ant-design/pro-components';
import {
  ProFormDependency,
  ProFormGroup,
  ProFormList,
  ProFormRadio,
} from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-components/es';
import { Button, Form, Tooltip } from 'antd';
import { useRef } from 'react';
import { genOptionsFromObj } from '@/utils/utils';
import { handleDeleteChargeDetail } from '@/utils/member/setting/setting';

const MemberSettingCharge = () => {
  const form = Form.useFormInstance();

  const actionRef = useRef<FormListActionType>();
  return (
    <>
      <ProFormText name={'chargeConfigId'} label={'chargeConfigId'} hidden />
      <ProFormGroup>
        <ProFormRadio.Group
          name={'isChargeDiscount'}
          label={'是否启用充值优惠'}
          options={genOptionsFromObj(trueOrFalseOptions)}
        />

        <ProFormRadio.Group
          name={'isConsumeDisCount'}
          label={'是否启用消费折扣'}
          options={genOptionsFromObj(trueOrFalseOptions)}
        />

        <ProFormRadio.Group
          name={'isLevel'}
          label={'是否启用等级设置'}
          options={genOptionsFromObj(trueOrFalseOptions)}
          hidden
        />
      </ProFormGroup>

      <ProFormDependency name={['isChargeDiscount', 'isConsumeDisCount', 'isLevel']}>
        {({ isChargeDiscount, isConsumeDisCount, isLevel }) => {
          return (
            <ProFormList
              actionRef={actionRef}
              name={'chargeDetails'}
              actionGuard={{
                beforeAddRow: async () => {
                  return new Promise((resolve) => {
                    setTimeout(() => resolve(true), 300);
                  });
                },
              }}
              actionRender={(specialsFProps, action) => {
                return [
                  <Tooltip key={'deleteThis'} title="删除此行">
                    <Button
                      key="delete"
                      onClick={async () => {
                        const data = form?.getFieldValue('chargeDetails');

                        if (!data[specialsFProps.name]?.chargeDetailId) {
                          action.remove(specialsFProps.name);
                        } else {
                          const result = await handleDeleteChargeDetail(
                            data[specialsFProps.name].chargeDetailId,
                          );
                          if (result) {
                            action.remove(specialsFProps.name);
                          }
                        }
                      }}
                      type="link"
                      ghost
                    >
                      删除此行
                    </Button>
                  </Tooltip>,
                  <Tooltip key={'copy'} title="复制此行">
                    <Button
                      key="copy1"
                      onClick={async () => {
                        const data = form.getFieldValue('chargeDetails');

                        const row = data[specialsFProps.name];

                        actionRef.current?.add({ ...row, chargeDetailId: '' }, data.length);
                      }}
                      type="link"
                      ghost
                    >
                      复制此行
                    </Button>
                  </Tooltip>,
                ];
              }}
            >
              <ProFormText name={'chargeDetailId'} label={'chargeDetailId'} hidden />
              <ChargeDiscountChildren
                isConsumeDiscount={isConsumeDisCount}
                isLevel={isLevel}
                isChargeDiscount={isChargeDiscount}
              />
            </ProFormList>
          );
        }}
      </ProFormDependency>
    </>
  );
};

export { MemberSettingCharge };
