import type { FC } from 'react';
import { Suspense } from 'react';
import { Col, Row } from 'antd';
import DashboardRevenueRate from '@/pages/dashboard/dashboard/components/DashboardRevenueRate';
import IntroduceRow from '@/pages/dashboard/dashboard/components/IntroduceRow';
import { PageLoading } from '@ant-design/pro-components';

const Dashboard: FC = () => {
  return (
    <div>
      <Row gutter={10}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow />
          </Suspense>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col
          xl={12}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          style={{
            marginBottom: '24px',
          }}
        >
          <Suspense fallback={null}>
            <DashboardRevenueRate />
          </Suspense>
        </Col>
        <Col xl={12} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: '24px' }}>
          <Suspense fallback={null}></Suspense>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
