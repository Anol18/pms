import {
  Button,
  DatePicker,
  Form,
  Input,
  Layout,
  Radio,
  Col,
  Row,
  Space,
  Divider,
  InputNumber,
  Upload,
  Table,
  Select,
} from "antd";
import { Footer, Header } from "antd/es/layout/layout";
const { Content } = Layout;
const { TextArea } = Input;
import countryList from "../../../lib/countryList.json";
import division from "../../../lib/division.json";
import district from "../../../lib/district.json";
import upazila from "../../../lib/upazilas.json";
import Spinner from "../../../Components/Spinner/Page";

import {
  InfoCircleOutlined,
  PlusOutlined,
  MinusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import dayjs from "dayjs";
import { useAddProjectMutation } from "../../../api/apiSlices/projectApi/projectSlice";

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
const data = [];
data.push({
  hello: "hello",
});
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
  <Form.Item noStyle>
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
const subGrantPhoneCode = (
  <Form.Item noStyle>
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

  const handleColumn = (props) => {
    if (props === "+") {
      if (subContact < 5) setSubContact((prev) => prev + 1);
    } else {
      if (subContact > 1) setSubContact((prev) => prev - 1);
    }
  };
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
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
  const onSubmit = (value) => {
    addProject({
      value,
      projectDuration,
      ngoApprovalDate,
      reportingPeriod,
      subGrant,
    });
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
  // console.log(subGrant);
  console.log(projectDuration);
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
                suffix: "BDT",
                donorPhoneCode: "+1",
                status: "In Progress",
                subGrantPhoneCode: "+1",
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
                  <Form.Item label="Division" name="division">
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
                  <Form.Item label="District" name="district">
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
                  <Form.Item label="Upazila" name="upazila">
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
                  <Form.Item label name="donorEmail">
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={24}>
                  <Form.Item>
                    <Row justify="space-between">
                      <Col>Sub Grant Partners Name</Col>
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
                                  addonBefore={donorPhoneCode}
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
                                  addonBefore={subGrantPhoneCode}
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
                                  addonBefore={subGrantPhoneCode}
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
                                  addonBefore={subGrantPhoneCode}
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
                                  addonBefore={subGrantPhoneCode}
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
                <Col>
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
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
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
