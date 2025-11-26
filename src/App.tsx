import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Home from "./pages/Home";
import MenuList from "./pages/Menu/MenuList";
import MenuCreate from "./pages/Menu/MenuCreate";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<MenuList />} />
        <Route path="/menu/create" element={<MenuCreate />} />
      </Routes>
    </BrowserRouter>
  );
}
