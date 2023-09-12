import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Col, Dropdown, Layout, Row, Select, Space, Table } from "antd";
const { Content, Header } = Layout;
const items = [
  {
    key: "1",
    label: "Action 1",
  },
  {
    key: "2",
    label: "Action 2",
  },
];
const App = () => {
  const expandedRowRender = () => {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Status",
        key: "state",
        render: () => <Badge status="success" text="Finished" />,
      },
      {
        title: "Upgrade Status",
        dataIndex: "upgradeNum",
        key: "upgradeNum",
      },
      {
        title: "Action",
        dataIndex: "operation",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown
              menu={{
                items,
              }}
            >
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };
  const columns = [
    {
      title: "Project",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
    },
    {
      title: "Version",
      dataIndex: "version",
      key: "version",
    },
    {
      title: "Upgraded",
      dataIndex: "upgradeNum",
      key: "upgradeNum",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      key: "operation",
      render: () => <a>Publish</a>,
    },
  ];
  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: "Screen",
      platform: "iOS",
      version: "10.3.4.5654",
      upgradeNum: 500,
      creator: "Jack",
      createdAt: "2014-12-24 23:12:00",
    });
  }
  return (
    <>
      <Space className="w-full" direction="vertical" size={[0, 48]}>
        <Layout>
          <Header className="header">
            <h4>Activity Wise PIP</h4>
          </Header>
          <Content className="p-20">
            <Row>
              <Col lg={{ span: 24 }}>
                <Select placeholder="Select Project" className="w-full">
                  <Select.Option></Select.Option>
                </Select>
              </Col>
            </Row>
            <Row className="pt-20">
              <Col lg={{ span: 24 }}>
                <Table
                  columns={columns}
                  expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ["0"],
                  }}
                  dataSource={data}
                />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Space>
    </>
  );
};
export default App;
