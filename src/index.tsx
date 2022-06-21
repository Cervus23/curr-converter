import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// import styles from "./index.module.scss";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);