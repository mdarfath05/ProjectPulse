import React, { useState, useEffect } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AuthPage from "./pages/AuthPage";

function App() {
  const [auth, setAuth] = useState(() =>
    JSON.parse(localStorage.getItem("auth") || "null")
  );

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const handleLogout = () => setAuth(null);

  return (
    <div>
      {!auth && <AuthPage setAuth={setAuth} />}
      {auth && auth.user.role === "admin" && (
        <AdminDashboard token={auth.token} auth={auth} onLogout={handleLogout} />
      )}
     {auth && auth.user.role === "user" && (
  <UserDashboard token={auth.token} user={auth.user} onLogout={handleLogout} />
)}

    </div>
  );
}

export default App;
