import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AlertsDashboard } from "./monitoring/AlertsDashboard";
import { EquipmentDetail } from "./monitoring/EquipmentDetail";

export function App() {
  return (
    <BrowserRouter>
      <header>
        <Link to="/">EquipMonitor</Link>
      </header>
      <Routes>
        <Route path="/" element={<AlertsDashboard />} />
        <Route path="/equipment/:equipmentId" element={<EquipmentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
