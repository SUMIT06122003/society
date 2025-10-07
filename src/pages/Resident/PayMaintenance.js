import React, { useState } from "react";

export default function PayMaintenance() {
  const [status, setStatus] = useState("unpaid"); // unpaid or paid

  return (
    <div style={{ fontFamily: "Arial", padding: "30px", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Pay Maintenance</h1>

      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}>
        <p>Scan this QR to pay:</p>
        <img src="https://via.placeholder.com/150" alt="QR Code" style={{ margin: "20px 0" }} />

        <p>Status: <strong style={{ color: status === "paid" ? "#28a745" : "#e74c3c" }}>{status.toUpperCase()}</strong></p>

        {status === "unpaid" && (
          <button
            onClick={() => setStatus("paid")}
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
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}
