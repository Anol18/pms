import { Spin } from "antd";
const Page = () => {
  return (
    <>
      <div className="spinner-container">
        <Spin tip="Loading">
          <div className="spinner-content" />
        </Spin>
      </div>
    </>
  );
};

export default Page;
