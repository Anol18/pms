import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
const items = [
  {
    key: "1",

    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Profile
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        Setting
      </a>
    ),
  },

  {
    key: "4",
    danger: true,
    label: "Logout",
  },
];
const Page = () => {
  return (
    <>
      <Space style={{ float: "right", marginRight: "2%" }}>
        <Dropdown
          menu={{
            items,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar size={40} icon={<UserOutlined />} />
            </Space>
          </a>
        </Dropdown>
      </Space>
    </>
  );
};

export default Page;
