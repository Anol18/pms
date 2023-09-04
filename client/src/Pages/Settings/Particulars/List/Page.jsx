import { Button, Col, Layout, Row, Space, Table, Tooltip } from "antd";
const { Header, Content } = Layout;
const { Column, ColumnGroup } = Table;
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Suspense, lazy, useEffect } from "react";
import { Spin } from "antd";
const AddParticular = lazy(() => import("../Add/Page"));
const Page = () => {
  const data = [
    {
      key: 1,
      sl: 1,
      particular: "test",
    },
  ];

  function setDataToTable() {}
  useEffect(() => {}, []);
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
                  <AddParticular />
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
                      <span>
                        <Row justify="space-around">
                          <Col>
                            <Tooltip title="Edit" color="gold">
                              <EditOutlined className="action-icon" />
                            </Tooltip>
                          </Col>
                          <Col>
                            <Tooltip title="View" color="green">
                              <EyeOutlined
                                className="action-icon"
                                onClick={() => dispatch(openDrawer(true))}
                              />
                            </Tooltip>
                          </Col>
                          <Col>
                            <Tooltip title="Delete" color="red">
                              <DeleteOutlined className="action-icon" />
                            </Tooltip>
                          </Col>
                        </Row>
                      </span>
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
