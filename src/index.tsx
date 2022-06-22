import React from "react";
import ReactDOM from "react-dom/client";
// @ts-ignore
import App from "./App.tsx";
import "./index.module.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
