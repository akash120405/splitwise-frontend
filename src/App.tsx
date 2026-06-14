import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ImportCsv from "./pages/ImportCsv";
import Balances from "./pages/Balances";
import Settlements from "./pages/Settlements";
import Expenses from "./pages/Expenses";
import Groups from "./pages/Groups";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/import" element={<ImportCsv />} />
        <Route path="/balances" element={<Balances />} />
        <Route path="/settlements" element={<Settlements />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;