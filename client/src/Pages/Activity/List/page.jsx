import {
  Card,
  Col,
  Layout,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tooltip,
} from "antd";
import { useEffect, useRef, useState } from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useActivityListQuery } from "../../../api/apiSlices/activity.api.slice";

const { Header, Content } = Layout;
const Page = () => {
  const { data, isLoading, isSuccess, error, refetch } = useActivityListQuery();

  const [result, setResult] = useState();
  const [tableData, setTableData] = useState();
  const showData = [];
  // column
  const columns = [
    {
      title: "#SL",
      dataIndex: "sl",
      width: 40,
      align: "center",
      editable: true,
    },
    {
      title: "Activities",
      dataIndex: "activityName",
      width: 500,
    },
    {
      title: "Yearly Activities",
      dataIndex: "yearlyactivities",
      width: 500,
    },
    {
      title: "Action",
      width: 50,
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

  const OnChangeProjectName = (e) => {
    if (e) {
      for (const item of data) {
        if (item.projectName === e) {
          item.Outcome?.map((v, i) => {
            showData.push({
              key: item.id + i,
              id: item.id + "." + (i + 1),
              outComeName: v.outcomeName,
            });
          });
          setResult(showData);
          break;
        }
      }
    } else {
      setResult();
    }
  };

  const handleOutcome = (value) => {
    let pushedData = [];
    if (value) {
      for (const item of data) {
        item.Outcome?.map((v) => {
          if (v.outcomeName === value) {
            v.Activity.map((item, i) => {
              pushedData.push({
                sl: item.index,
                activityName: item.activityName,
                yearlyactivities: item.yearlyActivities,
              });
            });

            setTableData(pushedData);
            pushedData = [];
          }
        });
      }
    } else {
      setTableData();
    }
  };

  const laodTableData = () => {};
  useEffect(() => {
    laodTableData();
    refetch();
  }, [isSuccess]);

  return (
    <>
      <Space style={{ width: "100%" }} direction="vertical" size={[0, 48]}>
        <Layout>
          <Header className="header">
            <h4>Activities List</h4>
          </Header>
          <Content className="container">
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
                  placeholder="Select Project"
                  style={{ width: "100%" }}
                  allowClear
                  showSearch
                  onChange={OnChangeProjectName}
                >
                  {isSuccess &&
                    data.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.projectName}>
                          {item.projectName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginTop: "1rem" }}>
              <Col lg={{ span: 24 }} xs={24}>
                <Select
                  placeholder="Select Outcome"
                  style={{ width: "100%" }}
                  allowClear
                  showSearch
                  onChange={handleOutcome}
                >
                  {result &&
                    result.map((v) => {
                      return (
                        <Select.Option key={v.sl} value={v.outComeName}>
                          {v.outComeName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 22 }}>
                {/* <h4>{title.current.value}</h4> */}
              </Col>
            </Row>
            <Row>
              <Col lg={{ span: 24 }} style={{ marginTop: "1rem" }}>
                <Table
                  columns={columns}
                  dataSource={tableData}
                  bordered
                  size="small"
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
