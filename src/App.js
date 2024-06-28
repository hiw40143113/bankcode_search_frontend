import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/:bank_code/:branch_code/:bank_name/:branch_name" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
