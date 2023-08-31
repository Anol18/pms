import {
  Space,
  Layout,
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Select,
  Button,
  Tooltip,
  Tag,
} from "antd";
const { Header, Content } = Layout;
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import { useEffect, useState } from "react";
import { openDrawer } from "../../../features/ProjectSlice";
import { useDispatch } from "react-redux";
import { useOutcomeListQuery } from "../../../api/apiSlices/outcome.slice";

const Page = () => {
  const { data, isLoading, isSuccess, error } = useOutcomeListQuery();
  const [tableData, setTableData] = useState(" ");
  const [result, setResult] = useState();
  const dispatch = useDispatch();
  const columns = [
    {
      title: "#SL",
      dataIndex: "id",
      width: 2,
      align: "center",
    },
    // {
    //   title: "Project",
    //   width: "30%",
    //   dataIndex: "projectName",
    // },
    {
      title: "Outcome",

      dataIndex: "outComeName",
      width: 10,
      align: "center",
    },
    {
      title: "Total Activities",
      dataIndex: "activityName",
      align: "center",

      width: 2,
    },
    {
      title: "Action",
      align: "center",
      width: 2,
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
      ),
    },
  ];
  const loadData = () => {
    // const resData = [];
    // data &&
    //   data.map((item, index) => {
    //     resData.push({
    //       index: index + 1,
    //       key: item.id,
    //       // projectName: item.projectName,
    //     });
    //   });
    // const fData = [];
    // console.log(resData.dat);
    // resData.dat?.map((value) => {
    //   fData.push({
    //     inx: value.iid,
    //     oName: value.outcomeName,
    //   });
    // });
  };
  const showData = [];
  const OnChangeProjectName = (e) => {
    if (e) {
      setTableData(e);
      for (const item of data) {
        if (item.projectName === e) {
          item.Outcome?.map((v, i) => {
            showData.push({
              key: item.id + i,
              id: v.index,
              outComeName: v.outcomeName,
            });
          });
          setResult(showData);
          break;
        }
      }
    } else {
      setResult();
      setTableData();
    }
  };
  const handleLoadData = () => {};
  useEffect(() => {
    loadData();
  }, [isSuccess]);
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
            <Row style={{ marginTop: "20px" }} gutter={16}>
              <Col lg={{ span: 24 }}>
                <Select
                  style={{ width: "100%" }}
                  allowClear
                  showSearch
                  onChange={OnChangeProjectName}
                  placeholder="Select Project"
                >
                  {data?.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.projectName}>
                        {item.projectName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Col>
              {/* <Col lg={{ span: 7 }}>
                <Select style={{ width: "100%" }} allowClear showSearch />
              </Col>
              <Col lg={{ span: 7 }}>
                <Select style={{ width: "100%" }} allowClear showSearch />
              </Col> */}
            </Row>
            <Row style={{ marginTop: "20px" }} align="center">
              <Col lg={{ span: 22 }}>
                <b>Project: </b>
                <span style={{ color: "green" }}>{tableData}</span>
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col lg={{ span: 24 }}>
                <Table
                  columns={columns}
                  dataSource={result}
                  bordered
                  scroll={{
                    y: 400,
                    x: 1000,
                  }}
                  size="small"
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
