import { Button, Modal } from 'antd';
import React, { Dispatch, SetStateAction } from 'react';

import { ShowRichText } from '@/components/ShowRichText';

type ReadModalProps = {
  readModalOpen: boolean;
  setReadModalOpen: Dispatch<SetStateAction<boolean>>;
  id?: string;
  modalData: any;
};

const ReadModal: React.FC<ReadModalProps> = (props) => {
  const { readModalOpen, setReadModalOpen, id, modalData } = props;

  return (
    <>
      <Modal
        closable={false}
        width={1000}
        bodyStyle={{ maxWidth: '900px', height: 400, overflow: 'auto' }}
        title={modalData.title}
        open={readModalOpen}
        onOk={() => {
          setReadModalOpen(false);
        }}
        onCancel={() => {
          setReadModalOpen(false);
        }}
        footer={
          <Button
            type={'primary'}
            onClick={async () => {
              setReadModalOpen(false);
            }}
          >
            知道了
          </Button>
        }
      >
        <ShowRichText text={modalData.content} />
      </Modal>
    </>
  );
};

export default ReadModal;
