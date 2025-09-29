import React, { useState } from "react";
import ProjectHistory from "./ProjectHistory";
import UserManagement from "./UserManagement";
import CreateProjectTask from "./CreateProjectTask"; // New import

export default function AdminDashboard({ token, auth, onLogout }) {
  const [view, setView] = useState("dashboard"); // "dashboard" | "projects" | "users" | "create"

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setView("projects")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Project History
        </button>
        <button
          onClick={() => setView("users")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          User Management
        </button>
        <button
          onClick={() => setView("create")}
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Create Project / Task
        </button>
      </div>

      {/* Render Selected View */}
      <div>
        {view === "projects" && <ProjectHistory token={token} auth={auth} />}
        {view === "users" && <UserManagement token={token} auth={auth} />}
        {view === "create" && <CreateProjectTask token={token} auth={auth} />}
        {view === "dashboard" && (
          <div className="p-4 border rounded shadow">
            <p>Welcome, {auth.user.name}!</p>
            <p>Use the buttons above to manage users, projects, or create new tasks.</p>
          </div>
        )}
      </div>
    </div>
  );
}
