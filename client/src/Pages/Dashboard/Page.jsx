import { Suspense, lazy } from "react";
import Spinner from "../../Components/Spinner/Page";
const Statistic = lazy(() => import("../../Components/Statistic/Page"));
const ActivityList = lazy(() => import("../../Components/ActivityList/Page"));

const Page = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Statistic />
      </Suspense>
      {/* <RenderLineChart /> */}
      <Suspense fallback={<Spinner />}>
        <ActivityList />
      </Suspense>
    </>
  );
};

export default Page;
