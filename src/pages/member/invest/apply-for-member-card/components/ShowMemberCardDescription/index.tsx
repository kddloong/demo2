import { TypeUtil } from 'types/utils';
import { FC } from 'react';
import { Modal } from 'antd';

interface ShowMemberCardDescriptionProps extends TypeUtil.ModalBaseProps {
  description: string;
}

const ShowMemberCardDescription: FC<ShowMemberCardDescriptionProps> = (props) => {
  const { visible, setVisible, description } = props;
  return (
    <>
      <Modal
        title={'会员卡协议'}
        open={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose={true}
      >
        <div>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </div>
      </Modal>
    </>
  );
};
export default ShowMemberCardDescription;
