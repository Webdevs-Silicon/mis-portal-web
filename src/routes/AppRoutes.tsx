import { Routes, Route } from "react-router-dom";
import Login from "../../src/screens/login/Login";
import Otp from "../../src/screens/otp/OtpScreen";
import Dashboard from "../../src/screens/dashboard/Dashboard";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
