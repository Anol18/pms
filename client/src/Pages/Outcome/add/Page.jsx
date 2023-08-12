import React from "react";
import {
  Layout,
  Space,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Select,
} from "antd";
import { useState } from "react";
const { Content, Header } = Layout;
const Page = () => {
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
            <Form
              layout="vertical"
              initialValues={{
                status: "In Progress",
              }}
            >
              <Row>
                <Col lg={{ span: 24 }} xs={24}>
                  <Form.Item
                    label="Project"
                    required
                    name="projectName"
                    rules={[
                      { required: true, message: "Please select project" },
                    ]}
                  >
                    <Select
                      placeholder="Please Select Project"
                      showSearch
                      allowClear
                    >
                      <Select.Option>asdas</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 24 }} xs={24}>
                  <Form.Item
                    label="Outcome Name"
                    name="Outcome"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Outcome Name is Required",
                      },
                    ]}
                  >
                    <Input placeholder="Outcome" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 24 }} xs={24}>
                  {" "}
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
