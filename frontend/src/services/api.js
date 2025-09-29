const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_BASE}${url}`, options);
    if (!res.ok) throw await res.json();
    return await res.json();
  } catch (err) {
    console.error('API Error:', err);
    throw err;
  }
};

// Auth
export const register = (data) =>
  request('/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

export const login= (data) =>
  request('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

// Users
export const getAllUsers = (token) =>
  request('/users', { headers: { Authorization: 'Bearer ' + token } });

export const deleteUser = (id, token) =>
  request(`/users/${id}`, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } });

// Projects
export const getProjects = (token) =>
  request('/projects', { headers: { Authorization: 'Bearer ' + token } });

export const createProject = (token, data) =>
  request('/projects', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(data) });

// Tasks
export const createTask = (token, data) =>
  request('/projects/tasks', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(data) });

export const getMyTasks = (token) =>
  request('/projects/tasks/me', { headers: { Authorization: 'Bearer ' + token } });

export const updateTask = (token, id, data) =>
  request(`/projects/tasks/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }, body: JSON.stringify(data) });

export const deleteProject = (token, id) =>
  request(`/projects/${id}`, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } });


export const deleteTask = (token, id) =>
  request(`/projects/tasks/${id}`, { method: 'DELETE', headers: { Authorization: 'Bearer ' + token } });
