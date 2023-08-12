import { Suspense, lazy, useState } from "react";
import "./App.css";
import { Layout, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Content, Footer, Header } from "antd/es/layout/layout";
const AddProject = lazy(() => import("./Pages/Project/Add/Page"));

const ProjectList = lazy(() => import("./Pages/Project/List/Page"));
const Sidebar = lazy(() => import("./Components/Sidebar/Index"));
// const AddProgram = lazy(() => import("./Pages/Program/add/Page"));
const AddOutcome = lazy(() => import("./Pages/Outcome/add/Page"));
const AddActivity = lazy(() => import("./Pages/Activity/Add/Page"));
import Spinner from "./Components/Spinner/Page";
const Program = lazy(() => import("./Pages/Activity/programs/list/Page"));
const AddEmployee = lazy(() => import("./Pages/Employee/add/page"));
const AddBudget = lazy(() => import("./Pages/DetailBudget/Add/Page"));

function App() {
  return (
    <>
      <HashRouter>
        <Space
          direction="vertical"
          style={{
            width: "100%",
          }}
          size={[0, 48]}
        >
          <Layout>
            <Suspense fallback={<Spinner />}>
              <Sidebar>
                <Routes>
                  <Route
                    path="/addproject"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <AddProject />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/projectlist"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <ProjectList />
                      </Suspense>
                    }
                  />

                  <Route
                    path="/addoutcome"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <AddOutcome />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/addactivity"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <AddActivity />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/addemployee"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <AddEmployee />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/addbudget"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <AddBudget />
                      </Suspense>
                    }
                  />
                </Routes>
              </Sidebar>
            </Suspense>
          </Layout>
        </Space>
      </HashRouter>
    </>
  );
}

export default App;
