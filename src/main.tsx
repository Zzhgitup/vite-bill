import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "lib-flexible";
import { ConfigProvider } from "react-vant";

import App from "./App.tsx";
const themeVars = {
  rateIconFullColor: "#ffcc56",
  sliderBarHeight: "4px",
  sliderButtonWidth: "20px",
  sliderButtonHeight: "20px",
  sliderActiveBackgroundColor: "rgb(30,128,255)",
  buttonPrimaryBorderColor: "rgb(30,128,255)",
  buttonPrimaryBackgroundColor: "rgb(30,128,255)",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ConfigProvider themeVars={themeVars}>
      <Suspense fallback="error">
        <App />
      </Suspense>
    </ConfigProvider>
  </BrowserRouter>
);
