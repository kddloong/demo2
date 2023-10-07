import type { FC } from 'react';
import { useState } from 'react';
import { Col, Form, message, Modal, Row } from 'antd';
import { useModel } from '@umijs/max';
import { ProCard, ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import '@/components/area-and-ticket/SettleOrder/styles.css';
import { BaseSettleOrderInfo } from '@/components/BaseSettleOrderInfo';
import { useAsyncEffect } from 'ahooks';
import { useExistingOrderInfo } from '@/hooks/useExistingOrderInfo';
import {
  INVEST_CARD_PAY,
  NEGATIVE_STATUS as CASH_PAY,
  POSITIVE_STATUS,
  sexOptions,
} from '@/utils/utils';
import { LimitDigitRange } from '@/components/form/LimitDigitRange';
import { sexEnum } from '@/utils/enums';
import { Lesson } from 'types/lesson/lesson-list';
import { handleLessonDataById2 } from '@/utils/lesson/lesson-list';
import { LessonCombo } from 'types/lesson/combo/combo-list';
import { TypeUtil } from 'types/utils';
import { ScanModal } from '@/components/ScanModal';
import { MemberUserInfo } from 'types/member/member/user-info';
import { decideLessonCombo } from '@/utils/lesson/pay/decideLessonCombo';
import { handleDictionaryForPayType } from '@/utils/main/main/dictionary';
import { handleFetchLessonComboById } from '@/utils/lesson/combo/combo-list';
import { handleFetchLessonComboOrderById } from '@/utils/lesson/combo/combo-order';
import { formLabelStyles } from '@/styles/form/styles';

type SettleOrderForLessonComboItem =
  | { orderId: string; orderNo: string }
  | { comboId: string; lessonId: string };

export type SettleOrderForLessonComboProps = {
  visible: boolean;
  setVisible: TypeUtil.SetState<boolean>;
  refreshTable: () => void;
} & SettleOrderForLessonComboItem;

/**
 * 课程套餐购买 支付控制台
 * @param props
 * @constructor
 */
const SettleOrderForLessonCombo: FC<SettleOrderForLessonComboProps> = (props) => {
  const { visible, setVisible, refreshTable } = props;

  const { styles } = formLabelStyles();

  const [infoForm] = Form.useForm();

  const [scanVisible, setScanVisible] = useState(false);

  const [actionForm] = Form.useForm();

  const [orderId, setOrderId] = useState('');

  const [memberCardList, setMemberCardList] = useState<MemberUserInfo.MemberCardListItem[]>([]);

  const [comboItem, setComboItem] = useState<LessonCombo.LessonComboItem | null>(null);

  const [lessonInfo, setLessonItem] = useState<Lesson.LessonItem | null>(null);

  const { existingOrderInfo: existing, saveExistingInfo: saveInfo } = useExistingOrderInfo();

  useAsyncEffect(async () => {
    if ('comboId' in props) {
      const result = await handleFetchLessonComboById(props.comboId);

      if (result.success && 'id' in result?.data) {
        setComboItem(result.data);
        actionForm.setFieldsValue({ needPrice: result.data?.price });
      }
    }
  }, []);

  useAsyncEffect(async () => {
    if ('comboId' in props) {
      const result = await handleLessonDataById2(props.lessonId);

      if (result.success) {
        setLessonItem(result.data);
        actionForm.setFieldsValue({
          gender: result.data?.genderLimit,
        });
      }
    }
  }, []);

  useAsyncEffect(async () => {
    if ('orderId' in props) {
      saveInfo(props.orderId, props.orderNo);

      const result = await handleFetchLessonComboOrderById(props.orderId);

      if (result.success && result.data && 'id' in result?.data) {
        infoForm.setFieldsValue({
          phoneNo: result.data.phoneNo,
          memberId: result.data.cardNo,
          contact: result.data.name,
        });

        const comboResult = await handleFetchLessonComboById(result.data.classComboId);

        if (result.success && 'id' in comboResult.data) {
          setComboItem(comboResult.data);
          actionForm.setFieldsValue({ needPrice: result.data?.price });
        }
      }
    }
  }, []);

  const [memberInfo, setMemberInfo] = useState({
    memberId: '',
    configId: '',
    detailType: '',
  });


  const close = () => {
    setVisible(false);
    refreshTable?.();
  };

  const action = (payType: string) => {
    if (payType === CASH_PAY || payType === INVEST_CARD_PAY) {
      return () => {
        setVisible?.(false);
        refreshTable?.();
      };
    } else {
      return (returnOrderId: string) => {
        setOrderId(returnOrderId);
        setScanVisible(true);
      };
    }
  };

  const clickCard = (item: MemberUserInfo.MemberCardListItem) => {
    setMemberInfo({
      memberId: item.memberId,
      configId: item.id,
      detailType: item.type,
    });

    actionForm.setFieldsValue({
      payType: INVEST_CARD_PAY,
      needPrice: comboItem?.memPrice,
    });
  };

  return (
    <>
      <Modal
        visible={visible}
        width={1200}
        maskClosable={false}
        onCancel={() => setVisible(false)}
        onOk={async () => {
          await infoForm.validateFields();

          await actionForm.validateFields();

          const infoResult = infoForm.getFieldsValue(true);

          console.log(`infoResult`, infoResult);

          const actionResult = actionForm.getFieldsValue();

          if (actionResult.payType === '4') {
            if (!(infoResult.memberId || infoResult?.memId)) {
              message.error('请输入会员信息并查询或读取实体卡信息');
              return;
            }
          }

          /**
           * @date 2022-09-22
           * 如果包含支付操作
           */
          if (comboItem) {
            await decideLessonCombo(
              {
                classComboId: comboItem?.id,
                memberId: infoResult.memberId || infoResult?.memId,
                phoneNo: infoResult.phoneNo,
                name: infoResult.contact,
              },
              {
                payType: actionResult.payType,
                age: actionResult?.age,
                height: actionResult?.height,
                weight: actionResult?.weight,
                gender: actionResult?.gender,
              },
              {
                memberId: infoResult.memberId || infoResult?.memId,
                configId: memberInfo?.configId,
                detailType: memberInfo?.detailType,
              },
              actionResult.needPrice,
              action,
              existing,
              saveInfo,
            );
          }
        }}
      >
        <ProCard
          style={{
            marginTop: '24px',
          }}
          bodyStyle={{
            border: '1px solid black',
          }}
        >
          <Row gutter={16}>
            <Col span={9}>
              <ProCard title={<span className={'modal-title'}>套餐信息</span>}>
                <>
                  <p>套餐名称：{(comboItem as LessonCombo.LessonComboItem)?.name || 0}</p>
                  <p>会员价格：{(comboItem as LessonCombo.LessonComboItem)?.memPrice || 0}</p>
                  <p>套餐价格：{(comboItem as LessonCombo.LessonComboItem)?.price || 0}</p>
                  <p>
                    套餐有效期：{(comboItem as LessonCombo.LessonComboItem)?.validFrom || 0}-
                    {(comboItem as LessonCombo.LessonComboItem)?.validTo || 0}
                  </p>
                </>
              </ProCard>
            </Col>
            <Col span={15}>
              <BaseSettleOrderInfo
                form={infoForm}
                memberCardList={memberCardList}
                setMemberCardList={setMemberCardList}
                clickCard={clickCard}
                mainType={'lesson'}
                requireName
              />

              <>
                <ProCard title={<span className={'modal-title'}>结账信息</span>}>
                  <ProForm
                    className={styles['base-form']}
                    form={actionForm}
                    submitter={false}
                    layout={'horizontal'}
                    initialValues={{
                      payType: '0',
                      needPrice: comboItem?.price,
                    }}
                  >
                    {lessonInfo?.genderLimit !== '-1' && (
                      <ProFormRadio.Group
                        name={'gender'}
                        label={'性别'}
                        disabled={lessonInfo?.genderLimit !== sexEnum.NO_LIMIT}
                        options={sexOptions}
                        initialValue={lessonInfo?.genderLimit}
                      />
                    )}

                    {lessonInfo?.isLimitAge === POSITIVE_STATUS && (
                      <LimitDigitRange
                        name={'age'}
                        min={lessonInfo.minAge}
                        max={lessonInfo?.maxAge}
                        label={'年龄'}
                      />
                    )}

                    <ProFormRadio.Group
                      name={'payType'}
                      label={'付款方式'}
                      request={async () => {
                        return await handleDictionaryForPayType();
                      }}
                      fieldProps={{
                        onChange: (e) => {
                          // info.price 只有在 点击报名列表的支付才会有
                          if (comboItem?.price) {
                            if (
                              e.target.value === INVEST_CARD_PAY &&
                              infoForm.getFieldValue('memberId')
                            ) {
                              actionForm.setFieldsValue({ needPrice: comboItem?.memPrice });
                            } else {
                              actionForm.setFieldsValue({ needPrice: comboItem?.price });
                            }
                          }
                        },
                      }}
                    />

                    <ProFormText name={'needPrice'} readonly label={'应付金额'} />
                  </ProForm>
                </ProCard>
              </>
            </Col>
          </Row>
        </ProCard>

        {scanVisible && (
          <ScanModal
            visible={scanVisible}
            setVisible={setScanVisible}
            orderId={orderId}
            payType={actionForm?.getFieldValue('payType')}
            closeSettle={close}
            openSource={'combo'}
          />
        )}
      </Modal>
    </>
  );
};

export { SettleOrderForLessonCombo };
