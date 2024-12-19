"use client";

import { useEffect, useState } from "react";

const HomePage = () => {
  const [spots, setSpots] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // ローディング状態を追加

  const fetchSurfSpots = async () => {
    try {
      setLoading(true);
      const url =
        "https://nis3h0d6f8.execute-api.ap-northeast-1.amazonaws.com/prod/surfspots?surf_location=Shizuoka";
      console.log("Fetching data from:", url);

      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API response error. Status: ${response.status}, Message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Fetched surf spots data:", data);

      if (!data.spots || data.spots.length === 0) {
        setError("No surf spots found.");
      } else {
        setSpots(data.spots);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(`Failed to fetch surf spots: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurfSpots();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Surf Spots</h1>
      {loading && <p>Loading surf spots...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {spots.length > 0 && !loading ? (
        <div>
          {spots.map((spot, idx) => (
            <div
              key={idx}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                margin: "10px 0",
                borderRadius: "5px",
              }}
            >
              <h2>{spot.spot_name}</h2>
              {spot.media_url && (
                <img
                  src={spot.media_url}
                  alt={spot.spot_name}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
              <p>
                <strong>Location:</strong> {spot.surf_location}
              </p>
              <p>
                <strong>Description:</strong> {spot.description}
              </p>
              <p>
                <strong>Tags:</strong> {spot.tags.join(", ")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && <p>No surf spots found.</p>
      )}
    </div>
  );
};

export default HomePage;
