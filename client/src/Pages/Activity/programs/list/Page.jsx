import { Col, Layout, Row, Space, Table } from "antd";
import { Suspense, lazy } from "react";
const { Content, Header } = Layout;
const AddProgram = lazy(() => import("../../programs/add/Page"));
import Spinner from "../../../../Components/Spinner/Page"
const column = [
  {
    title:"#SL"
  },
  {
    title:"Program Name"
  },
  {
    title:"Activity Name"
  },
  {
    title:"Status"
  }
]
const Page = () => {
  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
        size={[0, 48]}
      >
        <Layout style={{padding:'20px'}}>
          <Header style={{backgroundColor:"var(--light)"}}  ><Row justify='center'><Col><h4>Programs</h4></Col></Row> </Header>
          <Content>
            <Row justify='end' style={{margin:"20px 0px 20px 0px"}}>
              <Col><Suspense fallback={<Spinner/>}><AddProgram/></Suspense></Col>
            </Row>
            <Row>
              <Col lg={{span:24}} xs={24}><Table columns={column} /></Col>
            </Row>
          </Content>
        </Layout>
      </Space>
    </>
  );
};

export default Page;
