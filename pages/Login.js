import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const { data } = await authApi.login(username, password);
      localStorage.setItem("token", data.token || data.Token);
      navigate("/tasks");
    } catch (e) {
      setErr(e?.response?.data || "Login failed");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-10 col-md-6 col-lg-4">
        <h3 className="mb-3">Login</h3>
        {err && <div className="alert alert-danger">{String(err)}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-100" type="submit">Sign in</button>
        </form>
        <div className="mt-3">
          <span>No account? </span><Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
