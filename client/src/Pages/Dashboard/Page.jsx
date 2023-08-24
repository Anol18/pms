import { Suspense, lazy } from "react";
import Spinner from "../../Components/Spinner/Page";
import { Col, Layout, Row, Space } from "antd";
const Statistic = lazy(() => import("../../Components/Statistic/Page"));
const ActivityList = lazy(() => import("../../Components/ActivityList/Page"));
const Bar = lazy(() => import("../../Components/DataChart/Bar/Page"));

const Page = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Statistic />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <ActivityList />
      </Suspense>
      <Row>
        <Col lg={{ span: 12 }}>
          <Suspense fallback={<Spinner />}>
            <Bar />
          </Suspense>
        </Col>
      </Row>
    </>
  );
};

export default Page;
