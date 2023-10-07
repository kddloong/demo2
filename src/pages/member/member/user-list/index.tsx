import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { UseLink } from '@/components/UseLink';
import { Access, history, useAccess, useModel } from '@umijs/max';
import { Button, Modal, Space } from 'antd';
import { useRef, useState } from 'react';
import { columns as memberUserListColumns } from './columns';
import { SupplementCard } from '@/pages/member/member/user-list/components/SupplementCard';
import { PhysicalCardStatusEnum } from '@/pages/member/member/user-list/types';
import { CardReader } from 'types/device/encrypted-card/card-setting';
import { handleExecuteEntityCardAction, handleMemberUserList } from '@/utils/member/member/member';
import { MemberUser } from 'types/member/member/member';
import { CardNoSearchBox } from '@/components/member/CardNoSearchBox';
import { writeCard } from '@/services/entity-card/entity-card';
import { utilsStyles } from '@/styles/utilsStyles';
import { WrapContainer } from '@/components/layout/WrapContainer';

const MemberUserList = () => {
  const { card } = useModel('readcard');

  const access = useAccess();

  const actionRef = useRef<ActionType>();

  const [currentUserInfo, setCurrentUserInfo] = useState({
    id: '',
    entityCardNo: '',
    physicalCardStatus: '',
    memberCardNo: '',
  });

  const [suppleVisible, setSuppleVisible] = useState(false);

  const refreshTable = () => {
    actionRef.current?.reload();
    actionRef.current?.clearSelected?.();
  };

  const { styles } = utilsStyles();

  const columns: ProColumns<MemberUser.MemberUserListItem>[] = [
    {
      // 加密卡号
      title: '会员编号',
      dataIndex: 'code',
      key: 'code',
      hideInSearch: false,
      hideInTable: false,
      width: '8%',
      copyable: true,
      renderFormItem: () => {
        return <CardNoSearchBox card={card as CardReader.CardReaderSetting} />;
      },
      render: (_, record) => {
        return (
          <>
            <UseLink
              onClick={() => {
                history.push(`./user-info?memberId=${record.id}`);
              }}
            >
              {record.code}
            </UseLink>
          </>
        );
      },
    },
    ...memberUserListColumns,
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      width: '20%',
      render: (_, record) => [
        <Access key={'update'} accessible={!access?.['member:user-list:update']}>
          <a
            key="update"
            onClick={async () => {
              history.push(`./update-user-info?type=edit&memberId=${record.id}`);
            }}
          >
            修改会员信息
          </a>
        </Access>,
      ],
    },
  ];

  return (
    <WrapContainer content={'场馆的所有会员，在这里你可以对会员进行统一管理'}>
      <ProTable
        className={styles.myTableChose}
        actionRef={actionRef}
        scroll={{ x: 1800 }}
        rowKey="id"
        toolbar={{
          title: (
            <>
              <Space>
                <Access
                  key={'opencard-and-save'}
                  accessible={!access?.['member:user-list:opencard-and-save']}
                >
                  <Button
                    type="primary"
                    key="primary"
                    onClick={() => {
                      // history.push('../invest/invest-card?type=add');
                      history.push('../invest/apply-for-member-card?type=add');
                    }}
                  >
                    <PlusOutlined /> 新增用户及办卡
                  </Button>
                </Access>
                <Access key={'save'} accessible={!access?.['member:user-list:save']}>
                  <Button
                    type="primary"
                    key="primary"
                    onClick={() => {
                      history.push('./add-user-info?type=add');
                    }}
                  >
                    <PlusOutlined /> 新增用户
                  </Button>
                </Access>
                <Access key={'opencard'} accessible={!access?.['member:user-list:opencard']}>
                  <Button
                    disabled={!currentUserInfo.id}
                    onClick={() => {
                      history.push(
                        `../invest/apply-for-member-card?type=edit&memberId=${currentUserInfo.id}&action=openCard`,
                      );
                    }}
                  >
                    新增办卡
                  </Button>
                </Access>
                <Access key={'add-money'} accessible={!access?.['member:user-list:add-money']}>
                  <Button
                    disabled={!currentUserInfo.id}
                    onClick={() => {
                      history.push(`/member/invest/card-payment?memberId=${currentUserInfo.id}`);
                    }}
                  >
                    会员卡充值
                  </Button>
                </Access>
                <Access key={'loose'} accessible={!access?.['member:user-list:loose']}>
                  <Button
                    disabled={
                      !currentUserInfo.id ||
                      !currentUserInfo.physicalCardStatus ||
                      currentUserInfo.physicalCardStatus !== PhysicalCardStatusEnum.NORMAL
                    }
                    onClick={async () => {
                      Modal.confirm({
                        title: '挂失',
                        // content: '确定要挂失会员卡吗?',
                        content: '确定要将实体卡改为挂失吗?',
                        onOk: async () => {
                          const result = await handleExecuteEntityCardAction(
                            {
                              memberId: currentUserInfo.id,
                              encryptionCardNo: currentUserInfo.memberCardNo as string,
                            },
                            'reportLoss',
                          );

                          if (result.success) {
                            refreshTable();
                          }
                        },
                      });
                    }}
                  >
                    挂失
                  </Button>
                </Access>
                <Access key={'repair'} accessible={!access?.['member:user-list:repair']}>
                  {/*没有实体卡 或者 有实体卡 并且状态未挂失*/}
                  <Button
                    disabled={
                      !currentUserInfo.id ||
                      (currentUserInfo.entityCardNo &&
                        PhysicalCardStatusEnum.LOSS !== currentUserInfo.physicalCardStatus)
                    }
                    onClick={async () => {
                      setSuppleVisible(true);
                    }}
                  >
                    补卡
                  </Button>
                </Access>
                <Access key={'back'} accessible={!access?.['member:user-list:back']}>
                  <Button
                    disabled={
                      !currentUserInfo.id ||
                      !currentUserInfo.physicalCardStatus ||
                      currentUserInfo.physicalCardStatus !== PhysicalCardStatusEnum.NORMAL
                    }
                    onClick={async () => {
                      Modal.confirm({
                        title: '退卡',
                        content: '确定要退卡吗?',
                        onOk: async () => {
                          const writeResult = await writeCard(
                            card as CardReader.CardReaderSetting,
                            '0000000000',
                          );

                          if (writeResult?.success) {
                            const result = await handleExecuteEntityCardAction(
                              {
                                memberId: currentUserInfo.id,
                                encryptionCardNo: currentUserInfo.entityCardNo,
                                cardNo: currentUserInfo.memberCardNo,
                              },
                              'returnCard',
                            );

                            if (result.success) {
                              refreshTable();
                            }
                          }
                        },
                      });
                    }}
                  >
                    退卡
                  </Button>
                </Access>
              </Space>
            </>
          ),
        }}
        request={async (params) => {
          return await handleMemberUserList({
            ...params,
            field: 'createDate',
            order: 'desc',
          });
        }}
        // 显示选中的行
        rowClassName={(row) => {
          if (row.id === currentUserInfo.id) {
            return `clicked`;
          }
          return '';
        }}
        search={
          !access?.['member:user-list:search']
            ? {
                defaultCollapsed: true,
                optionRender: (searchConfig, formProps, dom) => [...dom.reverse()],
              }
            : false
        }
        onRow={(row) => {
          return {
            onClick: () => {
              setCurrentUserInfo({
                id: row.id,
                entityCardNo: row.encryptionCardNo,
                physicalCardStatus: row.physicalCardStatus,
                memberCardNo: row.cardNo,
              });
            },
          };
        }}
        rowSelection={{
          type: 'radio',
          onChange: (_, selectedRows) => {
            setCurrentUserInfo({
              id: selectedRows?.[0]?.id,
              entityCardNo: selectedRows?.[0]?.encryptionCardNo,
              physicalCardStatus: selectedRows?.[0]?.physicalCardStatus,
              memberCardNo: selectedRows?.[0]?.cardNo,
            });
          },
          columnWidth: '3%',
        }}
        columns={columns}
      />

      {suppleVisible && (
        <SupplementCard
          visible={suppleVisible}
          setVisible={setSuppleVisible}
          memberId={currentUserInfo.id}
          refreshTable={refreshTable}
        />
      )}
    </WrapContainer>
  );
};

export default MemberUserList;
