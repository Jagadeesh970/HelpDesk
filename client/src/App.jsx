import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import CreateTicket from "./pages/CreateTicket/CreateTicket";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AgentDashboard from "./pages/AgentDashboard/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import LoginBar from "./components/Auth/LoginBar";
import RegisterBar from "./components/Auth/RegisterBar";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute allowedRoles={["user","agent"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="createticket"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <CreateTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="agent"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Auth pages without NavBar */}
      <Route path="/login" element={<LoginBar />} />
      <Route path="/register" element={<RegisterBar />} />
    </Routes>
  );
};

export default App;
