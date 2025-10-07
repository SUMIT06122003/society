import React from "react";

const amenitiesRates = [
  { name: "Clubhouse", rate: 4000, unit: "per hour" },
  { name: "Swimming Pool", rate: 1000, unit: "per month" },
  { name: "Lawn Behind Clubhouse", rate: 1000, unit: "per month" },
  { name: "Play Area", rate: 500, unit: "per month" },
];

export default function BookAmenities() {
  const handleBooking = (name) => alert(`Booked ${name}!`);

  return (
    <div style={{ fontFamily: "Arial", padding: "30px", minHeight: "100vh", backgroundColor: "#f4f6f8" }}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Book Amenities</h1>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
      }}>
        {amenitiesRates.map((a) => (
          <div key={a.name} style={{
            flex: "1 1 250px",
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}>
            <h3 style={{ marginBottom: "10px" }}>{a.name}</h3>
            <p style={{ marginBottom: "20px", color: "#555" }}>Rate: ₹{a.rate} {a.unit}</p>
            <button
              onClick={() => handleBooking(a.name)}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#007bff",
                color: "#fff",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
