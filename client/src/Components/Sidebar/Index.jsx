// Importing React Components
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile/Page";
import Notification from "../NotificationBar/Page";
import {
  ProjectOutlined,
  AreaChartOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreAddOutlined,
  ContainerFilled,
  SettingFilled,
  SnippetsFilled,
  FileDoneOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

// Ant design item components
import { Layout, Menu, theme, Button } from "antd";
const { Header, Content, Sider } = Layout;

// Sidebar object return Function
function getItem(label, key, icon, children, path) {
  return {
    path,
    key,
    icon,
    children,
    label,
  };
}

// Sidebar Nav menu items
const items = [
  getItem("Dashboard", "/", <AppstoreAddOutlined />, null, "/"),
  getItem("Projects", "sub1", <ProjectOutlined />, [
    getItem("Add Project", "/addproject"),
    getItem("Project List", "/projectlist"),
  ]),

  getItem("Outcome", "sub3", <FileDoneOutlined />, [
    getItem("Add Outcome", "/addoutcome"),
    getItem("Outcome List", "/outcomelist"),
  ]),
  getItem("Activity", "sub11", <AreaChartOutlined />, [
    getItem("Add Activity", "/addactivity"),
    getItem("Activities List", "/activitylist"),
  ]),
  getItem("Detail Bidget", "sub12", <FileSearchOutlined />, [
    getItem("Add Budget", "/addbudget"),
    getItem("Budget List", "/detailedbudgetlist"),
  ]),

  getItem("PIP", "sub4", <SnippetsFilled />, [
    getItem("Activity Wise PIP", "/activitywisepip"),
  ]),
  getItem("Employee", "sub5", <TeamOutlined />, [
    getItem("Add Employee", "/addemployee"),
    getItem("Employee List", "/union/union-list"),
  ]),
  getItem("Settings", "sub6", <SettingFilled />, [
    getItem("Designation", "/designation"),
    getItem("Office Branch", "/branch"),
    getItem("Particulars", "/particular"),
    getItem("Object Type", "/objectType"),
    getItem("Activity Type", "/activityType"),
    // getItem("Duration Type", "/durationType"),

    // getItem("Notifications Settings", "/notifications"),
  ]),
  getItem("Users", "sub7", <SettingFilled />, [
    getItem("Add User", "/user"),
    getItem("Users List", "/user-list"),
  ]),
];

// eslint-disable-next-line react/prop-types
const Index = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [contentPosition, setContentPosition] = useState(200);
  const [buttonPosition, setButtontPosition] = useState(200);
  // const [width, setWidth] = useState(Number(window.innerWidth));
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (collapsed) {
      setContentPosition(70);
      setButtontPosition(80);
    } else {
      setContentPosition(200);
      setButtontPosition(200);
    }
  }, [collapsed]);
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          // collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 20,
          }}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              // background: "rgba(255, 255, 255,0.2)",
              borderRadius: "7px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#434a61",
              gap: "5px",
            }}
            className="logo"
          >
            {/* Logo Image */}
            {/* <img src={{}} alt="logo" srcSet="" width={30} height={32} /> */}
            <span>
              <ContainerFilled style={{ color: "white" }} />
            </span>
            <h1
              hidden={collapsed}
              style={{ color: "white", fontSize: "1.2em" }}
            >
              PMS
            </h1>
          </div>

          {/* main menu */}
          <Menu
            theme="light"
            style={{ backgroundColor: "var(--sidebar-color)", color: "#fff" }}
            defaultSelectedKeys={["sub"]}
            mode="inline"
            items={items}
            onClick={({ key }) => {
              navigate(key);
            }}
          />
        </Sider>
        <Layout className="site-layout" style={{}}>
          <Header
            style={{
              padding: 0,
              // background: colorBgContainer,
              background: "var(--sidebar-color)",
              position: "fixed",
              top: 0,
              zIndex: 10,
              width: "100%",
            }}
          >
            {/* collaps button */}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="toggle-button"
              style={{
                color: "white",
                marginLeft: buttonPosition,
                // display: width <= 767 && "none",
              }}
            />

            {/* profile */}
            <Profile />
            {/* Notification */}
            <Notification />
          </Header>
          <Content
            className="main-content"
            style={{ marginLeft: contentPosition }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                width: "100%",
              }}
            >
              {children}
            </div>
          </Content>
          {/* <Footer
            style={{
              textAlign: "center",
              marginLeft: contentPosition,
              width: "100%",
            }}
            className="footer"
          >
            Copy Right ©2023 Decent Act International
          </Footer> */}
        </Layout>
      </Layout>
    </>
  );
};

export default Index;
