import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BudgetsProvider } from "./contexts/BudgetsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </React.StrictMode>
);
