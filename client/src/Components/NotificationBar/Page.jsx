import { useState } from "react";
import { Button, Drawer, Badge, Avatar } from "antd";
import { BellFilled } from "@ant-design/icons";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
const Page = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <span
        style={{
          float: "right",
          marginRight: "2%",
          marginTop: "5px",
        }}
      >
        <Badge count={5} size="small">
          {/* <Avatar shape="square" size="large" /> */}
          <BellFilled
            onClick={showDrawer}
            style={{ fontSize: "1.3rem", color: "var(--light)" }}
          />
        </Badge>
      </span>

      <Drawer
        title="Notifications"
        placement="right"
        width={260}
        onClose={onClose}
        open={open}
        style={{ backgroundColor: "rgb(239, 239, 239)" }}
      ></Drawer>
    </>
  );
};

export default Page;
