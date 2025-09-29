import React, { useState } from 'react';
import { login } from '../services/api';

export default function Login({ setAuth }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Email and password are required');
      return;
    }
    try {
      const data = await login(form);
      console.log('Logged in:', data);
      setAuth(data); // save auth
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.msg || 'Login failed');
    }
  };

  return (
    <form onSubmit={handle} className="space-y-2">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="border p-2 w-full rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        className="border p-2 w-full rounded"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Login
      </button>
    </form>
  );
}
