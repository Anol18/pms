import { useState } from "react";
import { Card, Col, Layout, Row, Select, Space, Statistic, Table } from "antd";
const { Content, Header } = Layout;
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useDetailBudgetListQuery } from "../../../api/apiSlices/detailBudget.api.slice";
const Page = () => {
  const { data, isLoading, isSuccess, error } = useDetailBudgetListQuery();
  const [result, setResult] = useState();
  const [outcomeResult, setOutcomeResult] = useState();
  const [activityId, setActivityId] = useState();
  let showData = [];
  const OnChangeProject = (e) => {
    if (e) {
      for (const item of data) {
        if (item.projectName === e) {
          item.Outcome?.map((v, i) => {
            showData.push({
              key: item.id + i,
              id: v.id,
              outComeName: v.outcomeName,
              activity: v.Activity,
            });
          });
          setResult(showData);
          break;
        }
      }
    } else {
      setResult();
    }
    showData = [];
  };

  let showOutComeName = [];

  // form onChange handler
  const onChangeOutcome = (e) => {
    if (e) {
      for (const item of result) {
        item.activity?.map((v, i) => {
          showOutComeName.push({
            key: i,
            id: v.id,
            activityName: v.activityName,
          });
        });
        setOutcomeResult(showOutComeName);
        break;
      }
    } else {
      setOutcomeResult();
    }
    showOutComeName = [];
  };
  const handleActivity = (e) => {
    console.log(e);
  };
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
            <Row style={{ marginTop: "1rem" }}>
              <Col lg={{ span: 24 }} xs={24}>
                <Select
                  allowClear
                  showSearch
                  placeholder="Select Project"
                  onChange={OnChangeProject}
                  className="w-full"
                >
                  {isSuccess &&
                    data.map((i) => {
                      return (
                        <Select.Option key={i.id} value={i.projectName}>
                          {i.projectName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
              <Col lg={{ span: 24 }} xs={24}>
                <Select
                  allowClear
                  showSearch
                  placeholder="Select Outcome"
                  onChange={onChangeOutcome}
                  className="w-full"
                >
                  {result &&
                    result.map((i) => {
                      return (
                        <Select.Option key={i.id} value={i.id}>
                          {i.outComeName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
              <Col lg={{ span: 24 }} xs={24}>
                <Select
                  allowClear
                  showSearch
                  placeholder="Select Activity"
                  className="w-full"
                  onChange={handleActivity}
                >
                  {outcomeResult &&
                    outcomeResult.map((i) => {
                      return (
                        <Select.Option key={i.id} value={i.id}>
                          {i.activityName}
                        </Select.Option>
                      );
                    })}
                </Select>
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
