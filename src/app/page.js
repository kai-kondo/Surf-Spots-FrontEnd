"use client";

import { useEffect, useState } from "react";

const HomePage = () => {
  const [spots, setSpots] = useState([]);
  const [error, setError] = useState("");

  const fetchSurfSpots = async () => {
    try {
      const response = await fetch(
        "https://nis3h0d6f8.execute-api.ap-northeast-1.amazonaws.com/prod/surfspots?location=Shizuoka"
      );

      if (!response.ok) {
        throw new Error(`API response error. Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched surf spots:", data);
      setSpots(data.spots || []);
    } catch (err) {
      console.error("Failed to fetch surf spots:", err.message);
      setError("Failed to fetch surf spots.");
    }
  };

  useEffect(() => {
    fetchSurfSpots();
  }, []);

  return (
    <div>
      <h1>Surf Spots</h1>
      {error && <p>Error: {error}</p>}
      {spots.length > 0 ? (
        spots.map((spot, idx) => <p key={idx}>{spot.name}</p>)
      ) : (
        <p>No surf spots found.</p>
      )}
    </div>
  );
};

export default HomePage;
