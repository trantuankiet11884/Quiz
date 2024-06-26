import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "./Layout";
import { store, persistor } from "./redux/store";
import "nprogress/nprogress.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-awesome-lightbox/build/style.css";
import { PersistGate } from "redux-persist/integration/react";
import i18n from "./utils/i18n";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor} loading={null}>
        <Layout />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
