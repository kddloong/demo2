import type { FormListActionType } from '@ant-design/pro-components';
import { ProFormGroup, ProFormList, ProFormText } from '@ant-design/pro-components';
import { Button, Form, Tooltip } from 'antd';
import { useRef } from 'react';
import { baseRule, handleDeleteExpireDetail } from '@/utils/member/setting/setting';

const MemberSettingTime = () => {
  const form = Form.useFormInstance();

  const actionRef = useRef<FormListActionType>();

  return (
    <>
      <ProFormList
        actionRef={actionRef}
        name={'times'}
        min={1}
        actionRender={(specialsFProps, action) => {
          return [
            <Tooltip key={'deleteThis'} title="删除此行">
              <Button
                key="delete"
                onClick={async () => {
                  const data = form?.getFieldValue('times');

                  if (!data[specialsFProps.name]?.timeConfigId) {
                    action.remove(specialsFProps.name);
                  } else {
                    const result = await handleDeleteExpireDetail(
                      data[specialsFProps.name].timeConfigId,
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
                  const data = form.getFieldValue('times');

                  const row = data[specialsFProps.name];

                  actionRef.current?.add({ ...row, timeConfigId: '' }, data.length);
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
          <ProFormText hidden name={'timeConfigId'} label={'timeConfigId'} />

          <ProFormText name={'cardName'} label={'名称'} width={'md'} />

          <ProFormText
            name={'amount'}
            label={'价格'}
            initialValue={''}
            fieldProps={{ suffix: '元', type: 'number' }}
            rules={baseRule('价格', 'than')}
          />

          <ProFormText
            name={'days'}
            label={'使用天数'}
            fieldProps={{ suffix: '天', type: 'number' }}
            rules={baseRule('使用天数', 'than')}
          />

          <ProFormText
            name={'daysGive'}
            label={'赠送天数'}
            fieldProps={{ suffix: '天', type: 'number' }}
            rules={baseRule('赠送天数', 'equal')}
          />
        </ProFormGroup>
      </ProFormList>
    </>
  );
};

export { MemberSettingTime };
