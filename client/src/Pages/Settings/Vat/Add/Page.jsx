import { useState } from "react";
import {
  Layout,
  Space,
  Button,
  Modal,
  Row,
  Col,
  Form,
  InputNumber,
} from "antd";
const { Content } = Layout;
import { PlusCircleOutlined } from "@ant-design/icons";
import { useAddVatMutation } from "../../../../api/apiSlices/vat.slice";
const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [addVat] = useAddVatMutation();
  // const [addObjectType] = useAddObjectTypeMutation();
  // const [] = use;
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
    // await addObjectType(value);
    await addVat(value);
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
        Add VAT
      </Button>

      <Modal
        title="Add VAT"
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
                          name="vat"
                          label="VAT"
                          required
                          rules={[
                            {
                              required: true,
                              message: "VAT is required",
                            },
                          ]}
                        >
                          <InputNumber
                            placeholder="VAT"
                            min={0}
                            className="w-full"
                          />
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
