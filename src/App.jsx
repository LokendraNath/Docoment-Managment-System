import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/admin"
            element={token ? <AdminPanel /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
