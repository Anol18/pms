import { Card, Col, Divider, Layout, Row, Space, Statistic, Table } from "antd";
import { useProjectListQuery } from "../../../api/apiSlices/projectApi/projectSlice";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;
const column = [
  {
    title: "#SL",
  },
  {
    title: "Project Name",
  },
  {
    title: "Project Duration",
  },
  {
    title: "Location",
  },
  {
    title: "NGO Approval Date",
  },
  {
    title: "Donor Name",
  },
  {
    title: "Project Budget",
  },
  {
    title: "Total Expenses",
  },
  {
    title: "Total Activities",
  },
  {
    title: "Activity Completed",
  },
  {
    title: "Remaining Activites",
  },
  {
    title: "Reporting Date",
  },
  {
    title: "Status",
  },
];
const Page = () => {
  // RTk Query
  const { data, error, isLoading } = useProjectListQuery();
  console.log(data);
  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout>
          <Header style={{ backgroundColor: "white" }}>
            <h4 style={{ textAlign: "center" }}>Projects List</h4>
          </Header>
          <Content style={{ margin: "20px 20px 20px 20px" }}>
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
            <Row>
              <Col lg={{ span: 24 }}>Filter</Col>
            </Row>
            <Row>
              <Col lg={{ span: 24 }}>
                <Table columns={column} />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
