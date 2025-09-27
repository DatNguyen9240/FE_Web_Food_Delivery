"use client";
import React, { useState } from "react";
import ProductGrid from "../../components/ProductGrid";

const food = [
  {
    id: "1",
    label: "POCO C61, 4GB RAM, 6...",
    priceOld: "15000",
    priceNew: "20000",
    percent: "10%",
    distanceKm: 2.1,
    avgDeliveryMin: 15,
    image: "/products/poco-c61.jpg",
    rating: 5,
  },
  {
    id: "2",
    label: 'KSC "KHATUSHYAM COLL...',
    priceOld: "520",
    priceNew: "750",
    percent: "9%",
    distanceKm: 3.2,
    avgDeliveryMin: 18,
    image: "/products/bag-red.jpg",
    rating: 4,
  },
  {
    id: "3",
    label: 'KSC "KHATUSHYAM COLL...',
    priceOld: "490",
    priceNew: "460",
    percent: "10%",
    distanceKm: 1.8,
    avgDeliveryMin: 12,
    image: "/products/bag-black.jpg",
    rating: 5,
  },
  {
    id: "4",
    label: "ZAALIQA Girls Black ...",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 2.5,
    avgDeliveryMin: 16,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "5",
    label: "ZAALIQA Girls Black ...",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 2.7,
    avgDeliveryMin: 17,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "6",
    label: "ZAALIQA Girls Black ...",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 2.9,
    avgDeliveryMin: 18,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "7",
    label: "ZAALIQA Girls Black ...",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 3.0,
    avgDeliveryMin: 19,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "8",
    label: "ZAALIQA Girls Black ...",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 2.2,
    avgDeliveryMin: 15,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "9",
    label: "ZAALIQA Girls Black 9",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 2.3,
    avgDeliveryMin: 15,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "10",
    label: "ZAALIQA Girls Black 10",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 2.4,
    avgDeliveryMin: 16,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "11",
    label: "ZAALIQA Girls Black 11",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 2.5,
    avgDeliveryMin: 17,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "12",
    label: "ZAALIQA Girls Black 12",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 2.6,
    avgDeliveryMin: 18,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "13",
    label: "ZAALIQA Girls Black 13",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 2.7,
    avgDeliveryMin: 19,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "14",
    label: "ZAALIQA Girls Black 14",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 2.8,
    avgDeliveryMin: 20,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "15",
    label: "ZAALIQA Girls Black 15",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 2.9,
    avgDeliveryMin: 21,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "16",
    label: "ZAALIQA Girls Black 16",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 3.0,
    avgDeliveryMin: 22,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "17",
    label: "ZAALIQA Girls Black 17",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 3.1,
    avgDeliveryMin: 23,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "18",
    label: "ZAALIQA Girls Black 18",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 3.2,
    avgDeliveryMin: 24,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
  {
    id: "19",
    label: "ZAALIQA Girls Black 19",
    priceOld: "750",
    priceNew: "620",
    percent: "11%",
    distanceKm: 3.3,
    avgDeliveryMin: 25,
    image: "/products/bag-black2.jpg",
    rating: 5,
  },
];

export default function QuanAnPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(
    null
  );
  const [search, setSearch] = useState("");

  // Thêm state cho filter theo rating và sort
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<"name" | "rating" | "followers">(
    "rating"
  );

  return (
    <div className="container mx-auto p-4 text-black">
      {/* ===== Filter/Search Bar ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span>Khám phá món ngon</span>
          <span className="bg-yellow-300 text-orange-700 px-2 py-1 rounded text-base font-semibold animate-pulse">
            Mới!
          </span>
        </h1>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Tìm món hoặc quán..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full md:w-64"
          />
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="border px-2 py-2 rounded-lg"
          >
            <option value={0}>Tất cả đánh giá</option>
            <option value={3}>Từ 3★</option>
            <option value={4}>Từ 4★</option>
            <option value={4.5}>Từ 4.5★</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "name" | "rating" | "followers")
            }
            className="border px-2 py-2 rounded-lg"
          >
            <option value="rating">Sắp xếp: Đánh giá</option>
            <option value="followers">Sắp xếp: Theo dõi</option>
            <option value="name">Sắp xếp: Tên quán</option>
          </select>
        </div>
      </div>

      <ProductGrid products={food} cols={3} className="text-black" />
    </div>
  );
}
