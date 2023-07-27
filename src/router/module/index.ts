import React from "react";
const Index = React.lazy(() => import("@/views/Index/"));
const User = React.lazy(() => import("@/views/User"));
const Date = React.lazy(() => import("@/views/Date"));
const Login = React.lazy(() => import("@/views/Login"));
export { Index, User, Date, Login };
