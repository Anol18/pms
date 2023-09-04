import { Layout, Space } from "antd";
const { Content, Header } = Layout;

const Page = () => {
  return (
    <>
      <Space className="w-full" size={[0, 48]} direction="vertical">
        <Layout>
          <Header className="header">Activity Type</Header>
          <Content></Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
