import { useState } from "react";
import { Card, Col, Layout, Row, Select, Space, Statistic, Table } from "antd";
const { Content, Header } = Layout;
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import {
  useDetailBudgetListQuery,
  useGetTotalDetailBudgetListQuery,
} from "../../../api/apiSlices/detailBudget.api.slice";
import { useActivityTotalListQuery } from "../../../api/apiSlices/activityTotal.slice";
const Page = () => {
  const { data: budgetList, isSuccess } = useGetTotalDetailBudgetListQuery();
  const { data } = useDetailBudgetListQuery();
  const { data: activityTotal, isSuccess: activityTotalSuccess } =
    useActivityTotalListQuery();
  const [result, setResult] = useState();
  const [total, setTotal] = useState(0);
  const [outcomeResult, setOutcomeResult] = useState();
  const [activityId, setActivityId] = useState();
  const [loadDataToTable, setLoadDataToTable] = useState([]);
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
          if (e === v.outcomeId) {
            showOutComeName.push({
              key: i,
              id: v.id,
              index: v.index,
              activityName: v.activityName,
            });
          }
        });
        setOutcomeResult(showOutComeName);
      }
    } else {
      setOutcomeResult();
    }
    showOutComeName = [];
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
    },
    {
      title: "Particuars",
      dataIndex: "particular",
    },
    {
      title: "Cost Per Unit (BDT)",
      dataIndex: "costPerUnit",
    },
    {
      title: "Object Unit",
      dataIndex: "objectUnit",
    },
    {
      title: "Object Type",
      dataIndex: "objectType",
    },
    {
      title: "Activity Unit",
      dataIndex: "activityUnit",
    },
    {
      title: "Activity Type",
      dataIndex: "activityType",
    },
    {
      title: "Duration Unit",
      dataIndex: "durationUnit",
    },
    {
      title: "Duration Type",
      dataIndex: "durationType",
    },
    {
      title: "Gross Total (BDT)",
      dataIndex: "gross",
    },
    {
      title: "Net Total (BDT)",
      dataIndex: "net",
    },
    {
      title: "TAX %",
      dataIndex: "tax",
    },
    {
      title: "VAT %",
      dataIndex: "vat",
    },
  ];
  const tableData = [];
  console.log(outcomeResult);
  const handleActivity = (id) => {
    let count = 0;
    budgetList.map((i, index) => {
      if (i.activityId === id) {
        tableData.push({
          key: index,
          sl: ++count,
          particular: i.particular,
          costPerUnit: i.costPerUnit,
          objectUnit: i.objectUnit,
          objectType: i.objectType,
          activityUnit: i.activityUnit,
          activityType: i.activityType,
          durationUnit: i.durationUnit,
          durationType: i.durationType,
          gross: i.gross,
          net: i.net,
          tax: i.tax,
          vat: i.vat,
        });
      }
    });
    let activityTotalData = [];
    activityTotalSuccess &&
      activityTotal.map((item) => {
        if (id === item.activityId) {
          activityTotalData.push({
            grossTotal: item.grossTotal,
            netTotal: item.netTotal,
          });
        }
      });

    setLoadDataToTable(tableData);
    setTotal(activityTotalData);
    activityTotalData = [];
  };
  console.log(total);
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
                    data?.map((i) => {
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
                  filterOption={(input, option) => {
                    // Convert both the input and option label to lowercase for case-insensitive matching
                    const inputValue = input.toLowerCase();
                    const optionLabel = option.children.toLowerCase();

                    // Check if either the index or activityName contains the input value
                    return (
                      optionLabel.includes(inputValue) ||
                      optionLabel.startsWith(inputValue)
                    );
                  }}
                >
                  {outcomeResult &&
                    outcomeResult.map((i) => {
                      return (
                        <Select.Option key={i.id} value={i.id}>
                          {`${i.index + ". " + i.activityName}`}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Col>
            </Row>
            <Row className="pt-20">
              <Col lg={{ span: 24 }}>
                <Table
                  size="small"
                  columns={columns}
                  dataSource={loadDataToTable}
                />
              </Col>
            </Row>

            <Row className="total-budget-section" justify="end">
              <Col>
                <Row>
                  <Col>
                    <b>
                      Gross Total:
                      <input
                        value={total && total[0]?.grossTotal}
                        type="text"
                        readOnly
                        style={{
                          outline: "none",
                          border: "none",
                          textAlign: "end",
                          marginRight: "5px",
                          marginLeft: "5px",
                          color: "green",
                        }}
                      />
                      BDT
                    </b>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <b>
                      Net Total:
                      <input
                        type="text"
                        readOnly
                        value={total && total[0]?.netTotal}
                        style={{
                          outline: "none",
                          border: "none",
                          textAlign: "end",
                          marginRight: "5px",
                          marginLeft: "17px",
                          color: "green",
                        }}
                      />
                      BDT
                    </b>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
