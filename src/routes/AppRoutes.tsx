// import { Routes, Route } from "react-router-dom";
// import Login from "../../src/screens/login/Login";
// import Otp from "../../src/screens/otp/OtpScreen";
// import Dashboard from "../../src/screens/dashboard/Dashboard";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/otp" element={<Otp />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//     </Routes>
//   );
// }
// import { Routes, Route, Navigate } from "react-router-dom";
// import Login from "../../src/screens/login/Login";
// import Otp from "../../src/screens/otp/OtpScreen";
// import Dashboard from "../../src/screens/dashboard/Dashboard";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/:mobileNumber?" element={<Login />} />
//       <Route path="/otp/:mobileNumber?" element={<Otp />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       {/* Redirect to login if no mobile number */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../screens/login/Login";
import Otp from "../screens/otp/OtpScreen";
import Dashboard from "../screens/dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* PUBLIC (only if NOT logged in) */}
      <Route
       path="/:mobileNumber"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
       path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/otp/:mobileNumber"
        element={
          <PublicRoute>
            <Otp />
          </PublicRoute>
        }
      />

      {/* PROTECTED (login required) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
       {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}
