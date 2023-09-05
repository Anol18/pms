import { Button, Col, Layout, Row, Space, Table, Tooltip } from "antd";
const { Header, Content } = Layout;
const { Column, ColumnGroup } = Table;
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Suspense, lazy, useEffect, useState } from "react";
import { Spin } from "antd";
import { useParticularListQuery } from "../../../../api/apiSlices/particular.api";
const AddParticular = lazy(() => import("../Add/Page"));
const Page = () => {
  const { data: particular, isSuccess } = useParticularListQuery();
  const [tableData, setTableData] = useState();

  function setDataToTable() {
    const data = [];
    particular?.map((item, i) => {
      data.push({
        key: i,
        sl: i + 1,
        particular: item.particular,
        tax: item.tax,
      });
    });
    setTableData(data);
  }
  useEffect(() => {
    setDataToTable();
  }, [isSuccess, particular.length]);
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
                <Table bordered dataSource={tableData}>
                  <Column title="#SL" dataIndex="sl" key="sl" width={10} />
                  <Column
                    title="Particular"
                    dataIndex="particular"
                    key="particular"
                  />
                  <Column title="TAX %" dataIndex="tax" key="tax" />
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
                                // onClick={() => dispatch(openDrawer(true))}
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
