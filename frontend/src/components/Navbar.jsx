import React from 'react';

export default function Navbar({ auth, onLogout }) {
  return (
    <nav className="bg-slate-800 text-white p-4">
      <div className="container flex justify-between items-center">
        <h1 className="text-lg font-bold">MERN RoleApp</h1>
        <div>
          {auth ? (
            <>
              <span className="mr-4">Hello, {auth.user.name} ({auth.user.role})</span>
              <button className="bg-red-500 px-3 py-1 rounded" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <span>Register or Login below</span>
          )}
        </div>
      </div>
    </nav>
  );
}
