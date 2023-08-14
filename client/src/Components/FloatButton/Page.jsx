import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";

import { FloatButton } from "antd";
const Page = () => {
  return (
    <>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{
          left: 150,
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
