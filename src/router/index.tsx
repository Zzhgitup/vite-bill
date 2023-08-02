// router/index.js
import { RouteObject } from "react-router-dom";
import { Index, Date, User, Login, About, Userinfo, Password } from "./module";
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
  {
    path: "/detile",
    element: <About />,
  },
  {
    path: "/userinfo",
    element: <Userinfo />,
  },
  {
    path: "/password",
    element: <Password />,
  },
];

export default routes;
