import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";

import { FloatButton } from "antd";
const Page = () => {
  return (
    <>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{
          right: 25,
          bottom: 20,
        }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </>
  );
};

export default Page;
