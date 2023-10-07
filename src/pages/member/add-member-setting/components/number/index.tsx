import type { FormListActionType } from '@ant-design/pro-components';
import { ProFormGroup, ProFormList, ProFormText } from '@ant-design/pro-components';
// import { baseRule, handleDeleteCountDetail } from '@/pages/member/add-member-setting/utils';
import { Button, Form, Tooltip } from 'antd';
import { useRef } from 'react';
import { baseRule, handleDeleteCountDetail } from '@/utils/member/setting/setting';

const MemberSettingNumber = () => {
  const form = Form.useFormInstance();

  const actionRef = useRef<FormListActionType>();

  return (
    <>
      <ProFormList
        actionRef={actionRef}
        name={'numbers'}
        min={1}
        actionRender={(specialsFProps, action) => {
          return [
            <Tooltip key={'deleteThis'} title="删除此行">
              <Button
                key="delete"
                onClick={async () => {
                  const data = form?.getFieldValue('numbers');

                  if (!data[specialsFProps.name]?.numberConfigId) {
                    action.remove(specialsFProps.name);
                  } else {
                    const result = await handleDeleteCountDetail(
                      data[specialsFProps.name].numberConfigId,
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
                  const data = form.getFieldValue('numbers');

                  const row = data[specialsFProps.name];

                  actionRef.current?.add({ ...row, numberConfigId: '' }, data.length);
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
        <ProFormGroup>
          <ProFormText hidden name={'numberConfigId'} label={'numberConfigId'} />

          <ProFormText name={'cardName'} label={'名称'} width={'md'} />

          <ProFormText
            name={'amount'}
            label={'价格'}
            fieldProps={{ suffix: '元', type: 'number' }}
            rules={baseRule('价格', 'than')}
          />

          <ProFormText
            name={'number'}
            label={'使用次数'}
            fieldProps={{ suffix: '次', type: 'number' }}
            rules={baseRule('使用次数', 'than')}
          />

          <ProFormText
            name={'numberGive'}
            label={'赠送次数'}
            fieldProps={{ suffix: '次', type: 'number' }}
            rules={baseRule('赠送次数', 'equal')}
          />
        </ProFormGroup>
      </ProFormList>
    </>
  );
};

export { MemberSettingNumber };
