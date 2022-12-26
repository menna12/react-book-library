import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Search from "./components/Search";
import "./index.css";
import reportWebVitals from "./reportWebVitals";


const RoutesConfig = () => (
  <Routes>
    <Route exact path="/" element={<App />}>
    </Route>
    <Route path="/search" element={<Search />}>
    </Route>
  </Routes>
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <RoutesConfig />
  </Router>
);

reportWebVitals();