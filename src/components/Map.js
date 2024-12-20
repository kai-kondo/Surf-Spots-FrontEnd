"use client"; // クライアントコンポーネントとして指定

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ spots }) => {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl bg-white">
      <MapContainer
        center={[35.0, 135.0]} // 地図の初期中心座標
        zoom={10} // 初期ズームレベル
        style={{ height: "500px", width: "100%" }} // 地図のスタイル設定
      >
        {/* タイルレイヤー */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 各スポットのマーカー */}
        {spots.length > 0 ? (
          spots.map((spot, index) => {
            const { lat, lon, spot_name, description } = spot; // ここで座標と名前を取得

            // 座標が正しい場合のみマーカーを表示
            if (lat && lon) {
              return (
                <Marker key={index} position={[lat, lon]}>
                  <Popup className="bg-white text-black rounded-lg shadow-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-600">
                      {spot_name}
                    </h3>
                    <p className="text-sm text-gray-700">{description}</p>
                  </Popup>
                </Marker>
              );
            }
            return null; // 座標がない場合は何も表示しない
          })
        ) : (
          <div className="text-center text-lg text-gray-500">
            Loading spots...
          </div>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
