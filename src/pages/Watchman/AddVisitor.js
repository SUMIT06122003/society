// src/pages/Watchman/AddVisitor.js
import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddVisitor() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [purpose, setPurpose] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name || !mobile || !purpose || !photo) return setMessage("Please fill all fields and select a photo.");
    try {
      // Upload photo
      const photoRef = ref(storage, `visitorPhotos/${photo.name}-${Date.now()}`);
      await uploadBytes(photoRef, photo);
      const photoURL = await getDownloadURL(photoRef);

      // Save visitor info
      await addDoc(collection(db, "visitors"), {
        name,
        mobile,
        purpose,
        photoURL,
        timestamp: serverTimestamp()
      });

      setMessage("Visitor added successfully!");
      setName(""); setMobile(""); setPurpose(""); setPhoto(null);
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Add Visitor</h1>
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", maxWidth: "500px" }}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)}
               style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" placeholder="Mobile" value={mobile} onChange={e => setMobile(e.target.value)}
               style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="text" placeholder="Purpose" value={purpose} onChange={e => setPurpose(e.target.value)}
               style={{ width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #ccc" }} />
        <input type="file" onChange={e => setPhoto(e.target.files[0])} style={{ marginBottom: "10px" }} />
        <button onClick={handleSubmit} style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Add Visitor
        </button>
        {message && <p style={{ marginTop: "10px", color: "#28a745" }}>{message}</p>}
      </div>
    </div>
  );
}
