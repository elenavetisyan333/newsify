import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider as StoreProvider } from "react-redux";
import store from "./store/store";

const rootElement = document.getElementById("root");

ReactDOM
  .createRoot(rootElement)
  .render(
    <BrowserRouter>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </BrowserRouter>
);
