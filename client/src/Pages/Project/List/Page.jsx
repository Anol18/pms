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
const column = [
  {
    title: "#SL",
    dataIndex: "sl",
    align: "center",
  },
  {
    title: "Project Name",
    dataIndex: "projectName",
  },
  {
    title: "Project Duration",
    dataIndex: "projectDuration",
  },
  {
    title: "Location",
    // dataIndex: "location",
    width: "10%",
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
  },
  {
    title: "Donor Name",
    dataIndex: "donorName",
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
    width: 90,
    render: () => (
      <>
        <span>
          <Row justify="space-around">
            <Col>
              <EditOutlined className="action-icon" />
            </Col>
            <Col>
              <EyeOutlined
                className="action-icon"
                onClick={() => dispatch(openDrawer(true))}
              />
            </Col>
            <Col>
              <DeleteOutlined className="action-icon" />
            </Col>
          </Row>
        </span>
      </>
    ),
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});
const Page = () => {
  // RTk Query
  const { data, error, isLoading, isSuccess } = useProjectListQuery();
  const dispatch = useDispatch();
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
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
    },
    {
      title: "Project Duration",
      dataIndex: "projectDuration",
    },
    {
      title: "Location",
      // dataIndex: "location",
      width: "10%",
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
    },
    {
      title: "Donor Name",
      dataIndex: "donorName",
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
      width: 90,
      render: () => (
        <>
          <span>
            <Row justify="space-around">
              <Col>
                <EditOutlined className="action-icon" />
              </Col>
              <Col>
                <EyeOutlined
                  className="action-icon"
                  onClick={() => dispatch(openDrawer(true))}
                />
              </Col>
              <Col>
                <DeleteOutlined className="action-icon" />
              </Col>
            </Row>
          </span>
        </>
      ),
    },
  ];
  const [tData, setTData] = useState();
  const tableData = [];
  console.log(data);
  isSuccess &&
    data.map((item, index) => {
      tableData.push({
        sl: index + 1,
        projectName: item.projectName,
        projectDuration: item.projectDuration.toString().replace(/,/g, " to "),
        upazila: item.upazila.toString(),
        district: item.district.toString(),
        Division: item.division.toString(),
        ngoApprovalDate: item.ngoApprovalDate,
        // donorName: item.DonorInformation[0],
      });
    });
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
    setTData(tableData);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        position: ["bottomCenter"],

        total: 200,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
      },
    });
  }, [isSuccess]);

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
            {/* Filter */}
            {/* <Row>
              <Col lg={{ span: 24 }}>Filter</Col>
            </Row> */}
            {/* Table */}

            <Row style={{ marginTop: "20px" }}>
              <Col lg={{ span: 24 }}>
                {isSuccess && (
                  <Table
                    bordered
                    columns={column}
                    size="small"
                    dataSource={tData}
                    pagination={tableParams.pagination}
                    loading={isLoading}
                    onChange={handleTableChange}
                    scroll={{
                      y: 400,
                    }}
                  />
                )}
              </Col>
            </Row>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
