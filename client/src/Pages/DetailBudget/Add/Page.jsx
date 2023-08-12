import {
  Layout,
  Space,
  Row,
  Col,
  Select,
  Input,
  Table,
  Modal,
  InputNumber,
  Form,
  Button,
} from "antd";
import { PlusCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
const { Content, Header } = Layout;

import { useState } from "react";
const columnName = [
  {
    title: "#SL",
    align: "center",
    dataIndex: "index",
  },
  {
    title: "Description",
    render: () => <Input style={{ borderRadius: 0 }} />,
    width: "20%",
    align: "center",
  },
  {
    title: "Cost Per Unit(BDT)",
    render: () => <InputNumber style={{ borderRadius: 0 }} />,
    width: "10%",
    align: "center",
  },
  {
    title: "Quantity",
    render: () => <InputNumber style={{ width: "100%", borderRadius: 0 }} />,
    width: "6%",
    align: "center",
  },
  {
    title: "Per Unit Description",
    render: () => (
      <Select style={{ width: "100%", borderRadius: 0 }}>
        <Select.Option></Select.Option>
      </Select>
    ),
    width: "10%",
    align: "center",
  },
  {
    title: "Unit",
    render: () => <InputNumber style={{ width: "100%", borderRadius: 0 }} />,
    width: "6%",
    align: "center",
  },
  {
    title: "Description",
    render: () => (
      <Select style={{ width: "100%", borderRadius: 0 }}>
        <Select.Option></Select.Option>
      </Select>
    ),
    width: "10%",
    align: "center",
  },
  {
    title: "Unit",
    render: () => <InputNumber style={{ width: "100%", borderRadius: 0 }} />,
    width: "6%",
    align: "center",
  },
  {
    title: "Description",
    render: () => (
      <Select style={{ width: "100%", borderRadius: 0 }}>
        <Select.Option></Select.Option>
      </Select>
    ),
    width: "10%",
    align: "center",
  },
  {
    title: "BDT Total",
    render: () => (
      <InputNumber
        style={{ width: "100%", borderRadius: 0 }}
        disabled
        value="1000"
      />
    ),
    with: "10%",
    align: "center",
  },
];
// const dataSocurce = [{ index: 1 }];
const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addRow, SetAddRow] = useState([
    { index: 1 },
    { index: 2 },
    { index: 3 },
    { index: 4 },
    { index: 5 },
  ]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleParticularRow = () => {
    let dataSource = [...addRow];
    dataSource = dataSource.length + 1;
    SetAddRow([...addRow, { index: dataSource, dataSource }]);
    handleOk();
  };
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Layout>
          <Header style={{ backgroundColor: "var(--light)" }}>
            <Row justify="center">
              <Col>
                <h4>Add Budget</h4>
              </Col>
            </Row>
          </Header>
          <Content>
            <Form layout="vertical" style={{ padding: "20px" }}>
              <Row>
                <Col lg={{ span: 24 }}>
                  <Form.Item
                    label="Project"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Project is required",
                      },
                    ]}
                  >
                    <Select allowClear showSearch placeholder="Select Project">
                      <Select.Option>sad</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 24 }}>
                  <Form.Item
                    label="Outcome"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Outcome is required",
                      },
                    ]}
                  >
                    <Select allowClear showSearch placeholder="Select Outcome">
                      <Select.Option></Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 24 }}>
                  <Form.Item
                    label="Activity"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Activity is required",
                      },
                    ]}
                  >
                    <Select allowClear showSearch placeholder="Select Activity">
                      <Select.Option></Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 24 }}>
                  <Table
                    columns={columnName}
                    dataSource={addRow}
                    pagination={false}
                    bordered
                  />
                </Col>
              </Row>
              <Row className="total-budget-section" justify="space-between">
                <Col>
                  <b>Total:</b>{" "}
                </Col>
                <Col>
                  <b>000 BDT</b>
                </Col>
              </Row>
              <Row style={{ marginTop: "30px" }}>
                <Col lg={{ span: 24 }}>
                  <Button
                    style={{
                      width: "100%",
                      backgroundColor: "var(--green-button)",
                      color: "var(--light)",
                    }}
                    icon={<PlusCircleFilled />}
                    onClick={showModal}
                  >
                    Add New
                  </Button>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: "20px" }} justify="end">
                <Col>
                  <Button>Reset</Button>
                </Col>
                <Col>
                  <Button type="primary">Submit</Button>
                </Col>
              </Row>
            </Form>
          </Content>
          <Modal
            title="Add New Row"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[]}
            style={{ marginTop: "100px" }}
          >
            <span>
              <Row gutter={5}>
                <Col>
                  <InfoCircleOutlined style={{ color: "#4477CE" }} />
                </Col>
                <Col> This will add a new activity particular row</Col>
              </Row>
            </span>
            <Row justify="end" gutter={10} style={{ marginTop: "20px" }}>
              <Col>
                <Button onClick={handleCancel}>Cancel</Button>
              </Col>
              <Col>
                <Button type="primary" onClick={handleParticularRow}>
                  Add New
                </Button>
              </Col>
            </Row>
          </Modal>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
