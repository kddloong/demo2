import { FC, useState } from 'react';
import { useAsyncEffect, useWhyDidYouUpdate } from 'ahooks';
import { handleFetchAlertByCode } from '@/utils/getAlertByCode';
import { Alert, theme } from 'antd';
import { UseLink } from '@/components/UseLink';
import { AlertResp } from '../../../types/alert-info';
import { isEmpty, NEGATIVE_STATUS, POSITIVE_STATUS } from '@/utils/utils';
import { history } from '@umijs/max';
import MyIcon from '@/components/MyIcon';

interface PageAlertBoxProps {
  code: string;

  noHeader?: boolean;
}

const { useToken } = theme;
const PageAlertBox: FC<PageAlertBoxProps> = (props) => {
  const { code, noHeader = false } = props;

  const { token } = useToken();

  const [alertList, setAlertList] = useState<AlertResp | null>(null);

  useAsyncEffect(async () => {
    const result = await handleFetchAlertByCode(code);
    if (result.success) {
      setAlertList(result.data);
    }
  }, [code]);

  // token.marginMD:20px
  const baseStyle = {
    marginBottom: token.marginMD,
    marginTop: noHeader ? 0 : token.marginMD,
    color: '#4352a0',
  };

  useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...props });

  return (
    <>
      {alertList &&
        !isEmpty(alertList) &&
        Object.entries(alertList)?.map((alert2) => (
          <Alert
            message={
              <div>
                {alert2[1].map((item, index) => (
                  <>
                    {alert2?.[1].length > 1 ? <>{index}.&nbsp;</> : <></>}
                    {item.content}
                    {item.isHyperlink === POSITIVE_STATUS ? (
                      <>
                        {' '}
                        <UseLink
                          onClick={() => {
                            if (item.linkType === POSITIVE_STATUS) {
                              window.open(item.linkAddress, '_blank');
                            } else {
                              history.push(item.linkAddress);
                            }
                          }}
                          noFlex
                        >
                          {item.linkText}

                          {/*<MyIcon style={{color: '#4352a0'}} type={'icon-share-blue'}/>*/}
                          <MyIcon
                            style={{ color: '#4352a0', fontWeight: 500 }}
                            type={'icon-share-blue-2'}
                          />
                        </UseLink>
                      </>
                    ) : (
                      false
                    )}
                    <br />
                  </>
                ))}
              </div>
            }
            type="info"
            style={
              alert2?.[0] === NEGATIVE_STATUS
                ? {
                    ...baseStyle,
                    backgroundColor: '#fff',
                  }
                : baseStyle
            }
          />
        ))}
    </>
  );
};

export { PageAlertBox };
