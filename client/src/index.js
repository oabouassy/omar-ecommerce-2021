import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, theme } from "./materialConfig";
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
