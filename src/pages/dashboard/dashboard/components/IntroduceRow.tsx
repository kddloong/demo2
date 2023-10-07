import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Space, Tooltip } from 'antd';
import Progress from '@ant-design/plots/es/components/progress';
import TinyColumn from '@ant-design/plots/es/components/tiny-column';
import TinyLine from '@ant-design/plots/es/components/tiny-line';
import { formatNumber } from '@/utils/utils';
import { useAsyncEffect } from 'ahooks';
import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import numeral from 'numeral';
import { useState } from 'react';
import '../style.less';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
import {
  handleCurrentTraffic,
  handleDashboardIndexOrder12MonthColumn,
  handleDashboardIndexOrderStatistic,
  handleMemberDashboardStatistic,
} from '@/utils/dashboard/dashboard';
import { LabelValueItem } from 'types/utils';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: '24px',
  },
};

// 从0开始算, 一年有12个月
const MONTHS_IN_YEAR = 11;

const IntroduceRow = () => {
  const [loading, setLoading] = useState(false);

  const [statisticData, setStatisticData] = useState<
    CaijiDashboard.IntroduceRowManage.IntroduceRowItem | Record<string, any>
  >({});

  useAsyncEffect(async () => {
    setLoading(true);

    const orderStatisticResult = await handleDashboardIndexOrderStatistic();

    const order12MonthColumnResult = await handleDashboardIndexOrder12MonthColumn();

    const memberResult = await handleMemberDashboardStatistic();

    const trafficResult = await handleCurrentTraffic();

    const trafficResultData = trafficResult.data;

    setStatisticData(() => {
      return {
        ...orderStatisticResult.data,
        order12MonthColumn: order12MonthColumnResult.data,
        ...memberResult.data,
        dayTrafficGrowthRate:
          'dayGrowthRate' in trafficResultData ? trafficResultData.dayGrowthRate : 0,
        trafficTotal: 'dayGrowthRate' in trafficResultData ? trafficResultData.total : 0,
      };
    });

    setLoading(false);
  }, []);

  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="总营收"
          action={
            <Tooltip title="场馆总收入">
              <InfoCircleOutlined />
            </Tooltip>
          }
          loading={loading}
          total={statisticData?.totalRevenue || 0}
          footer={
            <Field label="日营收" value={`￥${numeral(statisticData.todayRevenue || 0).value()}`} />
          }
          contentHeight={46}
        >
          <Trend
            flag={statisticData.weekGrowthRate >= 0 ? 'up' : 'down'}
            style={{
              marginRight: 16,
            }}
          >
            周同比
            <span className={'trend-text'}> {statisticData?.weekGrowthRate || 0}% </span>
          </Trend>
          <Trend flag={statisticData?.todayGrowthRate >= 0 ? 'up' : 'down'}>
            日同比
            <span className={'trend-text'}>
              {formatNumber(statisticData?.todayGrowthRate || 0)}%
            </span>
          </Trend>
        </ChartCard>
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="当月营收"
          action={
            <Tooltip title="当月场馆收入">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={statisticData.monthRevenue}
          footer={
            <>
              <span style={{ marginRight: 16 }}>
                上月营收
                <span className={'trend-text'}>{statisticData?.lastMonthRevenue || 0}</span>
              </span>
              <Trend flag={statisticData?.monthGrowthRate >= 0 ? 'up' : 'down'}>
                同比上月
                <span className={'trend-text'}>
                  {formatNumber(statisticData?.monthGrowthRate || 0)}%
                </span>
              </Trend>
            </>
          }
          contentHeight={46}
        >
          {/*todo 排序错误*/}
          <TinyColumn
            color="#975FE4"
            height={46}
            tooltip={{
              customContent: (x, data) => {
                return `${dayjs()
                  .subtract(MONTHS_IN_YEAR - Number(x), 'month')
                  .format('YYYY-MM')}: ${data[0]?.data?.y.toFixed(2)}`;
              },
            }}
            data={statisticData.order12MonthColumn}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="会员统计"
          total={numeral(statisticData?.total || 0).format('0,0')}
          footer={
            <Space>
              <Trend
                flag={statisticData?.todayNew >= 0 ? 'up' : 'down'}
                style={{ marginRight: 16 }}
              >
                今日新增
                <span className={'trend-text'}>{formatNumber(statisticData?.todayNew || 0)}</span>
              </Trend>
              <Trend
                flag={statisticData?.dayGrowthRate >= 0 ? 'up' : 'down'}
                style={{ marginRight: 16 }}
              >
                日同比
                <span className={'trend-text'}>
                  {formatNumber(statisticData?.dayGrowthRate || 0)}%
                </span>
              </Trend>
            </Space>
          }
          contentHeight={46}
        >
          <TinyLine
            height={46}
            autoFit
            smooth
            data={statisticData?.trafficLine?.map((item: LabelValueItem) => item.value || 0)}
          />
        </ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="客流"
          total={statisticData?.trafficTotal || 0}
          footer={
            <Space>
              <Field label="日增长率" value={`${statisticData?.dayTrafficGrowthRate || 0}%`} />
            </Space>
          }
          contentHeight={46}
        >
          <Progress
            autoFit={true}
            height={46}
            percent={new BigNumber(statisticData?.dayTrafficGrowthRate || 0)
              .div(100)
              .dp(2)
              .toNumber()}
            color={['#13C2C2', '#E8EDF3']}
          />
        </ChartCard>
      </Col>
    </Row>
  );
};

export default IntroduceRow;
