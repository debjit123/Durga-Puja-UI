import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AuthPage from "./components/AuthPage";
import HomeComponent from "./components/HomeComponent";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage setToken={setToken} />} />

        <Route
          path="/"
          element={token ? <HomeComponent setToken={setToken} /> : <Navigate to="/auth" replace />}
        />

       <Route path="/forgot-password" element={<ForgotPassword />} />
       <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
