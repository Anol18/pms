import { Space, Layout, Row, Col, Card, Statistic, Table } from "antd";
const { Header, Content } = Layout;
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
const columns = [
  {
    title: "Project",
    width: "30%",
  },
  {
    title: "Outcome",
    width: "30%",
  },
  {
    title: "Activities",
    width: "30%",
  },
  {
    title: "Action",
    width: "10%",
  },
];
const Page = () => {
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Header className="header">
            <h4>Outcome List</h4>
          </Header>
          <Content className="container">
            <Row gutter={16}>
              <Col lg={{ span: 4 }} xs={24}>
                <Card bordered={false}>
                  <Statistic
                    title="Total Projects"
                    value={10}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix=""
                  />
                </Card>
              </Col>
              <Col lg={{ span: 4 }} xs={24}>
                <Card bordered={false}>
                  <Statistic
                    title="Total Budget"
                    value={9.3}
                    precision={2}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="$"
                  />
                </Card>
              </Col>
              <Col lg={{ span: 4 }} xs={24}>
                <Card bordered={false}>
                  <Statistic
                    title="Total Expense"
                    value={9.3}
                    precision={2}
                    valueStyle={{
                      color: "#cf1322",
                    }}
                    prefix={<ArrowDownOutlined />}
                    suffix="$"
                  />
                </Card>
              </Col>
              <Col lg={{ span: 4 }} xs={24}>
                <Card bordered={false}>
                  <Statistic
                    title="Total Programs"
                    value={93}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    prefix={<ArrowUpOutlined />}
                  />
                </Card>
              </Col>
              <Col lg={{ span: 4 }} xs={24}>
                <Card bordered={false}>
                  <Statistic
                    title="Total Programs"
                    value={93}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    prefix={<ArrowUpOutlined />}
                  />
                </Card>
              </Col>
              <Col lg={{ span: 4 }} xs={24}>
                <Card bordered={false}>
                  <Statistic
                    title="Total Activitiess"
                    value={93}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    prefix={<ArrowUpOutlined />}
                  />
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col lg={{ span: 24 }}>
                <Table columns={columns} />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
