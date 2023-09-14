import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Tabs,
  Select,
  Space,
} from "antd";
import { useEffect, useState } from "react";
import {
  useActivityListQuery,
  useAddActivityMutation,
} from "../../../api/apiSlices/activity.api.slice";
import { useNavigate } from "react-router-dom";

const { Content, Header } = Layout;
const Page = () => {
  const [form] = Form.useForm();
  const [loadOutcome, setLoadOutcome] = useState();
  const [dateRange, setDateRange] = useState();
  const [dateWiseActivityCount, setDateWiseActivity] = useState([]);
  const { data, refetch } = useActivityListQuery();
  const [addActivity, response] = useAddActivityMutation();
  const navigate = useNavigate();
  function generateYearSeries(startDate, endDate) {
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

  const handleProjectSelection = (value) => {
    let outComeList = [];
    let date;
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
    const years = date?.map((dateString) => {
      const dateParts = dateString.split("/");
      const year = dateParts[2];
      return year;
    });

    if (date) {
      const rangeofdate = generateYearSeries(
        parseInt(years[0]),
        parseInt(years[1])
      );
      console.log("date range function", rangeofdate);
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
    await addActivity({ value, dateWiseActivityCount });
    if (response) {
      navigate("/activitylist");
    }
  };

  useEffect(() => {
    refetch();
  }, []);

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
          <Header className="header">
            <h4>Add Activity</h4>
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
                                // value={
                                //   dateWiseActivityCount[i] &&
                                //   dateWiseActivityCount[i].activityCount
                                //     .activityCount
                                // }
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
                  <Button htmlType="reset">Reset</Button>
                </Col>
                <Col>
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
