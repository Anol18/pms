import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal,
  Row,
  Space,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useAddBudgetDescriptionMutation } from "../../../api/apiSlices/budgetDescription.api.slice";
const { Content } = Layout;
const Page = () => {
  const [form] = Form.useForm();
  const [addBudgetDescription, response] = useAddBudgetDescriptionMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSubmit = async (value) => {
    const res = await addBudgetDescription(value);
    console.log(response);
    form.resetFields();
    handleCancel();
  };
  return (
    <>
      <Button
        icon={<PlusCircleOutlined />}
        type="primary"
        className="shadow"
        onClick={showModal}
      >
        Add Budget Particular & TAX
      </Button>
      <Modal
        title="Add Perticular & TAX"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Space style={{ width: "100%" }} direction="vertical">
          <Layout>
            <Content style={{ padding: "20px" }}>
              <Row>
                <Col lg={{ span: 24 }} xs={24}>
                  <Form layout="vertical" onFinish={onSubmit} form={form}>
                    <Row gutter={16}>
                      <Col lg={{ span: 12 }} xs={24}>
                        <Form.Item
                          label="Particular"
                          required
                          name="particular"
                          rules={[
                            {
                              required: true,
                              message: "Particular is required",
                            },
                          ]}
                        >
                          <Input placeholder="Particular" />
                        </Form.Item>
                      </Col>
                      <Col lg={{ span: 12 }} xs={24}>
                        <Form.Item
                          label="TAX"
                          required
                          name="tax"
                          rules={[
                            {
                              required: true,
                              message: "TAX is required",
                            },
                          ]}
                          tooltip="TAX rate is base on particular"
                        >
                          <InputNumber addonAfter="%" placeholder="TAX" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row gutter={10} justify="end">
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
