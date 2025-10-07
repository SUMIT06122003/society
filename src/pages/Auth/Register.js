// src/pages/Auth/Register.js
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("resident");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    if(password.length<6){setError("Password must be at least 6 chars"); return;}
    setLoading(true);
    try { await signup(email,password,role); navigate("/"); }
    catch(err){setError(err.message);}
    setLoading(false);
  };

  return (
    <div style={{display:'flex', height:'100vh', justifyContent:'center', alignItems:'center', backgroundColor:'#f2f2f2'}}>
      <form onSubmit={handleSubmit} style={{backgroundColor:'#fff', padding:'30px', borderRadius:'10px', boxShadow:'0 0 10px rgba(0,0,0,0.1)', width:'320px', textAlign:'center'}}>
        <h2>Register</h2>
        {error && <p style={{color:'red'}}>{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required
          style={{width:'100%', padding:'10px', margin:'10px 0', borderRadius:'5px', border:'1px solid #ccc'}} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required
          style={{width:'100%', padding:'10px', margin:'10px 0', borderRadius:'5px', border:'1px solid #ccc'}} />
        <select value={role} onChange={(e)=>setRole(e.target.value)}
          style={{width:'100%', padding:'10px', margin:'10px 0', borderRadius:'5px', border:'1px solid #ccc'}}>
          <option value="resident">Resident</option>
          <option value="watchman">Watchman</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading}
          style={{width:'100%', padding:'10px', backgroundColor:'#28a745', color:'#fff', border:'none', borderRadius:'5px', cursor:'pointer'}}>
          {loading ? "Registering..." : "Register"}
        </button>
        <p style={{marginTop:'10px'}}>Already have an account? <Link to="/login" style={{color:'#007bff'}}>Login</Link></p>
      </form>
    </div>
  );
}
