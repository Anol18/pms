import { useState } from "react";
import { Layout, Space, Button, Modal, Row, Col, Form, Input } from "antd";
const { Content, Header } = Layout;
import { PlusCircleOutlined } from "@ant-design/icons";
import { useAddActivityTypeMutation } from "../../../../api/apiSlices/activityType.slice";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [addActivityType, response] = useAddActivityTypeMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (value) => {
    await addActivityType(value);
    handleOk();
    form.resetFields();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        icon={<PlusCircleOutlined />}
        className="shadow"
      >
        Add Activity Type
      </Button>

      <Modal
        title="Add Activity Type"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Space direction="vertical" className="w-full">
          <Layout>
            <Content>
              <Row>
                <Col lg={{ span: 24 }}>
                  <Form
                    layout="vertical"
                    className="p-20"
                    form={form}
                    onFinish={handleSubmit}
                  >
                    <Row>
                      <Col lg={{ span: 24 }}>
                        <Form.Item
                          name="activityType"
                          label="Activity Type"
                          required
                          rules={[
                            {
                              required: true,
                              message: "Activity type is required",
                            },
                          ]}
                        >
                          <Input placeholder="Activity Type" />
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
                </Col>
              </Row>
            </Content>
          </Layout>
        </Space>
      </Modal>
    </>
  );
};

export default Page;
