import { Layout, Space, Button, Modal, Form,Row,Col,Input,Select } from "antd";
import { useState } from "react";

const { Content, Header } = Layout;
const Page = () => {
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
        
          <Content>
            <Button type="primary" onClick={showModal}>
              Add Program
            </Button>
            <Modal
              title="Add Program"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[]}
            >
             
              <Form layout='vertical'
              initialValues={{
                status:"In Progress"
              }}
              >
              <Row>
              <Col lg={{span:24}} xs={24}>
                <Form.Item label="Program Name" name='program' required rules={[{
                  required:true,
                  message:"Program Name is Required"
                }]}>
                  <Input placeholder="Program Name"/>
                </Form.Item>
                </Col>
                </Row>
                <Row>
                  <Col lg={{span:24}} xs={24}> <Form.Item
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
                  </Form.Item></Col>
                </Row>
                <Row justify='end' gutter={16}>
                  <Col ><Button htmlType="reset">Reset</Button></Col>
                  <Col ><Button htmlType="submit" type="primary">Submit</Button></Col>
                </Row>
              </Form>
            </Modal>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
