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
import { useProjectListQuery } from "../../../api/apiSlices/projectApi/projectSlice";
import { useAddOutcomeMutation } from "../../../api/apiSlices/outcome.slice";
import { useNavigate } from "react-router-dom";
const { Content, Header } = Layout;
const Page = () => {
  const { data, isSuccess } = useProjectListQuery();
  const [addOutcome, response] = useAddOutcomeMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await addOutcome(data);
    if (res) {
      navigate("/outcomelist");
    }
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
            <Form
              layout="vertical"
              initialValues={{
                status: "In Progress",
              }}
              onFinish={onSubmit}
            >
              <Row>
                <Col lg={{ span: 24 }} xs={24}>
                  <Form.Item
                    label="Project"
                    required
                    name="projectID"
                    rules={[
                      { required: true, message: "Please select project" },
                    ]}
                  >
                    <Select
                      placeholder="Please Select Project"
                      showSearch
                      allowClear
                    >
                      {isSuccess &&
                        data.map((item) => {
                          return (
                            <Select.Option key={item.id} value={item.id}>
                              {item.projectName}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 24 }} xs={24}>
                  <Form.Item
                    label="Outcome Name"
                    name="outcomeName"
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
