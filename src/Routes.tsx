import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Juan from "./Juan";
import Landing from "./Landing";
import Maria from "./Maria";
import NotFound from "./NotFound";
import ProtectedRoutes from "./ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "juan",
        element: <Juan />,
      },
    ],
  },
  {
    path: "maria",
    element: <Maria />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const Routing = () => <RouterProvider router={router} />;

export default Routing;
