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
const OutcomeList = lazy(() => import("./Pages/Outcome/list/Page"));
const AddActivity = lazy(() => import("./Pages/Activity/Add/Page"));
import Spinner from "./Components/Spinner/Page";
const Program = lazy(() => import("./Pages/Activity/programs/list/Page"));
const AddEmployee = lazy(() => import("./Pages/Employee/add/page"));
const AddBudget = lazy(() => import("./Pages/DetailBudget/Add/Page"));
const AddPip = lazy(() => import("./Pages/PIP/add/Page"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Page"));
const ActivityList = lazy(() => import("./Pages/Activity/List/page"));
const BudgetDescriptionList = lazy(() =>
  import("./Pages/BudgetDescription/List/Page")
);

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
                    path="/"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <Dashboard />
                      </Suspense>
                    }
                  />
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
                    path="/outcomelist"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <OutcomeList />
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
                    path="/activitylist"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <ActivityList />
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
                  <Route
                    path="/pip"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <AddPip />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/budgetdescription"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <BudgetDescriptionList />
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
