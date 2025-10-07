// src/pages/Admin/MaintenanceStatus.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function MaintenanceStatus() {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchMaintenance = async () => {
      const q = query(collection(db, "users"), where("role", "==", "resident"));
      const snap = await getDocs(q);
      setResidents(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchMaintenance();
  }, []);

  return (
    <div style={{ padding: "30px", fontFamily: "Arial", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <h1 style={{ marginBottom: "20px", color: "#333" }}>Maintenance Status</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {residents.length === 0 ? <p>No residents found</p> :
          residents.map(r => (
            <div key={r.id} style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ margin: 0 }}>{r.email}</p>
              <p style={{ margin: 0 }}>{r.maintenancePaid ? "Paid" : "Pending"}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
