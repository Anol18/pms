import { Layout, Row, Space, Col, List, Avatar } from "antd";
const { Content } = Layout;
const Page = () => {
  return (
    <>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Layout>
          <Content style={{ padding: "20px", paddingBottom: "50px" }}>
            <Row gutter={16}>
              <Col lg={{ span: 12 }}>
                <h4>Recent activities are accomplished </h4>
                <List
                  dataSource={[
                    {
                      id: 1,
                      name: "Lily",
                    },
                    {
                      id: 2,
                      name: "Lily",
                    },
                    {
                      id: 3,
                      name: "Lily",
                    },
                    {
                      id: 4,
                      name: "Lily",
                    },
                    {
                      id: 5,
                      name: "Lily",
                    },
                  ]}
                  bordered
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      //   actions={[<a key={`a-${item.id}`}>View Profile</a>]}
                      style={{ backgroundColor: "#fff", height: "4rem" }}
                    >
                      <List.Item.Meta
                        // avatar={
                        //   <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                        // }
                        title={
                          <a href="https://ant.design/index-cn">{item.name}</a>
                        }
                        description="Progresser XTech"
                      />
                    </List.Item>
                  )}
                />
              </Col>
              <Col lg={{ span: 12 }}>
                <h4>Upcoming Activities </h4>
                <List
                  dataSource={[
                    {
                      id: 1,
                      name: "Lily",
                    },
                    {
                      id: 2,
                      name: "Lily",
                    },
                    {
                      id: 3,
                      name: "Lily",
                    },
                    {
                      id: 4,
                      name: "Lily",
                    },
                    {
                      id: 5,
                      name: "Lily",
                    },
                  ]}
                  bordered
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      //   actions={[<a key={`a-${item.id}`}>View Profile</a>]}
                      style={{ backgroundColor: "#fff", height: "4rem" }}
                    >
                      <List.Item.Meta
                        // avatar={
                        //   <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                        // }
                        title={
                          <a href="https://ant.design/index-cn">{item.name}</a>
                        }
                        description="Progresser XTech"
                      />
                    </List.Item>
                  )}
                />
              </Col>
            </Row>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
