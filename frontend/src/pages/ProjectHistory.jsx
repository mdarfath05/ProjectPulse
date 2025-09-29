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
      <h3 className="text-xl font-semibold mb-2">Project History</h3>
      {info && <p className="text-red-500">{info}</p>}

      {projects.map((p) => (
        <div
          key={p._id}
          className="border p-3 mb-3 rounded shadow hover:shadow-md"
        >
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-lg">{p.title}</h4>
            <button
              className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
              onClick={() => handleDeleteProject(p._id)}
            >
              Delete Project
            </button>
          </div>
          <p>{p.description}</p>
          <p className="text-sm">
            Created At: {new Date(p.createdAt).toLocaleString()}
          </p>

          {/* ✅ Show Tasks with Status */}
          {p.tasks && p.tasks.length > 0 ? (
            <div className="mt-3">
              <h5 className="font-semibold">Tasks:</h5>
              <ul className="list-disc ml-6">
                {p.tasks.map((t) => (
                  <li key={t._id}>
                    {t.title} -{" "}
                    <span
                      className={`${
                        t.status === "Done"
                          ? "text-green-600"
                          : t.status === "In-progress"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {t.status}
                    </span>
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
