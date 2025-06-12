import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Kira from "./pages/Kira";
import Istifa from "./pages/Istifa";
import Dilekce from "./pages/Dilekce";
import Kaza from "./pages/Kaza";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kira" element={<Kira />} />
        <Route path="/istifa" element={<Istifa />} />
        <Route path="/dilekce" element={<Dilekce />} />
        <Route path="/kaza" element={<Kaza />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
