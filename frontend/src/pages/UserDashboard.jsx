import React, { useState, useEffect } from 'react';
import { getMyTasks, updateTask } from '../services/api';

export default function UserDashboard({ token, user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [info, setInfo] = useState('');

  const loadTasks = async () => {
    try {
      const data = await getMyTasks(token);
      setTasks(data);
    } catch (err) {
      setInfo(err.msg || 'Error loading tasks');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateTask(token, id, { status });
      setTasks(tasks.map(t => t._id === id ? updated : t));
    } catch (err) {
      setInfo(err.msg || 'Status update failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* 🔥 Welcome Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-600">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-600">Here are your assigned tasks:</p>
      </div>

      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Tasks</h2>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {info && <p className="text-red-500">{info}</p>}

      {/* Task List */}
      <ul>
        {tasks.map(t => (
          <li
            key={t._id}
            className="border p-2 mb-2 rounded flex justify-between items-center shadow-sm hover:shadow-md"
          >
            <div className="font-medium">{t.title} - <span className="italic">{t.status}</span></div>
            <select
              value={t.status}
              onChange={e => handleStatusChange(t._id, e.target.value)}
              className="border p-1 rounded"
            >
              <option value="To-do">To-do</option>
              <option value="In-progress">In-progress</option>
              <option value="Done">Done</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
}
