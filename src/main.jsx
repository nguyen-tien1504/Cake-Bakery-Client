import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import CartApp from "./context/CartApp.jsx";
import { Provider } from "react-redux";
import { store } from "./services/Redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartApp>
    <Provider store={store}>
      <App />
    </Provider>
  </CartApp>
);
