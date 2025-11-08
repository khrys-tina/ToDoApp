import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authApi } from "../services/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setOk("");
    try {
      await authApi.register(username, password);
      setOk("Registered! You can login now.");
      setTimeout(()=>navigate("/login"), 700);
    } catch (e) {
      setErr(e?.response?.data || "Register failed");
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-10 col-md-6 col-lg-4">
        <h3 className="mb-3">Register</h3>
        {err && <div className="alert alert-danger">{String(err)}</div>}
        {ok && <div className="alert alert-success">{ok}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-100" type="submit">Create account</button>
        </form>
        <div className="mt-3">
          <span>Have account? </span><Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
