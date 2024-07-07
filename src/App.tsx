import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import { lazy, Suspense } from "react";
import Error from "./components/common/Error";
import { DataProvider } from "./context/DataContext";

const Home = lazy(() => import("./pages/Home"));

const routerList = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Home />
      </Suspense>
    ),
  },
];

const router = createBrowserRouter(
  routerList.map((route) => {
    return {
      ...route,
      element: <Layout>{route.element}</Layout>,
      errorElement: <Error />,
    };
  })
);

function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}

export default App;
