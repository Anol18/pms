import { useEffect, useState } from "react";
import {
  Card,
  Col,
  Divider,
  Tag,
  Layout,
  Row,
  Space,
  Statistic,
  Table,
  Tooltip,
} from "antd";
import { useProjectListQuery } from "../../../api/apiSlices/projectApi/projectSlice";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Spinner from "../../../Components/Spinner/Page";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../../features/ProjectSlice";
import ShowData from "../../../Components/viewData/Page";
const { Header, Content } = Layout;

// const getRandomuserParams = (params) => ({
//   results: params.pagination?.pageSize,
//   page: params.pagination?.current,
//   ...params,
// });
const Page = () => {
  // RTk Query
  const { data, error, isLoading, isSuccess } = useProjectListQuery();
  const dispatch = useDispatch();
  const [totalBudget, setTotalBudget] = useState();
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const column = [
    {
      title: "#SL",
      dataIndex: "sl",
      align: "center",
      width: 70,
      // fixed: "left",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      width: 300,
      align: "justify",
      // fixed: "left",
    },
    {
      title: "Project Duration",
      dataIndex: "projectDuration",
      width: 100,
      align: "center",
    },
    {
      title: "Location",
      // dataIndex: "location",
      width: 150,
      render: (text, record) => (
        // <span style={{ color: "green" }}>{record.upazila}</span>
        <>
          <Tag color="geekblue">{record.upazila}</Tag>
          <br />
          <br />
          <Tag color="green">{record.district}</Tag>
          <br />
          <br />
          <Tag color="volcano">{record.Division}</Tag>
        </>
      ),
    },
    {
      title: "NGO Approval Date",
      dataIndex: "ngoApprovalDate",
      width: 120,
      align: "center",
    },
    {
      title: "Donor Name",
      dataIndex: "donorName",
      width: 200,
      align: "center",
    },
    {
      title: "Project Budget(BDT)",
      dataIndex: "projectBudget",
      width: 120,
      align: "center",
      // filters
    },
    {
      title: "Conversion rate(BDT)",
      dataIndex: "conversionRate",
      width: 120,
      align: "center",
    },
    {
      title: "Submitted Budget",
      dataIndex: "budgetInCurrency",
      width: 120,
      align: "center",
    },
    {
      title: "Total Expenses",
      width: 120,
    },
    {
      title: "Total Outcome",
      width: 80,
      dataIndex: "totalOutcome",
      align: "center",
    },
    {
      title: "Total Activities",
      width: 120,
    },
    {
      title: "Activity Completed",
      width: 90,
    },
    {
      title: "Remaining Activites",
      width: 90,
    },
    {
      title: "Reporting Date",
      width: 120,
    },
    {
      title: "Status",
      width: 90,
      fixed: "right",
      render: () => (
        <>
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
        </>
      ),
    },
  ];
  const [tData, setTData] = useState(null);
  console.log(data);
  let tableData = [];
  let sum = 0.0;

  const initialDataLoad = () => {
    data &&
      data.map((item, index) => {
        tableData.push({
          key: index,
          sl: item.id,
          projectName: item.projectName,
          projectDuration: item.projectDuration
            .toString()
            .replace(/,/g, " to "),
          upazila: item.upazila.toString(),
          district: item.district.toString(),
          Division: item.division.toString(),
          ngoApprovalDate: item.ngoApprovalDate,
          donorName: item.DonorInformation[0]?.name,
          projectBudget: item.projectBudget,
          budgetInCurrency: item.budgetInCurrency,
          conversionRate: item.conversionRate,
          totalOutcome: item.Outcome.length,
        });
        sum = sum + parseFloat(item.projectBudget);
      });
    setTData(tableData);
    tableData = [];
    setTotalBudget(sum);
    sum = 0.0;
  };
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      // setTData([]);
    }
  };
  useEffect(() => {
    // setTData(tableData);
    // setTableParams({
    //   ...tableParams,
    //   pagination: {
    //     ...tableParams.pagination,
    //     position: ["bottomCenter"],

    //     total: 50,
    //     // 200 is mock data, you should read it from server
    //     // total: data.totalCount,
    //   },
    // });
    isSuccess && initialDataLoad();
  }, [isSuccess, isLoading]);

  if (isLoading) return <Spinner />;
  return (
    <>
      <ShowData />
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
          <Content className="container">
            <Row
              gutter={16}
              style={{ userSelect: "none" }}
              justify="space-around"
            >
              <Col lg={{ span: 4 }} xs={24}>
                <Card bordered={false}>
                  <Statistic
                    title="Total Projects"
                    value={tData && tData.length ? tData.length : 0}
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
                    value={totalBudget}
                    precision={2}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    prefix={<ArrowUpOutlined />}
                    // suffix="BDT"
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
                    title="Total Outcome"
                    value={93}
                    valueStyle={{
                      color: "#3f8600",
                    }}
                    prefix={<ArrowUpOutlined />}
                  />
                </Card>
              </Col>
              {/* <Col lg={{ span: 4 }} xs={24}>
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
              </Col> */}
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
            {/* Filter */}
            {/* <Row>
              <Col lg={{ span: 24 }}>Filter</Col>
            </Row> */}
            {/* Table */}

            <Row style={{ marginTop: "20px" }}>
              <Col lg={{ span: 24 }}>
                <Table
                  bordered
                  columns={column}
                  size="small"
                  dataSource={tData}
                  // pagination={tableParams.pagination}
                  loading={isLoading}
                  onChange={handleTableChange}
                  // style={{ height: "700px" }}
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
