import {
  Layout,
  Space,
  Row,
  Col,
  Select,
  Table,
  Modal,
  InputNumber,
  Form,
  Button,
} from "antd";
import { PlusCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
const { Content, Header } = Layout;

import { useState } from "react";
import {
  useAddDetailBudgetMutation,
  useDetailBudgetListQuery,
} from "../../../api/apiSlices/detailBudget.api.slice";
import { useParticularListQuery } from "../../../api/apiSlices/particular.api";
import { useObjectTypeListQuery } from "../../../api/apiSlices/objectType.slice";
import { useActivityTypeListQuery } from "../../../api/apiSlices/activityType.slice";
import { useVatListQuery } from "../../../api/apiSlices/vat.slice";
import { useNavigate } from "react-router-dom";

// const dataSocurce = [{ index: 1 }];
const Page = () => {
  const { data, isLoading, isSuccess, error } = useDetailBudgetListQuery();
  const { data: particular, isSuccess: particularSuccess } =
    useParticularListQuery();
  const { data: objectType } = useObjectTypeListQuery();
  const { data: activityType } = useActivityTypeListQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addDetailBudget] = useAddDetailBudgetMutation();
  const { data: vat, isSuccess: vatSuccess } = useVatListQuery();
  const [result, setResult] = useState();
  const [outcomeResult, setOutcomeResult] = useState();
  // const [totalGrossValue, setTotalGrossValue] = useState(0);
  const [calGRoss, setCalGross] = useState(0);
  const [netTotal, setNetTotal] = useState(0);
  const navigate = useNavigate();
  const [addRow, setAddRow] = useState([
    {
      key: 0,
      index: 0,
      sl: 1,
      particular: "",
      costPerUnit: "",
      objectUnit: "",
      objectType: "",
      activityUnit: "",
      activityType: "",
      durationUnit: "",
      durationType: "",
      gross: 0,
      tax: 0,
      net: 0,
    },
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
    const newRow = {
      key: addRow.length + 1,
      index: addRow.length,
      sl: addRow.length + 1,
      particular: "",
      costPerUnit: "",
      objectUnit: "",
      objectType: "",
      activityUnit: "",
      activityType: "",
      durationUnit: "",
      durationType: "",
      gross: 0,
      tax: 0,
      net: 0,
    };
    setAddRow([...addRow, newRow]);
    const updatedNetTotal = addRow.reduce((total, row) => {
      const { gross, tax } = row;
      const net = gross + (gross * (vat[0]?.vat / 100) + gross * (tax / 100));

      return total + net;
    }, 0);

    setNetTotal(updatedNetTotal);

    handleOk();
  };
  let showData = [];

  const handleActivityTable = (index, field, value) => {
    if (field === "particular") {
      particular.map((i) => {
        if (i.particular === value) {
          // Set the tax value for the specific row
          addRow[index].tax = i.totalTax;
          // setPreDefinedTax(i.totalTax);
        }
      });
    }

    const updatedRows = addRow.map((row) => {
      if (row.index === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setAddRow(updatedRows);

    const updatedRowsWithTax = updatedRows.map((row) => {
      const { costPerUnit, objectUnit, activityUnit, durationUnit, tax } = row;
      const gross = costPerUnit * objectUnit * activityUnit * durationUnit;

      let net = gross + (gross * (vat[0]?.vat / 100.0) + gross * (tax / 100));
      return { ...row, gross, net };
    });
    setAddRow(updatedRowsWithTax);
    //
    const updatedNetTotal = addRow.reduce((total, row) => {
      const { gross, tax } = row;
      const net = gross + (gross * (vat[0]?.vat / 100) + gross * (tax / 100));
      return total + net;
    }, 0);
    const updatedGrossTotal = addRow.reduce((total, row) => {
      const { gross } = row;
      return total + gross;
    }, 0);
    setNetTotal(updatedNetTotal);
    setCalGross(updatedGrossTotal);
  };
  const columnName = [
    {
      title: "#SL",
      align: "center",
      dataIndex: "sl",
    },
    {
      title: "Particular",
      render: () => (
        <Select
          style={{ width: "100%" }}
          onChange={(value) =>
            handleActivityTable(addRow.length - 1, "particular", value)
          }
          allowClear
          showSearch
          name="particular"
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
      render: () => (
        <InputNumber
          onChange={(value) =>
            handleActivityTable(addRow.length - 1, "costPerUnit", value)
          }
          min={0}
          name="costPerUnit"
        />
      ),
      width: "10%",
      align: "center",
    },
    {
      title: "Object Unit",
      render: () => (
        <InputNumber
          style={{ width: "100%" }}
          onChange={(value) =>
            handleActivityTable(addRow.length - 1, "objectUnit", value)
          }
          min={1}
          name="objectUnit"
        />
      ),
      width: "6%",
      align: "center",
    },
    {
      title: "Object Type",
      render: () => (
        <Select
          style={{ width: "100%" }}
          allowClear
          showSearch
          onChange={(value) =>
            handleActivityTable(addRow.length - 1, "objectType", value)
          }
          name="objectType"
        >
          {objectType?.map((item) => {
            return (
              <Select.Option key={item.id} value={item.objectType}>
                {item.objectType}
              </Select.Option>
            );
          })}
        </Select>
      ),
      width: "10%",
      align: "center",
    },
    {
      title: "Activity Unit",
      render: () => (
        <InputNumber
          style={{ width: "100%" }}
          onChange={(value) =>
            handleActivityTable(addRow.length - 1, "activityUnit", value)
          }
          min={1}
          name="activityUnit"
        />
      ),
      width: "6%",
      align: "center",
    },
    {
      title: "Activity Type",
      render: () => (
        <Select
          style={{ width: "100%" }}
          allowClear
          showSearch
          onChange={(value) =>
            handleActivityTable(addRow.length - 1, "activityType", value)
          }
          name="activityType"
        >
          {activityType?.map((item) => {
            return (
              <Select.Option key={item.id} value={item.activityType}>
                {item.activityType}
              </Select.Option>
            );
          })}
        </Select>
      ),
      width: "8%",
      align: "center",
    },
    {
      title: "Duration Unit",
      render: () => (
        <InputNumber
          style={{ width: "100%" }}
          onChange={(value) =>
            handleActivityTable(-1 + addRow.length, "durationUnit", value)
          }
          min={1}
          name="durationUnit"
        />
      ),
      width: "6%",
      align: "center",
    },
    {
      title: "Duration Type",
      render: () => (
        <Select
          style={{ width: "100%" }}
          allowClear
          showSearch
          onChange={(value) =>
            handleActivityTable(addRow.length - 1, "durationType", value)
          }
          name="durationType"
        >
          <Select.Option value="Min/Mins" key={1}>
            Min/Mins
          </Select.Option>
          <Select.Option value="Hr/Hrs" key={2}>
            Hr/Hrs
          </Select.Option>
          <Select.Option value="Day/Days" key={3}>
            Day/Days
          </Select.Option>
          <Select.Option value="Mo/Mos" key={4}>
            Mo/Mos
          </Select.Option>
          <Select.Option value="Yr/Yrs" key={5}>
            Yr/Yrs
          </Select.Option>
        </Select>
      ),
      width: "8%",
      align: "center",
    },
    {
      title: "Gross Total",
      render: (_, record) => (
        <InputNumber style={{ width: "100%" }} disabled value={record.gross} />
      ),
      with: "10%",
      align: "center",
    },
    {
      title: "Net Total",
      render: (_, record) => (
        <InputNumber style={{ width: "100%" }} disabled value={record.net} />
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

  // form onChange handler
  const onChangeOutcome = (e) => {
    if (e) {
      for (const item of result) {
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
  const handleSubmit = async (e) => {
    const vatRes = vat[0]?.vat;
    const res = await addDetailBudget({
      e,
      addRow,
      vatRes,
      netTotal,
      calGRoss,
    });
    // console.log(res);
    // if (res) {
    //   navigate("/detailedbudgetlist");
    // }
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
            <Form
              layout="vertical"
              style={{ padding: "20px" }}
              onFinish={handleSubmit}
            >
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
              <Row className="total-budget-section" justify="end">
                <Col>
                  <Row>
                    <Col>
                      <b>
                        Gross Total:
                        <input
                          value={calGRoss}
                          type="text"
                          readOnly
                          style={{
                            outline: "none",
                            border: "none",
                            textAlign: "end",
                            marginRight: "5px",
                            marginLeft: "5px",
                            color: "green",
                          }}
                        />
                        BDT
                      </b>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <b>
                        Net Total:
                        <input
                          type="text"
                          readOnly
                          value={netTotal}
                          style={{
                            outline: "none",
                            border: "none",
                            textAlign: "end",
                            marginRight: "5px",
                            marginLeft: "17px",
                            color: "green",
                          }}
                        />
                        BDT
                      </b>
                    </Col>
                  </Row>
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
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
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
