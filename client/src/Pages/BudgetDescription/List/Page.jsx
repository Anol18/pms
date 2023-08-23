import { Button, Col, Layout, Row, Space, Table } from "antd";
const { Header, Content } = Layout;
const { Column, ColumnGroup } = Table;

import { Suspense, lazy } from "react";
import { Spin } from "antd";
const AddBudgetDetails = lazy(() => import("../Add/Page.jsx"));
// const colums = [
//   {
//     title: "#SL",
//     dataIndex: "sl",
//   },
//   {
//     title: "Particular",
//     dataIndex: "particular",
//   },
//   {
//     title: "Action",
//   },
// ];

const Page = () => {
  const data = [
    {
      key: 1,
      sl: 1,
      particular: "test",
    },
  ];
  return (
    <>
      <Space style={{ width: "100%" }} direction="vertical">
        <Layout>
          <Header className="header">
            <h4>Budget Description</h4>
          </Header>
          <Content>
            <Row justify="end" style={{ margin: "10px" }}>
              <Col>
                <Suspense fallback={<Spin />}>
                  <AddBudgetDetails />
                </Suspense>
              </Col>
            </Row>
            <Row style={{ margin: "10px" }}>
              <Col lg={{ span: 24 }} xs={24}>
                <Table bordered dataSource={data}>
                  <Column title="#SL" dataIndex="sl" key="sl" width={10} />
                  <Column
                    title="Particular"
                    dataIndex="particular"
                    key="particular"
                  />
                  <Column
                    title="Action"
                    key="action"
                    width={120}
                    render={(_, record) => (
                      <Space>
                        <a>Action</a>
                      </Space>
                    )}
                  />
                </Table>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
