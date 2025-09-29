import React, { useState, useEffect } from "react";
import { createProject, createTask, getAllUsers, getProjects } from "../services/api";

export default function CreateProjectTask({ token, auth }) {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [info, setInfo] = useState("");

  const [newProject, setNewProject] = useState({ title: "", description: "", team: [] });
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "", project: "", dueDate: "" });

  useEffect(() => {
    loadUsers();
    loadProjects();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers(token);
      setUsers(data.filter(u => u._id !== auth.user.id));
    } catch (err) {
      setInfo(err.msg || "Error fetching users");
    }
  };

  const loadProjects = async () => {
    try {
      const data = await getProjects(token);
      setProjects(data);
    } catch (err) {
      setInfo(err.msg || "Error fetching projects");
    }
  };

  const handleProjectCreate = async (e) => {
    e.preventDefault();
    if (!newProject.title) return setInfo("Project title required");
    try {
      await createProject(token, newProject);
      setNewProject({ title: "", description: "", team: [] });
      setInfo("Project created successfully");
      loadProjects(); // reload projects
    } catch (err) {
      setInfo(err.msg || "Project creation failed");
    }
  };

  const handleTaskCreate = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.project) return setInfo("Task title and project required");
    try {
      await createTask(token, newTask);
      setNewTask({ title: "", description: "", assignedTo: "", project: "", dueDate: "" });
      setInfo("Task created successfully");
    } catch (err) {
      setInfo(err.msg || "Task creation failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-2">Create Project / Task</h2>
      {info && <p className="text-red-500">{info}</p>}

      {/* Create Project */}
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Create Project</h3>
        <form onSubmit={handleProjectCreate} className="space-y-2">
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={e => setNewProject({ ...newProject, title: e.target.value })}
            className="border p-2 w-full"
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={e => setNewProject({ ...newProject, description: e.target.value })}
            className="border p-2 w-full"
          />
          <select
            multiple
            value={newProject.team}
            onChange={e => setNewProject({ ...newProject, team: Array.from(e.target.selectedOptions, option => option.value) })}
            className="border p-2 w-full"
          >
            {users.map(u => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Project</button>
        </form>
      </div>

      {/* Create Task */}
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Create Task</h3>
        <form onSubmit={handleTaskCreate} className="space-y-2">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={e => setNewTask({ ...newTask, title: e.target.value })}
            className="border p-2 w-full"
          />
          <textarea
            placeholder="Task Description"
            value={newTask.description}
            onChange={e => setNewTask({ ...newTask, description: e.target.value })}
            className="border p-2 w-full"
          />
          <select
            value={newTask.project}
            onChange={e => setNewTask({ ...newTask, project: e.target.value })}
            className="border p-2 w-full"
          >
            <option value="">Select Project</option>
            {projects.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
          </select>
          <select
            value={newTask.assignedTo}
            onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })}
            className="border p-2 w-full"
          >
            <option value="">Assign to User</option>
            {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
          </select>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })}
            className="border p-2 w-full"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Create Task</button>
        </form>
      </div>
    </div>
  );
}
