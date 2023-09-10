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
// const Program = lazy(() => import("./Pages/Activity/programs/list/Page"));
const AddEmployee = lazy(() => import("./Pages/Employee/add/page"));
const AddBudget = lazy(() => import("./Pages/DetailBudget/Add/Page"));
const AddPip = lazy(() => import("./Pages/PIP/add/Page"));
const Dashboard = lazy(() => import("./Pages/Dashboard/Page"));
const ActivityList = lazy(() => import("./Pages/Activity/List/page"));
const Particular = lazy(() => import("./Pages/Settings/Particulars/List/Page"));
const DetailBudgetList = lazy(() => import("./Pages/DetailBudget/List/Page"));
const FloatButton = lazy(() => import("./Components/FloatButton/Page"));
// Settings
const ActivityType = lazy(() =>
  import("./Pages/Settings/Activity-type/List/Page")
);
const Designation = lazy(() =>
  import("./Pages/Settings/Designation/List/Page")
);
const ObjectType = lazy(() => import("./Pages/Settings/Object-type/List/Page"));
const DurationType = lazy(() =>
  import("./Pages/Settings/Duration-type/List/Page")
);
const VatList = lazy(() => import("./Pages/Settings/Vat/List/Page"));
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
                <Suspense fallback={<Spinner />}>
                  <FloatButton />
                </Suspense>
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
                    path="/detailedbudgetlist"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <DetailBudgetList />
                      </Suspense>
                    }
                  />
                  {/* Settings Route */}
                  <Route
                    path="/activityType"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <ActivityType />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/objectType"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <ObjectType />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/designation"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <Designation />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/particular"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <Particular />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/durationType"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <DurationType />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/vat"
                    element={
                      <Suspense fallback={<Spinner />}>
                        <VatList />
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
