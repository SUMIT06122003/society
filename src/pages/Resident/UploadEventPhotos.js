import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { db, storage } from "../../firebase";
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UploadEventPhotos() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState([]);

  // Fetch existing uploaded photos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const q = query(
          collection(db, "eventPhotos"),
          where("userId", "==", user.uid),
          orderBy("timestamp", "desc")
        );
        const snap = await getDocs(q);
        setPhotos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchPhotos();
  }, [user.uid]);

  const handleUpload = async () => {
    if (!selectedFile) return setMessage("Select a file first!");

    try {
      const storageRef = ref(storage, `events/${user.uid}/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "eventPhotos"), {
        userId: user.uid,
        url,
        timestamp: new Date(),
      });

      setMessage("Photo uploaded successfully!");
      setSelectedFile(null);
      setPhotos([{ url, id: Date.now() }, ...photos]); // Update UI immediately
    } catch (err) {
      setMessage("Upload failed: " + err.message);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "30px", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Upload Event Photos</h1>

      {/* Upload Section */}
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "30px",
        display: "flex",
        gap: "10px",
        alignItems: "center",
        flexWrap: "wrap",
      }}>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          style={{ padding: "5px" }}
        />
        <button
          onClick={handleUpload}
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#28a745",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Upload
        </button>
        {message && <p style={{ marginTop: "10px", color: "#28a745", fontWeight: "bold" }}>{message}</p>}
      </div>

      {/* Uploaded Photos Grid */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}>
        {photos.length === 0 ? (
          <p style={{ color: "#888" }}>No photos uploaded yet.</p>
        ) : (
          photos.map((p) => (
            <div key={p.id} style={{
              width: "200px",
              height: "200px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <img src={p.url} alt="Event" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
