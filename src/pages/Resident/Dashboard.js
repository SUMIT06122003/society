import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ResidentDashboard() {
  const navigate = useNavigate();
  const { userData, logout } = useAuth();

  const cards = [
    { name: "Pay Maintenance", color: "#ff7675", route: "/resident/pay-maintenance" },
    { name: "Book Clubhouse", color: "#74b9ff", route: "/resident/book-amenities" },
    { name: "Swimming Pool", color: "#55efc4", route: "/resident/book-amenities" },
    { name: "Lawn Behind Clubhouse", color: "#fdcb6e", route: "/resident/book-amenities" },
    { name: "Play Area", color: "#a29bfe", route: "/resident/book-amenities" },
    { name: "Upload Event Photos", color: "#00b894", route: "/resident/upload-event-photos" },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "30px", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      
      {/* Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#333" }}>Resident Dashboard</h1>
        <button
          onClick={logout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </header>

      {/* Welcome */}
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        marginBottom: "30px",
      }}>
        <h2 style={{ margin: 0, color: "#555" }}>Welcome, {userData?.email}</h2>
        <p style={{ color: "#888", marginTop: "5px" }}>Role: {userData?.role}</p>
      </div>

      {/* Flexbox Cards */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}>
        {cards.map((card) => (
          <div
            key={card.name}
            onClick={() => navigate(card.route)}
            style={{
              flex: "1 1 250px",
              minHeight: "120px",
              backgroundColor: card.color,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "bold",
              borderRadius: "12px",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.2s",
              textAlign: "center",
              padding: "10px"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            {card.name}
          </div>
        ))}
      </div>
    </div>
  );
}
