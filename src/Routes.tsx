import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Juan from "./pages/Juan";
import Landing from "./pages/Landing";
import Maria from "./pages/Maria";
import NotFound from "./NotFound";
import ProtectedRoutes from "./ProtectedRoute";
import Details from "./pages/Details";
import DetailsInterval from "./pages/DetailsInterval";
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
        path: "movie/:id",
        element: <Details />,
      },
      {
        path: "movie/interval/:id",
        element: <DetailsInterval />,
      },
    ],
  },
  {
    path: "juan",
    element: <Juan />,
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
