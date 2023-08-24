import {
  Button,
  DatePicker,
  Form,
  Input,
  Layout,
  Col,
  Row,
  Space,
  InputNumber,
  Select,
  message,
  Upload,
} from "antd";
const { Header, Content } = Layout;
const { TextArea } = Input;

import division from "../../../lib/division.json";
import district from "../../../lib/district.json";
import upazila from "../../../lib/upazilas.json";
import countryList from "../../../lib/countryList.json";

import {
  InfoCircleOutlined,
  PlusOutlined,
  MinusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
// import dayjs from "dayjs";
import { useAddProjectMutation } from "../../../api/apiSlices/projectApi/projectSlice";
import { useNavigate } from "react-router-dom";

const dateFormat = "DD/MM/YYYY";
const { RangePicker } = DatePicker;
// const column = [
//   {
//     render: () => (
//       <>
//         <RangePicker />
//       </>
//     ),
//   },
// ];

const suffixSelector = (
  <Form.Item noStyle name="currency">
    <Select
      style={{
        width: 70,
      }}
    >
      <Select.Option value="BDT">BDT</Select.Option>
      <Select.Option value="USD">USD</Select.Option>
      <Select.Option value="GBP">GBP</Select.Option>
      <Select.Option value="EUR">EUR</Select.Option>
    </Select>
  </Form.Item>
);
const donorPhoneCode = (
  <Form.Item noStyle name="dononePhoneCode">
    <Select
      style={{
        width: 70,
      }}
      showSearch
    >
      {countryList.map((item) => {
        return (
          <Select.Option key={item.dial_code} value={item.dial_code}>
            {item.dial_code}
          </Select.Option>
        );
      })}
    </Select>
  </Form.Item>
);

const Page = () => {
  const [addProject, response] = useAddProjectMutation();
  const [subContact, setSubContact] = useState(1);
  const [form] = Form.useForm();
  const [requiredMark] = useState("optional");
  const [divisionId, setDivisionID] = useState();
  const [districtId, setDistrictID] = useState();
  const [ngoApprovalDate, setNgoApprovalDate] = useState();
  const [reportingPeriod, setReportingPeriod] = useState();
  const [subGrant, setSubGrant] = useState([]);
  const [projectDuration, setProjectDuration] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleColumn = (props) => {
    if (props === "+") {
      if (subContact < 5) setSubContact((prev) => prev + 1);
    } else {
      if (subContact > 1) setSubContact((prev) => prev - 1);
    }
  };
  // error message
  const error = () => {
    messageApi.open({
      type: "error",
      content: "Error occured while submitting data",
    });
  };
  // const options = [];
  // for (let i = 10; i < 36; i++) {
  //   options.push({
  //     value: i.toString(36) + i,
  //     label: i.toString(36) + i,
  //   });
  // }
  const getId = new Set();
  const onChangeDivision = (value) => {
    division.map((item) => {
      for (let index = 0; index < value.length; index++) {
        if (item.name === value[index]) {
          getId.add(item.id);
        }
      }
    });
    const data = [...getId];
    setDivisionID(data);
    getId.clear();
  };
  const onChnageDistrict = (value) => {
    district.map((item) => {
      for (let index = 0; index < value.length; index++) {
        if (item.name === value[index]) {
          getId.add(item.id);
        }
      }
    });
    const data = [...getId];
    setDistrictID(data);
    getId.clear();
  };
  const onSubmit = async (value) => {
    const res = await addProject({
      value,
      projectDuration,
      ngoApprovalDate,
      reportingPeriod,
      subGrant,
    });

    if (res.data) {
      navigate("/projectlist");
    } else {
      error();
    }
  };

  const handleNgoApprovalDate = (_, date) => {
    setNgoApprovalDate(date);
  };
  const handleReportingPeriod = (_, date) => {
    setReportingPeriod(date);
  };
  const handleSubGrantsPartner = (e, index) => {
    clearTimeout(handleSubGrantsPartner.timeoutIds[index]);

    handleSubGrantsPartner.timeoutIds[index] = setTimeout(() => {
      setSubGrant((prevSubGrants) => {
        const updatedSubGrants = [...prevSubGrants];
        updatedSubGrants[index] = {
          ...updatedSubGrants[index],
          [e.target.name]: e.target.value,
        };
        return updatedSubGrants;
      });
    }, 200);
  };

  handleSubGrantsPartner.timeoutIds = [];

  return (
    <>
      {contextHolder}
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout>
          <Header style={{ backgroundColor: "#fff" }}>
            <h4 style={{ textAlign: "center" }}>Add Project</h4>
          </Header>
          <Row>
            <Col lg={{ span: 20 }}></Col>
          </Row>
          <Content>
            <Form
              style={{
                padding: "10px 20px 0 20px",
              }}
              form={form}
              layout="vertical"
              onFinish={onSubmit}
              initialValues={{
                requiredMarkValue: requiredMark,
                currency: "BDT",
                dononePhoneCode: "+1",
                status: "In Progress",
                subGrantPhoneCode: "+1",
                conversionRate: 1.0,
              }}
            >
              <Row gutter={16}>
                <Col lg={{ span: 24 }} xs={24}>
                  <Form.Item
                    name="projectName"
                    label="Project Name"
                    rules={[
                      {
                        required: true,
                        message: "Project name is required",
                      },
                    ]}
                    required
                    tooltip="This is a required field"
                  >
                    <Input placeholder="Project Name" autoComplete="off" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16} justify="space-between">
                <Col lg={{ span: 4 }}>
                  <Form.Item
                    // name="projectDuration"
                    label="Project Duration"
                    tooltip={{
                      title: "Project Duration Is Required",
                      icon: <InfoCircleOutlined />,
                    }}
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please Select Project duration",
                      },
                    ]}
                  >
                    <RangePicker
                      // defaultValue={[
                      //   dayjs("01/01/2015", dateFormat),
                      //   dayjs("01/01/2015", dateFormat),
                      // ]}
                      onChange={(_, date) => setProjectDuration(date)}
                      format={dateFormat}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item
                    label="Division"
                    name="division"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Division is required",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      // defaultValue={["a10", "c12"]}
                      onChange={onChangeDivision}
                      style={{
                        width: "100%",
                      }}
                      allowClear
                      // options={options}
                    >
                      {division.map((item) => {
                        return (
                          <Select.Option key={item.id} value={item.name}>
                            {item.name}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }}>
                  <Form.Item
                    label="District"
                    name="district"
                    required
                    rules={[
                      {
                        required: true,
                        message: "District is required",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      style={{
                        width: "100%",
                      }}
                      allowClear
                      onChange={onChnageDistrict}
                    >
                      {district.map((item) => {
                        if (divisionId && divisionId.includes(item.division_id))
                          return (
                            <Select.Option value={item.name} key={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }}>
                  <Form.Item
                    label="Upazila"
                    name="upazila"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Upazila is required",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      style={{
                        width: "100%",
                      }}
                      allowClear
                    >
                      {upazila.map((item) => {
                        if (districtId && districtId.includes(item.district_id))
                          return (
                            <Select.Option value={item.name} key={item.id}>
                              {item.name}
                            </Select.Option>
                          );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }}>
                  <Form.Item label="NGO Approval Date">
                    <DatePicker
                      format={dateFormat}
                      style={{ width: "100%" }}
                      onChange={handleNgoApprovalDate}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Donor Information" name="donorName">
                    <Input placeholder="Name" autoComplete="off" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label name="donorType">
                    <Select placeholder="Donor Type">
                      <Select.Option key="1" value="Individual">
                        Individual
                      </Select.Option>
                      <Select.Option key="2" value="Organization">
                        Organization
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label name="donorAddress">
                    <TextArea
                      placeholder="Address"
                      rows={1}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label name="donorPhoneNumber">
                    <Input
                      placeholder="Phone Number"
                      addonBefore={donorPhoneCode}
                    />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item
                    label
                    name="donorEmail"
                    rules={[
                      {
                        type: "email",
                        message: "Enter a valid amail",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={24}>
                  <Form.Item>
                    <Row justify="space-between">
                      <Col>Sub Grant Partners</Col>
                      <Col>
                        <Row style={{ marginBottom: "5px" }} gutter={5}>
                          <Col>
                            <Button
                              size="small"
                              onClick={() => handleColumn("-")}
                            >
                              <MinusOutlined />
                            </Button>
                          </Col>
                          <Col>
                            <Button
                              size="small"
                              onClick={() => handleColumn("+")}
                            >
                              <PlusOutlined />
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={{ span: 24 }}>
                        {subContact >= 1 && (
                          <Row justify="space-between">
                            <Col lg={{ span: 4 }} xs={24}>
                              <Form.Item>
                                <Input
                                  placeholder="Name"
                                  name="subGrantName"
                                  onChange={(e) => handleSubGrantsPartner(e, 0)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }} xs={24}>
                              <Form.Item>
                                <Input
                                  placeholder="Address"
                                  name="subgrantAddress"
                                  onChange={(e) => handleSubGrantsPartner(e, 0)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }} xs={24}>
                              <Form.Item>
                                <Input
                                  placeholder="Contact Name"
                                  name="subGrantContactName"
                                  onChange={(e) => handleSubGrantsPartner(e, 0)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }} xs={24}>
                              <Form.Item>
                                <Input
                                  name="subGrantPhoneNumber"
                                  placeholder="Phone Number"
                                  onChange={(e) => handleSubGrantsPartner(e, 0)}
                                  // addonBefore={donorPhoneCode}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }} xs={24}>
                              <Form.Item>
                                <Input
                                  placeholder="Email"
                                  name="subGrantEmail"
                                  onChange={(e) => handleSubGrantsPartner(e, 0)}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        )}
                        {subContact >= 2 && (
                          <Row justify="space-between">
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Name"
                                  name="subGrantName"
                                  onChange={(e) => handleSubGrantsPartner(e, 1)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  name="subgrantAddress"
                                  placeholder="Address"
                                  onChange={(e) => handleSubGrantsPartner(e, 1)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  name="subGrantContactName"
                                  placeholder="Contact Name"
                                  onChange={(e) => handleSubGrantsPartner(e, 1)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Phone Number"
                                  name="subGrantPhoneNumber"
                                  // addonBefore={subGrantPhoneCode}
                                  onChange={(e) => handleSubGrantsPartner(e, 1)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Email"
                                  name="subGrantEmail"
                                  onChange={(e) => handleSubGrantsPartner(e, 1)}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        )}
                        {subContact >= 3 && (
                          <Row justify="space-between">
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Name"
                                  name="subGrantName"
                                  onChange={(e) => handleSubGrantsPartner(e, 2)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  name="subgrantAddress"
                                  placeholder="Address"
                                  onChange={(e) => handleSubGrantsPartner(e, 2)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  name="subGrantContactName"
                                  placeholder="Contact Name"
                                  onChange={(e) => handleSubGrantsPartner(e, 2)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Phone Number"
                                  name="subGrantPhoneNumber"
                                  // addonBefore={subGrantPhoneCode}
                                  onChange={(e) => handleSubGrantsPartner(e, 2)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Email"
                                  name="subGrantEmail"
                                  onChange={(e) => handleSubGrantsPartner(e, 2)}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        )}
                        {subContact >= 4 && (
                          <Row justify="space-between">
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Name"
                                  name="subGrantName"
                                  onChange={(e) => handleSubGrantsPartner(e, 3)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  name="subgrantAddress"
                                  placeholder="Address"
                                  onChange={(e) => handleSubGrantsPartner(e, 3)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  name="subGrantContactName"
                                  placeholder="Contact Name"
                                  onChange={(e) => handleSubGrantsPartner(e, 3)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Phone Number"
                                  name="subGrantPhoneNumber"
                                  // addonBefore={subGrantPhoneCode}
                                  onChange={(e) => handleSubGrantsPartner(e, 3)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Email"
                                  name="subGrantEmail"
                                  onChange={(e) => handleSubGrantsPartner(e, 3)}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        )}

                        {subContact >= 5 && (
                          <Row justify="space-between">
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Name"
                                  name="subGrantName"
                                  onChange={(e) => handleSubGrantsPartner(e, 4)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  name="subgrantAddress"
                                  placeholder="Address"
                                  onChange={(e) => handleSubGrantsPartner(e, 4)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  name="subGrantContactName"
                                  placeholder="Contact Name"
                                  onChange={(e) => handleSubGrantsPartner(e, 4)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Phone Number"
                                  name="subGrantPhoneNumber"
                                  // addonBefore={subGrantPhoneCode}
                                  onChange={(e) => handleSubGrantsPartner(e, 4)}
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={{ span: 4 }}>
                              <Form.Item>
                                <Input
                                  placeholder="Email"
                                  autoComplete="off"
                                  name="subGrantEmail"
                                  onChange={(e) => handleSubGrantsPartner(e, 4)}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        )}
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="space-between">
                <Col lg={{ span: 4 }}>
                  <Form.Item
                    label="Project Budget"
                    required
                    name="projectBudget"
                    rules={[
                      {
                        required: true,
                        message: "Please Input Project Budget!",
                      },
                    ]}
                  >
                    <InputNumber
                      addonAfter={suffixSelector}
                      min={0}
                      placeholder="Total Budget"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }}>
                  <Form.Item
                    label="Conversion Rate"
                    name="conversionRate"
                    tooltip="USD, GBP, EUR = (rate) * BDT, If budget is in BDT than no need to give any value by default it's 1 "
                    rules={[
                      {
                        required: true,
                        message: "Please set conversion rate",
                      },
                    ]}
                  >
                    <InputNumber
                      addonAfter="BDT"
                      style={{ width: "100%" }}
                      placeholder="Conversion rate"
                    />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }}>
                  <Form.Item label="Reporting Period">
                    <RangePicker onChange={handleReportingPeriod} />
                    {/* <Button size="small" onClick={() => handleColumn("-")}>
                      <MinusOutlined />
                    </Button>
                    <Button size="small" onClick={() => handleColumn("+")}>
                      <PlusOutlined />
                    </Button> */}
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }}>
                  <Form.Item
                    label="Status"
                    name="status"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Please select status",
                      },
                    ]}
                  >
                    <Select allowClear placeholder="Please Select Status">
                      <Select.Option value="Not Started">
                        Not Started
                      </Select.Option>
                      <Select.Option value="In Progress">
                        In Progress
                      </Select.Option>
                      <Select.Option value="On Hold">On Hold</Select.Option>
                      <Select.Option value="Cancelled">Cancelled</Select.Option>
                      <Select.Option value="Finished">Finished</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col lg={{ span: 4 }}></Col>
              </Row>

              <Row>
                <Col>
                  <Form.Item label>
                    <Upload>
                      <Button icon={<UploadOutlined />}>
                        Click to Upload Attachment
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end" gutter={16}>
                <Col>
                  <Form.Item>
                    <Button type="default" htmlType="reset">
                      Reset
                    </Button>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
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
