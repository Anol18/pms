import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Row,
  Tabs,
  Select,
  Space,
  Table,
  Modal,
} from "antd";
import { useState } from "react";

import { useProjectListQuery } from "../../../api/apiSlices/projectApi/projectSlice";
const { Content, Header } = Layout;

const Page = () => {
  const [form] = Form.useForm();

  const { data, isLoading, error } = useProjectListQuery();

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
                    label="Project"
                    name="project"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Project Name is Required",
                      },
                    ]}
                    tooltip="This is a required field"
                  >
                    <Select placeholder="Select Project" showSearch allowClear>
                      <Select.Option></Select.Option>
                      <Select.Option></Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 24 }} xs={24}>
                  <Form.Item
                    label="Outcome"
                    name="outcome"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Outcome Name is Required",
                      },
                    ]}
                    tooltip="This is a required field"
                  >
                    <Select placeholder="Select Project" showSearch allowClear>
                      <Select.Option></Select.Option>
                      <Select.Option></Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={{ span: 24 }} xs={24}>
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
              </Row>
              <Row>
                <Col>
                  <Tabs
                    tabPosition="left"
                    items={new Array(3).fill(null).map((_, i) => {
                      const id = String(i + 1);
                      return {
                        label: `202${id}`,
                        key: id,
                        children: (
                          <>
                            <Form.Item name="totalActivity">
                              <Input placeholder="Total Activity" />
                            </Form.Item>
                          </>
                        ),
                      };
                    })}
                  />
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
