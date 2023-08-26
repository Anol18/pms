import { Suspense, lazy } from "react";
import Spinner from "../../Components/Spinner/Page";
import { Col, Layout, Row, Space } from "antd";
const Statistic = lazy(() => import("../../Components/Statistic/Page"));
const ActivityList = lazy(() => import("../../Components/ActivityList/Page"));
const Bar = lazy(() => import("../../Components/DataChart/Bar/Page"));
const Line = lazy(() => import("../../Components/Line-chart/Page"));
const Pai = lazy(() => import("../../Components/Pai-chart/Page"));

const Page = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Statistic />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <ActivityList />
      </Suspense>

      <Row gutter={16} justify="space-between">
        <Col lg={{ span: 12 }}>
          <Suspense fallback={<Spinner />}>
            <Bar />
          </Suspense>
        </Col>
        <Col
          lg={{ span: 12 }}
          // style={{
          //   display: "flex",
          //   justifyContent: "center",
          // }}
        >
          <Suspense fallback={<Spinner />}>
            <Pai />
          </Suspense>
        </Col>
      </Row>
      <Row style={{ marginTop: "50px" }}>
        <Col lg={{ span: 24 }}>
          <Suspense fallback={<Spinner />}>
            <Line />
          </Suspense>
        </Col>
      </Row>
    </>
  );
};

export default Page;
