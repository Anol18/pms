import { useEffect, useState } from "react";
import { Col, Layout, Row, Space, Table, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
const { Content, Header } = Layout;
import AddObject from "../Add/Page";
import { useObjectTypeListQuery } from "../../../../api/apiSlices/objectType.slice";
const columns = [
  {
    title: "#SL",
    width: 80,
    dataIndex: "sl",
  },
  {
    title: "Object Name",
    dataIndex: "objectName",
  },
  {
    title: "Actions",
    width: 150,
    render: () => (
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
    ),
  },
];
const Page = () => {
  const { data, isSuccess } = useObjectTypeListQuery();
  const [updateTableData, setUpdateTableData] = useState([]);
  const assignDataToTable = () => {
    const tableData = [];
    isSuccess &&
      data?.map((item, i) => {
        tableData.push({
          key: item.i,
          id: item.id,
          sl: i + 1,
          objectName: item.objectType,
        });
      });
    setUpdateTableData(tableData);
  };
  useEffect(() => {
    assignDataToTable();
  }, [isSuccess, data?.length]);
  return (
    <>
      <Space className="w-full" size={[0, 48]} direction="vertical">
        <Layout>
          <Header className="header">Object Type</Header>
          <Content>
            <Row justify="end" style={{ margin: "10px" }}>
              <Col>
                <AddObject />
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 24 }}>
                <Table
                  columns={columns}
                  dataSource={updateTableData}
                  bordered
                  scroll={{
                    y: 400,
                    x: 1000,
                  }}
                />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
