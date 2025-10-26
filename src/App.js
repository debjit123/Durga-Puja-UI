import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import {useState } from "react";
import AuthPage from "./components/AuthPage";

import HomeComponent from "./components/HomeComponent";

function App() {

  const [token, setToken] = useState(() => localStorage.getItem("authToken"));

  return (
    <Router>
           <Routes>
        <Route path="/auth" element={<AuthPage setToken={setToken} />} /> {/* Use AuthPage */}
        {/* protect home: redirect to /auth if no token */}
        {console.log("Current Token in App.js:", token)}
       <Route
         path="/"
         element={token ? <HomeComponent setToken={setToken} /> : <Navigate to="/auth" replace />}
       />
      </Routes>
    </Router>
  );
}
export default App;
