import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Error from "./components/Error";
import { DataProvider } from "./context/DataContext";

const routerList = [
  {
    path: "/",
    element: <Home />,
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
