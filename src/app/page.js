"use client"; // クライアントサイド専用としてマーク

import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // dynamicインポート

// クライアントサイドで地図表示
const MapComponent = dynamic(() => import("../components/Map"), {
  ssr: false, // SSRを無効にして、クライアントサイドでのみ表示
});

const SurfSpotSearch = () => {
  const [spots, setSpots] = useState([]);

  // API Gatewayからデータを取得する
  useEffect(() => {
    const fetchSurfSpots = async () => {
      console.log("Fetching data from API..."); // fetch前にログ表示

      try {
        // API GatewayのURLに変更
        const response = await fetch(
          `https://nis3h0d6f8.execute-api.ap-northeast-1.amazonaws.com/prod/surfspots?surf_location=Shizuoka`
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
  }, []); // 初回レンダリング時にAPIデータを取得

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-semibold text-white mb-8">Surfing Spots</h1>
      {/* MapComponentにAPIから取得したスポットデータを渡す */}
      <MapComponent spots={spots} />
    </div>
  );
};

export default SurfSpotSearch;
