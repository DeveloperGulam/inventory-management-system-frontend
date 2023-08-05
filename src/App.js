import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/assistant" element={<AssistantDashboard />} /> */}
    </Routes>
  );
}

export default App;
