import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL; // https://backend-7rl6.onrender.com/api

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const { data } = await axios.post(`${API}/auth/login`, { username, password });
      localStorage.setItem("adminToken", data.token);
      onLogin?.({ name: data.user.name, isAdmin: data.user.isAdmin, token: data.token });
      setMsg("Admin login success ✅");
    } catch (err) {
      setMsg(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-3">Admin Login</h2>
      <input className="border p-2 w-full mb-2" placeholder="Admin username"
        value={username} onChange={(e)=>setUsername(e.target.value)} />
      <input className="border p-2 w-full mb-3" type="password" placeholder="Password"
        value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-3 py-2 rounded w-full">Login</button>
      {msg && <p className="mt-2 text-sm">{msg}</p>}
    </form>
  );
}
