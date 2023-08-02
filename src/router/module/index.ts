import React from "react";
const Index = React.lazy(() => import("@/views/Index/"));
const User = React.lazy(() => import("@/views/User"));
const Date = React.lazy(() => import("@/views/Date"));
const Login = React.lazy(() => import("@/views/Login"));
const About = React.lazy(() => import("@/views/About"));
const Userinfo = React.lazy(() => import("@/views/User/c-child/useinfo"));
const Password = React.lazy(() => import("@/views/User/c-child/passwordider"));
export { Index, User, Date, Login, About, Userinfo, Password };
