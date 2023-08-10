import {
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Row,
  Select,
  Space,
} from "antd";
const { Content, Header } = Layout;
const Page = () => {
  const [form] = Form.useForm();
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
            >
              <Row>
                <Col lg={{ span: 24 }} xs={24}>
                  <Form.Item
                    label="Program"
                    name="program"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Program Name is Required",
                      },
                    ]}
                    tooltip="This is a required field"
                  >
                    <Select placeholder="Select Project">
                      <Select.Option></Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={{ span: 12 }} xs={24}>
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
                <Col lg={{ span: 12 }} xs={24}>
                  <Form.Item
                    label="Unit Budget"
                    name="unitBudget"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Unit Budget is Required",
                      },
                    ]}
                    tooltip="This is a required field"
                  >
                    <InputNumber
                      placeholder="Unit Budget"
                      min={0}
                      style={{ width: "100%" }}
                    />
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
