import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { userStore } from "./app/store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={userStore}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
