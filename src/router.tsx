import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/home";
import Admin from "./pages/admin/admin";
import Login from "./pages/login/login";
import NotFound from "./pages/notfound/notfound";
import Layout from "./components/layout";
import Network from "./pages/network.tsx/network";
import { Private } from "./router/private";

export const routerApp = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin",
        element: (
          <Private>
            <Admin />
          </Private>
        ),
      },
      {
        path: "/admin/social",
        element: <Network />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
