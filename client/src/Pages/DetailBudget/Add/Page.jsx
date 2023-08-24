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
import { useDetailBudgetListQuery } from "../../../api/apiSlices/detailBudget.api.slice";
import { useBudgetDescriptionListQuery } from "../../../api/apiSlices/budgetDescription.api.slice";

// const dataSocurce = [{ index: 1 }];
const Page = () => {
  const { data, isLoading, isSuccess, error } = useDetailBudgetListQuery();
  const { data: particular, isSuccess: particularSuccess } =
    useBudgetDescriptionListQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [result, setResult] = useState();

  const [outcomeResult, setOutcomeResult] = useState();

  const [addRow, SetAddRow] = useState([
    { index: 1, key: 1 },
    { index: 2, key: 2 },
    { index: 3, key: 3 },
    { index: 4, key: 4 },
    { index: 5, key: 5 },
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
  let showData = [];
  const handleActivityTable = (e) => {
    console.log(e);
  };
  const columnName = [
    {
      title: "#SL",
      align: "center",
      dataIndex: "index",
    },
    {
      title: "Description",
      render: (text, record, index) => (
        <Select
          style={{ width: "100%" }}
          onChange={handleActivityTable}
          allowClear
          showSearch
        >
          {particularSuccess &&
            particular.map((item) => {
              return (
                <Select.Option key={item.id} value={item.particular}>
                  {item.particular}
                </Select.Option>
              );
            })}
        </Select>
      ),
      width: "15%",
      align: "center",
    },
    {
      title: "Cost Per Unit(BDT)",
      render: () => <InputNumber onChange={handleActivityTable} />,
      width: "10%",
      align: "center",
    },
    {
      title: "Quantity",
      render: () => (
        <InputNumber style={{ width: "100%" }} onChange={handleActivityTable} />
      ),
      width: "6%",
      align: "center",
    },
    {
      title: "Per Unit Description",
      render: () => (
        <Select
          style={{ width: "100%" }}
          allowClear
          showSearch
          onChange={handleActivityTable}
        >
          <Select.Option value="2"> sad</Select.Option>
        </Select>
      ),
      width: "10%",
      align: "center",
    },
    {
      title: "Unit",
      render: () => (
        <InputNumber style={{ width: "100%" }} onChange={handleActivityTable} />
      ),
      width: "6%",
      align: "center",
    },
    {
      title: "Description",
      render: () => (
        <Select
          style={{ width: "100%" }}
          allowClear
          showSearch
          onChange={handleActivityTable}
        >
          <Select.Option value="2">sdf</Select.Option>
        </Select>
      ),
      width: "8%",
      align: "center",
    },
    {
      title: "Unit",
      render: () => (
        <InputNumber style={{ width: "100%" }} onChange={handleActivityTable} />
      ),
      width: "6%",
      align: "center",
    },
    {
      title: "Description",
      render: () => (
        <Select
          style={{ width: "100%" }}
          allowClear
          showSearch
          onChange={handleActivityTable}
        >
          <Select.Option value="2">sdf</Select.Option>
        </Select>
      ),
      width: "8%",
      align: "center",
    },
    {
      title: "Gross Total",
      render: () => (
        <InputNumber
          style={{ width: "100%" }}
          disabled
          value="1000"
          onChange={handleActivityTable}
        />
      ),
      with: "10%",
      align: "center",
    },

    {
      title: "TAX",
      render: (text, record, index) => (
        <InputNumber
          onChange={handleActivityTable}
          style={{ width: "100%" }}
          disabled
          value={record.tax}
        />
      ),
      with: "10%",
      align: "center",
    },
    {
      title: "VAT",
      render: () => (
        <InputNumber
          onChange={handleActivityTable}
          style={{ width: "100%" }}
          disabled
          value="1000"
        />
      ),
      with: "10%",
      align: "center",
    },
    {
      title: "Net Total",
      render: () => (
        <InputNumber
          onChange={handleActivityTable}
          style={{ width: "100%" }}
          disabled
          value="1000"
        />
      ),
      with: "10%",
      align: "center",
    },
  ];
  const OnChangeProject = (e) => {
    if (e) {
      for (const item of data) {
        if (item.projectName === e) {
          item.Outcome?.map((v, i) => {
            showData.push({
              key: item.id + i,
              id: v.id,
              outComeName: v.outcomeName,
              activity: v.Activity,
            });
          });
          setResult(showData);
          break;
        }
      }
    } else {
      setResult();
    }
    showData = [];
  };

  let showOutComeName = [];
  const onChangeOutcome = (e) => {
    if (e) {
      for (const item of result) {
        console.log(item);
        item.activity?.map((v, i) => {
          showOutComeName.push({
            key: i,
            id: v.id,
            activityName: v.activityName,
          });
        });
        setOutcomeResult(showOutComeName);
        break;
      }
    } else {
      setOutcomeResult();
    }
    showOutComeName = [];
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
                <Col lg={{ span: 24 }} xs={24}>
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
                    <Select
                      allowClear
                      showSearch
                      placeholder="Select Project"
                      onChange={OnChangeProject}
                    >
                      {isSuccess &&
                        data.map((i) => {
                          return (
                            <Select.Option key={i.id} value={i.projectName}>
                              {i.projectName}
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
                    label="Outcome"
                    required
                    rules={[
                      {
                        required: true,
                        message: "Outcome is required",
                      },
                    ]}
                  >
                    <Select
                      allowClear
                      showSearch
                      placeholder="Select Outcome"
                      onChange={onChangeOutcome}
                    >
                      {result &&
                        result.map((i) => {
                          return (
                            <Select.Option key={i.id} value={i.id}>
                              {i.outComeName}
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
                    label="Activity"
                    required
                    name="activity"
                    rules={[
                      {
                        required: true,
                        message: "Activity is required",
                      },
                    ]}
                  >
                    <Select allowClear showSearch placeholder="Select Activity">
                      {outcomeResult &&
                        outcomeResult.map((i) => {
                          return (
                            <Select.Option key={i.id} value={i.id}>
                              {i.activityName}
                            </Select.Option>
                          );
                        })}
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
                <Col> A new row will be added</Col>
              </Row>
            </span>
            <Row justify="end" gutter={10} style={{ marginTop: "20px" }}>
              <Col>
                <Button onClick={handleCancel}>Cancel</Button>
              </Col>
              <Col>
                <Button type="primary" onClick={handleParticularRow}>
                  Confirm
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
