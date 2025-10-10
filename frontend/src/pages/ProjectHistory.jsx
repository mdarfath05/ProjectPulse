import React, { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../services/api";

export default function ProjectHistory({ token, auth }) {
  const [projects, setProjects] = useState([]);
  const [info, setInfo] = useState("");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects(token);
      setProjects(data);
    } catch (err) {
      setInfo(err.msg || "Error fetching projects");
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(token, id);
      setProjects(projects.filter((p) => p._id !== id));
      setInfo("Project deleted successfully");
    } catch (err) {
      setInfo(err.msg || "Delete project failed");
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Project History</h3>
      {info && <p className="text-red-500">{info}</p>}

      {projects.length === 0 && <p>No projects found.</p>}

      {projects.map((p) => (
        <div
          key={p._id}
          className="border p-4 mb-4 rounded shadow hover:shadow-md"
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-lg">{p.title}</h4>
            <button
              className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
              onClick={() => handleDeleteProject(p._id)}
            >
              Delete Project
            </button>
          </div>

          <p className="mb-1">{p.description}</p>
          <p className="text-sm text-gray-500 mb-2">
            Created At: {new Date(p.createdAt).toLocaleString()}
          </p>

          {/* Tasks */}
          {p.tasks && p.tasks.length > 0 ? (
  <div>
    <h5 className="font-semibold mb-1">Tasks:</h5>
    <ul className="ml-4 space-y-2"> {/* Add space-y-2 for spacing */}
      {p.tasks.map((t) => (
        <li key={t._id} className="flex justify-between items-center p-2 border rounded">
          <div>
            <span
              className={`px-2 py-1 rounded text-white ${
                t.status === "Done"
                  ? "bg-green-500"
                  : t.status === "In-progress"
                  ? "bg-yellow-500"
                  : "bg-gray-400"
              }`}
            >
              {t.status}
            </span>{" "}
            {t.title} -{" "}
            <span className="font-medium">
              {t.assignedTo ? t.assignedTo.name : "Unassigned"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  </div>
) : (
  <p className="text-gray-500 mt-2">No tasks found</p>
)}

        </div>
      ))}
    </div>
  );
}
