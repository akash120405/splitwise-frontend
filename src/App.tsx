import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ImportCsv from "./pages/ImportCsv";
import Balances from "./pages/Balances";
import Settlements from "./pages/Settlements";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/import" element={<ImportCsv />} />
        <Route path="/balances" element={<Balances />} />
        <Route path="/settlements" element={<Settlements />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;