import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Home from "./pages/Home";
import Menu from "./pages/Master/Menu";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
}
