import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Row,
  Tabs,
  Select,
  Space,
  Table,
  Modal,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";

import {
  useActivityListQuery,
  useAddActivityMutation,
} from "../../../api/apiSlices/activity.api.slice";
const { Content, Header } = Layout;

const Page = () => {
  const [form] = Form.useForm();
  const [loadOutcome, setLoadOutcome] = useState();
  const [dateRange, setDateRange] = useState();
  const [dateWiseActivityCount, setDateWiseActivity] = useState([]);
  const { data, isLoading, error, isSuccess } = useActivityListQuery();
  const [addActivity, response] = useAddActivityMutation();
  function generateYearSeries(startDate, endDate) {
    // console.log(data);

    const startYear = startDate;
    const endYear = endDate;

    const yearSeries = [];
    for (let year = startYear; year <= endYear; year++) {
      yearSeries.push({
        year: year,
      });
    }

    return yearSeries;
  }

  // const yearSeries = generateYearSeries(startDate, endDate);

  const handleProjectSelection = (value) => {
    let outComeList = [];
    let date;
    // console.log(value);
    for (let item of data) {
      if (parseInt(item.id) === value) {
        outComeList.push({
          outcome: item.Outcome,
        });
        date = item.projectDuration;
        break;
      }
    }

    setLoadOutcome(outComeList[0]?.outcome);
    setDateRange(date);
    if (date) {
      const rangeofdate = generateYearSeries(
        dayjs(date[0], "DD/MM/YYYY").year(),
        dayjs(date[1], "DD/MM/YYYY").year()
      );
      setDateRange(rangeofdate);
    } else {
      setDateRange();
    }
    outComeList = [];
  };

  const handleDateWiseActivity = (e, index) => {
    const { name, value } = e.target;
    const updatedList = [...dateWiseActivityCount];
    updatedList[index] = {
      ...updatedList[index],
      activityCount: { year: name, activityCount: value },
    };
    setDateWiseActivity(updatedList);
  };
  const handleSubmit = async (value) => {
    const res = await addActivity({ value, dateWiseActivityCount });
    console.log(res);
  };
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
          <Header style={{ backgroundColor: "#fff" }}>
            <h4 style={{ textAlign: "center", backgroundColor: "white" }}>
              Add Activity
            </h4>
          </Header>
          <Content>
            <Form
              style={{
                padding: "20px 20px 20px 20px",
              }}
              form={form}
              layout="vertical"
              initialValues={{}}
              onFinish={handleSubmit}
            >
              <Row>
                <Col lg={{ span: 24 }} xs={24}>
                  <Form.Item
                    label="Project"
                    name="project"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Project Name is Required",
                      },
                    ]}
                    tooltip="This is a required field"
                  >
                    <Select
                      placeholder="Select Project"
                      showSearch
                      allowClear
                      onChange={handleProjectSelection}
                    >
                      {data?.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.id}>
                            {item.projectName}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 24 }} xs={24}>
                  <Form.Item
                    label="Outcome"
                    name="outcome"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Outcome Name is Required",
                      },
                    ]}
                    tooltip="This is a required field"
                  >
                    <Select placeholder="Select Project" showSearch allowClear>
                      {loadOutcome?.map((v) => {
                        return (
                          <Select.Option key={v.id} value={v.id}>
                            {v.outcomeName}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col lg={{ span: 20 }} xs={24}>
                  <Form.Item
                    label="Activity Name"
                    name="activityName"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Program Name is Required",
                      },
                    ]}
                    tooltip="This is a required field"
                  >
                    <Input placeholder="Program Name" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }}>
                  <Tabs
                    tabPosition="left"
                    items={dateRange?.map((d, i) => {
                      return {
                        label: d?.year.toString(),
                        key: i,
                        children: (
                          <>
                            <Form.Item id={i} label="Total Activity">
                              <Input
                                placeholder="Total Activity"
                                name={d?.year.toString()}
                                onChange={(e) => handleDateWiseActivity(e, i)}
                              />
                            </Form.Item>
                          </>
                        ),
                      };
                    })}
                  />
                </Col>
              </Row>
              <Row justify="end" gutter={16}>
                <Col>
                  <Button type="reset">Reset</Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
