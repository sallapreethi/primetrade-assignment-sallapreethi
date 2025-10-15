import { Link, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="p-4 flex gap-4 border-b">
        <Link to="/" className="font-bold">PrimeTrade</Link>
        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="ml-auto border px-3 py-1 rounded">Logout</button>
          </>
        )}
        {!user && <Link className="ml-auto" to="/login">Login</Link>}
      </nav>

      <div className="p-6 max-w-3xl mx-auto">
        <Routes>
          <Route path="/" element={<div>Welcome</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}