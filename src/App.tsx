/* eslint-disable react-hooks/exhaustive-deps */
import React, { Suspense, useState, useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import routes from "./router";
import Navbar from "./components/Navbar";
import "./style.less";
import "@/assets/font_4182619_rmcdwklscn9/iconfont.css";
function App() {
  const [isshow, setShow] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const Navb = ["/", "/date", "/user"];
  useEffect(() => {
    if (Navb.includes(pathname)) {
      console.log(pathname);
      setShow(true);
    } else {
      console.log(pathname);
      setShow(false);
    }
  }, [pathname]);
  return (
    <div className="App">
      <Suspense fallback={"loading"}>{useRoutes(routes)}</Suspense>
      <Navbar showNav={isshow} />
    </div>
  );
}

export default App;
