import React, { useState } from "react";
import {
  Button,
  Checkbox,
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
import { useAddparticularMutation } from "../../../../api/apiSlices/particular.api";
const { Content } = Layout;
const Page = () => {
  const [form] = Form.useForm();
  const [addparticular, response] = useAddparticularMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAc, setIsAc] = useState(false);
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
    await addparticular({ value, isAc });
    handleCancel();
    form.resetFields();
    setIsAc(false);
  };
  function handleAc(e) {
    setIsAc(e.target.checked);
  }
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
                    <Row gutter={16} justify="space-between">
                      <Col lg={{ span: 6 }} xs={24}>
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
                      <Col lg={{ span: 6 }} xs={24}>
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
                          <InputNumber
                            addonAfter="%"
                            placeholder="TAX"
                            className="w-full"
                          />
                        </Form.Item>
                      </Col>
                      <Col lg={{ span: 3 }} xs={24}>
                        <Form.Item label name="isAc">
                          <Checkbox className="w-full" onChange={handleAc}>
                            AC
                          </Checkbox>
                        </Form.Item>
                      </Col>
                      <Col lg={{ span: 6 }} xs={24}>
                        {isAc && (
                          <Form.Item
                            label="AC TAX"
                            name="acTax"
                            required
                            rules={[
                              {
                                required: true,
                                message: "AC TAX is required",
                              },
                            ]}
                          >
                            <InputNumber placeholder="AC TAX" />
                          </Form.Item>
                        )}
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
