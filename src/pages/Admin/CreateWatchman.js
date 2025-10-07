// src/pages/Admin/CreateWatchman.js
import React, { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function CreateWatchman() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleCreate = async () => {
    if (!email || !password) return setMessage("Please fill all fields");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      await setDoc(doc(db, "users", userId), {
        email,
        role: "watchman",
        createdAt: new Date()
      });
      setMessage("Watchman created successfully!");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Create Watchman</h1>
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", maxWidth: "400px" }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
               style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
               style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
        <button onClick={handleCreate}
                style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Create Watchman
        </button>
        {message && <p style={{ color: "#28a745", marginTop: "10px" }}>{message}</p>}
      </div>
    </div>
  );
}
