// src/pages/Auth/Login.js
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setMessage(""); setLoading(true);
    try {
      await login(email, password);
      navigate("/resident/dashboard");
    } catch (err) { setError(err.message); }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) { setError("Enter email for reset"); return; }
    try { await resetPassword(email); setMessage("Reset email sent"); setError(""); } 
    catch(err) { setError(err.message); }
  };

  return (
    <div style={{display:'flex', height:'100vh', justifyContent:'center', alignItems:'center', backgroundColor:'#f2f2f2'}}>
      <form onSubmit={handleSubmit} style={{backgroundColor:'#fff', padding:'30px', borderRadius:'10px', boxShadow:'0 0 10px rgba(0,0,0,0.1)', width:'320px', textAlign:'center'}}>
        <h2>Login</h2>
        {error && <p style={{color:'red'}}>{error}</p>}
        {message && <p style={{color:'green'}}>{message}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required
          style={{width:'100%', padding:'10px', margin:'10px 0', borderRadius:'5px', border:'1px solid #ccc'}} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required
          style={{width:'100%', padding:'10px', margin:'10px 0', borderRadius:'5px', border:'1px solid #ccc'}} />
        <button type="submit" disabled={loading}
          style={{width:'100%', padding:'10px', backgroundColor:'#007bff', color:'#fff', border:'none', borderRadius:'5px', cursor:'pointer', marginBottom:'10px'}}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <div style={{display:'flex', justifyContent:'space-between', fontSize:'14px'}}>
          <span style={{cursor:'pointer', color:'#007bff'}} onClick={handleForgotPassword}>Forgot Password?</span>
          <Link to="/register" style={{color:'#007bff', textDecoration:'none'}}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
}
