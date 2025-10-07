// src/pages/Admin/Notifications.js
import React, { useState } from "react";
import { db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function Notifications() {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (!message) return alert("Type a message first!");
    try {
      await addDoc(collection(db, "notifications"), { message, timestamp: serverTimestamp() });
      setMessage("");
      alert("Notification sent!");
    } catch (err) {
      alert("Failed to send: " + err.message);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Send Notifications</h1>
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", maxWidth: "500px" }}>
        <textarea placeholder="Type your message" value={message} onChange={e => setMessage(e.target.value)}
                  style={{ width: "100%", height: "100px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginBottom: "10px" }} />
        <button onClick={handleSend} style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Send
        </button>
      </div>
    </div>
  );
}
