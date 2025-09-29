import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function AuthPage({ setAuth }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      
      {/* Stylish Header */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-600 mb-8 text-center drop-shadow-md">
        Welcome to <span className="text-gray-800">ProjectPulse</span>
      </h1>

      {/* Login/Register Card */}
      <div className="w-full max-w-md p-6 border rounded shadow bg-white">
        {showLogin ? (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
            <Login setAuth={setAuth} />
            <p className="mt-4 text-sm text-center">
              New user?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setShowLogin(false)}
              >
                Register here
              </button>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
            <Register setAuth={setAuth} />
            <p className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <button
                className="text-blue-600 hover:underline"
                onClick={() => setShowLogin(true)}
              >
                Login here
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
