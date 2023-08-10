import {
  Layout,
  Row,
  Space,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  InputNumber,
  Divider,
  Button,
} from "antd";
const { Content, Header } = Layout;
const { TextArea } = Input;
const Page = () => {
  const [form] = Form.useForm();
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Header style={{ backgroundColor: "var(--light" }}>
            <Row justify="center">
              <Col>
                <h4>Add Employee</h4>
              </Col>
            </Row>
          </Header>
          <Content>
            <Form layout="vertical" style={{ padding: "20px" }} form={form}>
              <Row>
                <Col>
                  <h4>Personal Information</h4>
                </Col>
                <Divider style={{ marginTop: "-10px" }} />
              </Row>
              <Row gutter={16} justify="space-between">
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Full Name is required",
                      },
                    ]}
                    tooltip="This is a required field"
                  >
                    <Input placeholder="fullName" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Address" name="address">
                    <TextArea rows={1} placeholder="address" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Phone is required",
                      },
                    ]}
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item
                    label="Alternate Phone Number"
                    name="alternatePhoneNumber"
                  >
                    <Input placeholder="Alternate Phone Number" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please enter a valid email",
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
              </Row>
              {/*  */}
              <Row gutter={16} justify="space-between">
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="NID" name="nid">
                    <Input placeholder="NID" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Birthday" name="birthday">
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="Birthday"
                    />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Marital Status" name="maritalStatus">
                    <Select placeholder="Marital Status">
                      <Select.Option></Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Spouse’s Name" name="spouseName">
                    <Input placeholder="Spouse’s Name" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Spouse’s Employer" name="spouseEmployer">
                    <Input placeholder="Spouse’s Employer" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>Job Information</h4>
                </Col>
                <Divider style={{ marginTop: "-10px" }} />
              </Row>

              <Row gutter={16} justify="space-between">
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item
                    label="Designation"
                    name="designation"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Designation is required",
                      },
                    ]}
                  >
                    <Select placeholder="Designation">
                      <Select.Option></Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Employee ID" name="employeeId">
                    <Input placeholder="Employee ID" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Supervisor" name="supervisor">
                    <Select placeholder="Supervisor">
                      <Select.Option></Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Department" name="department">
                    <Input placeholder="Department" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Work Location" name="workLocation">
                    <Input placeholder="Work Location" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} justify="space-between">
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item
                    label="Work Email"
                    name="workEmail"
                    rules={[
                      { type: "email", message: "Please enter a valid email" },
                    ]}
                  >
                    <Input placeholder="Work Email" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Work Phone" name="workPhone">
                    <Input placeholder="Work Phone" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Cell Phone" name="cellPhone">
                    <Input placeholder="Cell Phone" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Start Date" name="startDate">
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="Start Date"
                    />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Salary" name="salary">
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      placeholder="Salary"
                    />
                  </Form.Item>
                </Col>
              </Row>
              {/*  */}
              <Row>
                <Col>
                  <h4>Emergency Contact Information</h4>
                </Col>
                <Divider style={{ marginTop: "-10px" }} />
              </Row>

              <Row gutter={16} justify="space-between">
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Full Name" name="emergencyFullName">
                    <Input placeholder="Full Name" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Address" name="emergencyAddress">
                    <TextArea rows={1} placeholder="Address" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Primary Phone" name="emergencyPrimaryPhone">
                    <Input placeholder="Primary Phone" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Alternate Phone" name="alternatePhone">
                    <Input placeholder="Alternate Phone:" />
                  </Form.Item>
                </Col>
                <Col lg={{ span: 4 }} xs={24}>
                  <Form.Item label="Relationship" name="relationship">
                    <Input placeholder="Relationship" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end" gutter={16}>
                <Col>
                  <Button htmlType="reset">Reset</Button>
                </Col>
                <Col>
                  <Button htmlType="submit" type="primary">
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
