import React, { FC, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useRequest, useSize } from 'ahooks';
import {
  handleChangeWorkplaceCompPosition,
  handleFetchCurrentModuleCompShow,
} from '@/utils/workplace_component';
import { PlusCircleOutlined } from '@ant-design/icons';
import { AddWorkplaceModule } from '@/components/workplace-component/AddWorkplaceModule';
import { DashboardModuleWrap } from '@/components/dashboard/DashboardModuleWrap';
import { sendLog } from '@/utils/utils';

const ResponsiveGridLayout = WidthProvider(Responsive);

type DashboardPageProps = {
  pageType: string;

  wrapContent?: string;
};

const DashboardPage: FC<DashboardPageProps> = (props) => {
  const {
    pageType: thisPageType,
    wrapContent = '会员工作台，在这里你可以对会员及会员卡进行统一管理',
  } = props;

  const [layout, setLayout] = useState({
    lg: [],
  });

  const [visible, setVisible] = useState(false);

  const [divArr, setDivArr] = useState([]);

  const [maxHeight, setMaxHeight] = useState(0);

  const wrapDivRef = useRef<HTMLDivElement>(null);

  const size = useSize(wrapDivRef);

  async function layoutDray(layout, oldItem, newItem, placeholder, e, element) {
    console.log(arguments);

    await handleChangeWorkplaceCompPosition({
      xPosition: newItem.x,
      yPosition: newItem.y,
      id: newItem.i,
    });

    if (newItem.y > maxHeight) {
      setMaxHeight(newItem.y);
    }
  }

  const { data, refresh } = useRequest(handleFetchCurrentModuleCompShow, {
    defaultParams: [thisPageType],
  });

  useEffect(() => {
    if (data?.success) {
      const resultData = data.data;

      const layoutResult = {
        lg: resultData.map((resultItem) => {
          if (resultItem.width === 0 || resultItem.height === 0) {
            sendLog(
              `src/pages/member/dashboard/index.tsx 中 id为 ${resultItem.id} 的记录 width或height为0`,
            );
          }

          return {
            i: resultItem.id,
            x: resultItem.xPosition,
            y: resultItem.yPosition,
            w: resultItem.width,
            h: resultItem.height,
          };
        }),
      };

      setLayout(layoutResult);

      setDivArr(
        resultData.map((div1) => ({
          key: div1.code,
          id: div1.id,
        })),
      );

      const yPositionArr = resultData.map((div2) => div2.yPosition);

      setMaxHeight(yPositionArr.length > 0 ? Math.max(...yPositionArr) : 0);
    }
  }, [data]);

  // const AAA= (<>123</>)
  //
  // const obj = {
  //   'system_a': <AAA/>
  // }

  // const AnnouncementListForHome = <AnnouncementListForHome />

  return (
    <>
      <div ref={wrapDivRef} style={{ width: '100%' }}>
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'row-reverse' }}>
          <Button
            onClick={() => {
              setVisible(true);
            }}
          >
            <PlusCircleOutlined />
            添加组件
          </Button>
        </div>

        <ResponsiveGridLayout
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          layouts={layout}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
          width={size?.width || 1200}
          margin={[20, 20]}
          onDragStop={layoutDray}
          draggableHandle={'.move-handler'}
          resizeHandles={['w']}
          autoSize={true}
        >
          {divArr.map((item) => (
            <div key={item.id} style={{ backgroundColor: '#fff' }}>
              <DashboardModuleWrap
                moduleId={item.id}
                refreshDashboard={() => {
                  refresh?.();
                }}
              >
                {/*{obj[item.id]}*/}
                <div>
                  {item.key} - {item.id}
                </div>
              </DashboardModuleWrap>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>

      {visible && (
        <AddWorkplaceModule
          type={thisPageType}
          visible={visible}
          setVisible={setVisible}
          refresh={() => {
            refresh();
          }}
          maxHeight={maxHeight}
        />
      )}
    </>
  );
};

export { DashboardPage };
