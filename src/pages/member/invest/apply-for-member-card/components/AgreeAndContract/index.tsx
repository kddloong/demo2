import { useContext, useState } from 'react';
import { ApplyMemberCardContext } from '@/pages/member/invest/apply-for-member-card/context';
import { agreeAndContractClassnames } from '@/pages/member/invest/apply-for-member-card/styles';
import { useAsyncEffect } from 'ahooks';
import { handleFetchContractByConfigId } from '@/utils/setting/base-setting/contract';
import { Checkbox, Form } from 'antd';
import ShowMemberCardDescription from '@/pages/member/invest/apply-for-member-card/components/ShowMemberCardDescription';
import { ProFormSwitch } from '@ant-design/pro-components';

const AgreeAndContract = () => {
  const { chooseConfigInfo, current } = useContext(ApplyMemberCardContext);

  const { styles } = agreeAndContractClassnames();

  const [agree, setAgree] = useState('');

  const [description, setDescription] = useState('');

  const form = Form.useFormInstance();

  const [visible, setVisible] = useState(false);

  useAsyncEffect(async () => {
    console.log(!!chooseConfigInfo?.configId);
    if (!!chooseConfigInfo?.configId) {
      const result = await handleFetchContractByConfigId(chooseConfigInfo.configId);

      if (result.success) {
        if (result?.data) {
          const { agree = '', description = '' } = result?.data;

          setAgree(agree);

          setDescription(description);

          if (!!description) {
            // 这行代码加在这里, 给表单里面的字段赋值,
            // 如果没有这段代码, 在初始化组件的时候, 没办法效验是否勾上了同意选项, 必须先勾上复选框, 再反选, 才能效验出没有同意协议
            form.setFieldValue('isChoose', false);
          }

          form.setFieldsValue({
            agree,
            description,
          });
        }
      }
    }
  }, [current]);

  function checkBoxStatusChange(checked: boolean) {
    form.setFieldValue('isChoose', checked);
  }

  return (
    <div className={styles['step-three']}>
      <>
        {!!agree || !!description ? (
          <>
            {agree && (
              <Form.Item name={'agree'} label={'会员卡合同'}>
                <div dangerouslySetInnerHTML={{ __html: agree }} />
              </Form.Item>
            )}

            {description && (
              <>
                <Form.Item name={'description'} label={'会员卡协议'}>
                  <p>
                    <Checkbox
                      onChange={(e) => {
                        checkBoxStatusChange(e.target.checked);
                      }}
                    />{' '}
                    用户已阅读并同意
                    <a onClick={() => setVisible(true)}>《会员卡协议》</a>
                  </p>
                </Form.Item>

                <ProFormSwitch name={'isChoose'} hidden />
              </>
            )}
          </>
        ) : (
          <>
            <div>当前暂无协议</div>
          </>
        )}
      </>

      {visible && (
        <ShowMemberCardDescription
          description={description}
          visible={visible}
          setVisible={setVisible}
          refresh={() => {}}
        />
      )}
    </div>
  );
};

export default AgreeAndContract;
