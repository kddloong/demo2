import { message } from 'antd';
import debounce from 'lodash/debounce';

const handleImport = (info: any, refresh: () => void) => {
  if (info.file?.status === 'done') {
    if (info.file?.response?.code === 200) {
      refresh();
    }

    message.success(info.file?.response?.msg);

    return;
  } else {
    message.warning(info.file?.response?.msg);

    return;
  }
};

export const debounceHandleImport = debounce(handleImport, 299, { trailing: true });
