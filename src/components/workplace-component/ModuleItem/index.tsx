import './styles.css';
import { FC } from 'react';
import { POSITIVE_STATUS } from '@/utils/utils';
import { GeButton } from '@/components/button/ge-button';
import { handleAddModuleToWorkplace } from '@/utils/workplace_component';

type ModuleItemProps = {
  entity: WorkplaceComponent.ChooseModuleItem;
  refresh: () => void;
  type: string;
  maxHeight: number;
};
const ModuleItem: FC<ModuleItemProps> = (props) => {
  const { entity } = props;

  return (
    <>
      <div className="module-choose-item">
        <div className="module-choose-item_icon">
          <div className="module-icon">
            <img src={entity.logo} width={64} height={64} />
          </div>
        </div>
        <div className="module-choose-item_content">
          <div className="module-choose-item_header">
            <h3 className="title">{entity.title}</h3>
            <GeButton
              disabled={entity.isChoose === POSITIVE_STATUS}
              onClick={async () => {
                const result = await handleAddModuleToWorkplace({
                  code: entity.code,
                  xPosition: 0,
                  yPosition: props.maxHeight + 1,
                  type: props?.type,
                  width: entity.width,
                  height: entity.height,
                });

                if (result.success) {
                  props?.refresh();
                }
              }}
            >
              {entity.isChoose === POSITIVE_STATUS ? '已添加' : '添加组件'}
            </GeButton>
          </div>
          <div className="module-choose-item_description">
            {entity.description ? entity.description : '暂无描述'}
          </div>
        </div>
      </div>
    </>
  );
};

export { ModuleItem };
