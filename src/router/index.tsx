// router/index.js
import { RouteObject } from "react-router-dom";
import { Index, Date, User, Login } from "./module";
const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/date",
    element: <Date />,
  },
  {
    path: "/user",
    element: <User />,
  },
];

export default routes;
