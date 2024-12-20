"use client"; // クライアントサイド専用としてマーク

import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // dynamicインポート

// クライアントサイドで地図表示
const MapComponent = dynamic(() => import("../components/Map"), {
  ssr: false, // SSRを無効にして、クライアントサイドでのみ表示
});

const SurfSpotSearch = () => {
  const [spots, setSpots] = useState([]);
  const [location, setLocation] = useState("Shizuoka"); // デフォルトのロケーション

  // API Gatewayからデータを取得する
  useEffect(() => {
    const fetchSurfSpots = async () => {
      console.log("Fetching data from API..."); // fetch前にログ表示

      try {
        // API GatewayのURLに変更（locationを動的に渡す）
        const response = await fetch(
          `https://nis3h0d6f8.execute-api.ap-northeast-1.amazonaws.com/prod/surfspots?surf_location=${location}`
        );
        console.log("Response received:", response); // fetch後にログ表示

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data);

          // APIのデータからスポット情報を整形してセット
          const updatedSpots = data.spots.map((spot) => {
            const coordinates = data.coordinates || {}; // coordinatesはdataに存在するので、dataから取得
            const lat = coordinates.latitude || null; // 緯度がない場合はnullを代入
            const lon = coordinates.longitude || null; // 経度がない場合はnullを代入

            return {
              ...spot,
              lat,
              lon,
            };
          });

          console.log("Updated spots:", updatedSpots);

          // スポット情報をstateにセット
          setSpots(updatedSpots);
        } else {
          console.error(
            "Failed to fetch surf spots:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSurfSpots();
  }, [location]); // locationが変わるたびに再実行

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-500 flex flex-col items-center justify-start py-16 px-8">
      <h1 className="text-5xl font-extrabold text-white mb-6 shadow-md">
        Explore Surfing Spots
      </h1>

      {/* サーフスポット検索ボックス */}
      <div className="flex items-center justify-center w-full mb-8">
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Search for a location"
          className="p-4 rounded-lg w-full md:w-96 bg-white bg-opacity-75 text-lg font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      {/* サーフスポットの地図表示 */}
      <div className="w-full max-w-4xl rounded-lg shadow-lg overflow-hidden bg-white">
        <MapComponent spots={spots} />
      </div>
    </div>
  );
};

export default SurfSpotSearch;
