import { Button, Modal, Space } from 'antd';
import { TypeUtil } from '../../../../types/utils';
import { FC, useEffect, useState } from 'react';
import './styles.css';
import { useRequest } from 'ahooks';
import { handleFetchWorkplaceModules } from '@/utils/workplace_component';
import { ModuleItem } from '@/components/workplace-component/ModuleItem';

interface AddWorkplaceModuleProps extends TypeUtil.ModalBaseProps {
  type: string;
  maxHeight: number;
}

const AddWorkplaceModule: FC<AddWorkplaceModuleProps> = (props) => {
  const { visible, setVisible, refresh, type } = props;

  const { data: result, refresh: refreshRequest } = useRequest(handleFetchWorkplaceModules, {
    defaultParams: [type],
  });

  const [pickerList, setPickerList] = useState<WorkplaceComponent.ChooseModuleItem[]>([]);

  useEffect(() => {
    if (result?.success && result?.data) {
      const resultData = result.data;

      setPickerList(resultData);
    }
  }, [result]);

  return (
    <Modal
      width={788}
      open={visible}
      className={'work-module'}
      onCancel={() => {
        setVisible(false);
      }}
      title={'添加工作台组件'}
      footer={
        <Space>
          <Button
            onClick={() => {
              setVisible(false);
            }}
          >
            关闭
          </Button>
        </Space>
      }
    >
      <div className="content">
        <div className="add-container">
          {pickerList.length > 0
            ? pickerList.map((picker) => (
                <div key={'item'} className="add-container-col">
                  <ModuleItem
                    maxHeight={props.maxHeight}
                    entity={picker}
                    refresh={() => {
                      refreshRequest();
                      refresh();
                    }}
                    type={type}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </Modal>
  );
};

export { AddWorkplaceModule };
