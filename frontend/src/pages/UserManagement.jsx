import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/api";

export default function UserManagement({ token, auth }) {
  const [users, setUsers] = useState([]);
  const [info, setInfo] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers(token);
      setUsers(data.filter((u) => u._id !== auth.user.id));
    } catch (err) {
      setInfo(err.msg || "Error fetching users");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    try {
      await deleteUser(id, token);
      setUsers(users.filter((u) => u._id !== id));
      setInfo("User deleted successfully");
    } catch (err) {
      setInfo(err.msg || "Delete failed");
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold mb-2">User Management</h3>
      {info && <p className="text-red-500">{info}</p>}
      <ul className="space-y-1">
        {users.map((u) => (
          <li
            key={u._id}
            className="flex justify-between p-2 border rounded"
          >
            <span>{u.name} ({u.role})</span>
            <button
              className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
              onClick={() => handleDeleteUser(u._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
