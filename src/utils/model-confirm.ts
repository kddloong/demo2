import { Modal } from 'antd';

export const modalConfirm = async (
  title: string,
  content: string,
  callback: () => Promise<void>,
) => {
  Modal.confirm({
    title,
    content,
    onOk: async () => {
      await callback();
    },
  });
};
