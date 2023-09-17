import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Input, Popconfirm, Row, Select, Table } from "antd";
import { useActivityWisePipListQuery } from "../../../api/apiSlices/activityWisePip.slice";
const EditableContext = React.createContext(null);
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        // rules={[
        //   {
        //     required: true,
        //     message: `${title} is required.`,
        //   },
        // ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const Page = () => {
  const [duration, setDuration] = useState();
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      name: "Edward King 0",
      age: "32",
      address: "London, Park Lane no. 0",
    },
    {
      key: "1",
      name: "Edward King 1",
      age: "32",
      address: "London, Park Lane no. 1",
    },
  ]);
  const { data, isSuccess } = useActivityWisePipListQuery();
  // console.log(data);

  // console.log(dataSource);
  // useEffect(() => {}, [dataSource]);
  const [count, setCount] = useState(2);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: "SL",
      dataIndex: "sl",
      width: "10%",
    },
    {
      title: "Activities",
      dataIndex: "activities",
      width: "20%",
    },
    // {
    //   title: "Unit Budget",
    //   dataIndex: "unitbudget",
    //   editable: true,
    //   children: [
    //     {
    //       title: "abu",
    //       editable: true,
    //     },
    //     {
    //       title: "alu",
    //       editable: true,
    //     },
    //   ],
    // },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  // console.log(year);

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: "32",
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  // const columns = defaultColumns.map((col) => {
  //   if (!col.editable) {
  //     return col;
  //   }
  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       editable: col.editable,
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       handleSave,
  //     }),
  //   };
  // });

  const handleProject = (id) => {
    const visualData = [];

    data?.map((v) => {
      if (v.id === id) {
        // console.log(v);
        setDuration(v.projectDuration);
        visualData.push({
          outcomeName: v.outComeName,
        });
      }
    });
  };

  // const valid = duration[0][0]?.split("/");
  // duration?.map((v) => {
  // console.log(v.split("/")[1]);
  // console.log(v.split("/")[2]);
  // });
  // useEffect(() => {}, [defaultColumns]);
  const [cc, setCc] = useState([]);
  // const year = duration?.map((v) => v.split("/")[2]);
  // console.log("year", year);
  const month = duration?.map((v) => v.split("/")[1]);
  const year = duration?.map((v) => v.split("/")[2]);
  console.log(month && months[parseInt(month[0])]);
  const child = [];
  const addDynamicTable = () => {
    let j = 1;

    if (year && month) {
      for (let k = parseInt(month[0]); k < 12; k++) {
        child.push({ title: months[k], editable: true });
      }

      console.log(child);
      for (let i = year[0]; i <= year[1]; i++, j++) {
        defaultColumns.splice(1 + j, 0, {
          title: i,
          children: [...child],
        });
      }
      setCc(
        defaultColumns.map((col) => {
          if (!col.editable) {
            return col;
          }
          return {
            ...col,
            onCell: (record) => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave,
            }),
          };
        })
      );
    }
  };
  useEffect(() => {
    addDynamicTable();
  }, [duration]);
  return (
    <div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <Row>
        <Col lg={{ span: 24 }}>
          <Select className="w-full" onChange={handleProject}>
            {data?.map((v) => {
              return (
                <Select.Option key={v.id} value={v.id}>
                  {v.projectName}
                </Select.Option>
              );
            })}
          </Select>
        </Col>
      </Row>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        size="small"
        dataSource={dataSource}
        pagination={false}
        columns={cc}
      />
    </div>
  );
};
export default Page;
