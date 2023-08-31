import { Card, Col, Layout, Row, Select, Space, Statistic, Table } from "antd";
const { Content, Header } = Layout;
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
const Page = () => {
  return (
    <>
      <Space className="w-full" size={[0, 48]} direction="vertical">
        <Layout>
          <Header className="header">
            <h4>Budget List</h4>
          </Header>
          <Content className="p-20">
            <Row gutter={16}>
              <Col lg={{ span: 4 }} xs={24}>
                <Card bordered={false}>
                  <Statistic
                    title="Project Budget"
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
            <Row className="pt-20">
              <Col lg={{ span: 24 }} xs={24}>
                <Select className="w-full"></Select>
              </Col>
            </Row>
            <Row className="pt-20">
              <Col lg={{ span: 24 }}>
                <Select className="w-full"></Select>
              </Col>
            </Row>
            <Row className="pt-20">
              <Col lg={{ span: 24 }}>
                <Select style={{ width: "100%" }}></Select>
              </Col>
            </Row>
            <Row className="pt-20">
              <Col lg={{ span: 24 }}>
                <Table />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
