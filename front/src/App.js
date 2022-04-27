import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import "./index.css";

function App() {
  const routes = useRoutes(false);
  return (
    <Router>
      <div className="cont">{routes}</div>
    </Router>
  );
}

export default App;
