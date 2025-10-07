// src/pages/Admin/UploadEventFile.js
import React, { useState } from "react";
import { storage, db } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export default function UploadEventFile() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return setMessage("Select a file first!");
    try {
      const storageRef = ref(storage, `eventFiles/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, "eventFiles"), { url, name: file.name, timestamp: new Date() });
      setMessage("File uploaded successfully!");
      setFile(null);
    } catch (err) {
      setMessage("Upload failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Upload Event File</h1>
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", maxWidth: "400px" }}>
        <input type="file" onChange={e => setFile(e.target.files[0])} style={{ marginBottom: "10px" }} />
        <button onClick={handleUpload} style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Upload
        </button>
        {message && <p style={{ marginTop: "10px", color: "#28a745" }}>{message}</p>}
      </div>
    </div>
  );
}
