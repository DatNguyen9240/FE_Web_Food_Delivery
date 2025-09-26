"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductGrid from "../../components/ProductGrid";
import { X } from "lucide-react";

// ===== Dummy data =====
const restaurants = [
  {
    id: 1,
    name: "Quán Ăn A",
    image: "/sell_off/01.jpg",
    rating: 4.5,
    address: "123 Đường A",
    isHot: true,
    followers: 1200,
    tags: ["Ăn sáng", "Gia đình"],
    distanceKm: 2,
  },
  {
    id: 2,
    name: "Quán Ăn B",
    image: "/sell_off/02.jpg",
    rating: 4.2,
    address: "456 Đường B",
    isHot: false,
    followers: 800,
    tags: ["Ăn trưa", "Văn phòng"],
    distanceKm: 5,
  },
  {
    id: 3,
    name: "Quán Chay An Lạc",
    image: "/sell_off/03.jpg",
    rating: 4.7,
    address: "789 Đường C",
    isHot: true,
    followers: 950,
    tags: ["Chay", "Gia đình"],
    distanceKm: 3,
  },
  {
    id: 4,
    name: "Bún Đậu Mẹt",
    image: "/sell_off/04.jpg",
    rating: 4.0,
    address: "12 Đường D",
    isHot: false,
    followers: 400,
    tags: ["Ăn vặt", "Sinh viên"],
    distanceKm: 4,
  },
  {
    id: 5,
    name: "Cơm Tấm Sài Gòn",
    image: "/sell_off/05.jpg",
    rating: 4.3,
    address: "34 Đường E",
    isHot: false,
    followers: 600,
    tags: ["Ăn trưa", "Gia đình"],
    distanceKm: 6,
  },
  {
    id: 6,
    name: "Pizza Home",
    image: "/sell_off/06.jpg",
    rating: 4.8,
    address: "56 Đường F",
    isHot: true,
    followers: 1500,
    tags: ["Pizza", "Tây"],
    distanceKm: 1,
  },
  // ...bạn có thể thêm nhiều quán nữa
];

const foods = [
  {
    id: 1,
    name: "Phở Bò",
    image: "/sell_off/01.jpg",
    price: "40.000đ",
    restaurantId: 1,
    salePercent: 10,
  },
  {
    id: 2,
    name: "Bún Chả",
    image: "/sell_off/02.jpg",
    price: "35.000đ",
    restaurantId: 2,
    salePercent: 0,
  },
  {
    id: 3,
    name: "Cơm Tấm Sườn",
    image: "/sell_off/05.jpg",
    price: "45.000đ",
    restaurantId: 5,
    salePercent: 5,
  },
  {
    id: 4,
    name: "Pizza Hải Sản",
    image: "/sell_off/06.jpg",
    price: "120.000đ",
    restaurantId: 6,
    salePercent: 15,
  },
  {
    id: 5,
    name: "Bún Đậu Mắm Tôm",
    image: "/sell_off/04.jpg",
    price: "30.000đ",
    restaurantId: 4,
    salePercent: 0,
  },
  {
    id: 6,
    name: "Gỏi Cuốn Chay",
    image: "/sell_off/03.jpg",
    price: "25.000đ",
    restaurantId: 3,
    salePercent: 0,
  },
  {
    id: 7,
    name: "Pizza Thập Cẩm",
    image: "/sell_off/06.jpg",
    price: "130.000đ",
    restaurantId: 6,
    salePercent: 20,
  },
  {
    id: 8,
    name: "Cơm Chay Thập Cẩm",
    image: "/sell_off/03.jpg",
    price: "35.000đ",
    restaurantId: 3,
    salePercent: 0,
  },
  {
    id: 9,
    name: "Bún Riêu",
    image: "/sell_off/01.jpg",
    price: "38.000đ",
    restaurantId: 1,
    salePercent: 0,
  },
  {
    id: 10,
    name: "Bún Thịt Nướng",
    image: "/sell_off/02.jpg",
    price: "37.000đ",
    restaurantId: 2,
    salePercent: 0,
  },
  // ...bạn có thể thêm nhiều món nữa
];

const vouchers = [
  {
    id: 1,
    restaurantId: 1,
    code: "GIAM10",
    desc: "Giảm 10% cho đơn từ 100k",
    expired: "30/09/2025",
  },
  {
    id: 2,
    restaurantId: 2,
    code: "FREESHIP",
    desc: "Miễn phí giao hàng",
    expired: "15/10/2025",
  },
  {
    id: 3,
    restaurantId: 6,
    code: "PIZZA20",
    desc: "Giảm 20% cho pizza size lớn",
    expired: "31/12/2025",
  },
  {
    id: 4,
    restaurantId: 3,
    code: "CHAY5",
    desc: "Giảm 5% cho món chay",
    expired: "01/11/2025",
  },
  // ...bạn có thể thêm nhiều voucher nữa
];

const points: { [key: number]: number } = {
  1: 120,
  2: 45,
  3: 200,
  4: 30,
  5: 60,
  6: 300,
  // ...bạn có thể thêm nhiều điểm cho các quán khác
};

// ===== Helpers =====
type Food = (typeof foods)[number];
const mapFoodsToProducts = (foods: Food[]) =>
  foods.map((f) => ({
    id: f.id.toString(),
    label: f.name,
    priceOld: f.price,
    priceNew: f.price,
    percent: f.salePercent.toString(),
    distanceKm: Math.floor(Math.random() * 10) + 1, // random 1-10km
    avgDeliveryMin: 30,
    image: f.image,
    rating: 5,
  }));

export default function QuanAnPage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(
    null
  );
  const [likedRestaurants, setLikedRestaurants] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState<number | null>(null);

  // Thêm state cho filter theo rating và sort
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState<"name" | "rating" | "followers">(
    "rating"
  );

  const handleLike = (id: number) =>
    setLikedRestaurants((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );

  // Lọc và sắp xếp quán ăn
  const filteredRestaurants = restaurants
    .filter(
      (r) =>
        r.rating >= minRating &&
        r.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "followers") return b.followers - a.followers;
      return b.rating - a.rating;
    });

  const filteredFoods = foods.filter((f) => {
    const matchRestaurant = selectedRestaurant
      ? f.restaurantId === selectedRestaurant
      : true;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchRestaurant && matchSearch;
  });

  const hotFoods = foods.filter((f) => f.salePercent > 0);

  // Đếm số món ăn của từng quán
  const foodCountByRestaurant = restaurants.reduce((acc, r) => {
    acc[r.id] = foods.filter((f) => f.restaurantId === r.id).length;
    return acc;
  }, {} as Record<number, number>);

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
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border px-2 py-2 rounded-lg"
          >
            <option value="rating">Sắp xếp: Đánh giá</option>
            <option value="followers">Sắp xếp: Theo dõi</option>
            <option value="name">Sắp xếp: Tên quán</option>
          </select>
        </div>
      </div>

      {/* ===== Quán ăn Section ===== */}
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        Các Quán Ăn
        <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs">
          Top Picks
        </span>
      </h2>
      <div className="flex gap-4 overflow-x-auto mb-8 pb-2">
        {filteredRestaurants.map((r) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={r.id}
            className={`border rounded-lg p-4 min-w-[240px] cursor-pointer relative bg-white shadow-sm ${
              selectedRestaurant === r.id ? "border-blue-500" : ""
            }`}
            onClick={() => setOpenModal(r.id)}
          >
            {/* Badge Hot */}
            {r.isHot && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full z-10">
                HOT
              </span>
            )}
            <img
              src={r.image}
              alt={r.name}
              className="w-full h-32 object-cover rounded"
            />
            <div className="flex justify-between items-center mt-2">
              <span className="font-semibold">{r.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(r.id);
                }}
                title={likedRestaurants.includes(r.id) ? "Bỏ thích" : "Thích"}
                className={
                  likedRestaurants.includes(r.id)
                    ? "text-red-500"
                    : "text-gray-400"
                }
              >
                ♥
              </button>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(Math.floor(r.rating))].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
              <span className="text-xs text-gray-500 ml-1">{r.rating}</span>
            </div>
            <p className="text-sm text-gray-500">{r.address}</p>
            <p className="text-xs text-gray-400 mb-1">
              👥 {r.followers} người theo dõi
            </p>
            <p className="text-xs text-gray-400 mb-1">
              🍽 {foodCountByRestaurant[r.id] || 0} món
            </p>
            <p className="text-xs text-gray-400 mb-1">📍 {r.distanceKm} km</p>
            {/* Thêm trạng thái mở cửa */}
            <p className="text-xs mb-1">
              {new Date().getHours() >= 8 && new Date().getHours() < 22 ? (
                <span className="text-green-600 font-semibold">
                  Đang mở cửa
                </span>
              ) : (
                <span className="text-red-600 font-semibold">Đã đóng cửa</span>
              )}
            </p>
            {/* Thêm nút Follow */}
            <button
              className={`mt-2 w-full py-1 rounded ${
                likedRestaurants.includes(r.id)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } transition`}
              onClick={(e) => {
                e.stopPropagation();
                handleLike(r.id);
              }}
            >
              {likedRestaurants.includes(r.id) ? "Đã Follow" : "Follow quán"}
            </button>
            <div className="flex flex-wrap gap-1 mt-1">
              {r.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 text-xs text-gray-600 px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* Hiển thị điểm tích lũy */}
            <p className="text-xs text-purple-600 mb-1 font-semibold">
              🎁 Điểm tích lũy: {points[r.id] || 0}
            </p>
            {/* Hiển thị voucher nếu có */}
            {vouchers.filter((v) => v.restaurantId === r.id).length > 0 && (
              <div className="mb-1">
                {vouchers
                  .filter((v) => v.restaurantId === r.id)
                  .map((v) => (
                    <div
                      key={v.id}
                      className="bg-yellow-100 border border-yellow-400 text-yellow-800 text-xs rounded px-2 py-1 mb-1 flex items-center gap-2"
                    >
                      <span className="font-bold">🎫 {v.code}</span>
                      <span>{v.desc}</span>
                      <span className="ml-auto text-[10px] text-gray-500">
                        HSD: {v.expired}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* ===== Hot Deals Section ===== */}
      {hotFoods.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span>🔥 Món Giảm Giá</span>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">
              Ưu đãi
            </span>
          </h2>
          <ProductGrid
            products={mapFoodsToProducts(hotFoods)}
            cols={4}
            className="text-black"
          />
        </>
      )}

      {/* ===== Danh sách món ăn ===== */}
      <h2 className="text-2xl font-bold mt-8 mb-4">
        {selectedRestaurant
          ? `Món ăn của ${
              restaurants.find((r) => r.id === selectedRestaurant)?.name
            }`
          : "Tất cả món ăn"}
      </h2>
      <ProductGrid
        products={mapFoodsToProducts(filteredFoods)}
        cols={4}
        className="text-black"
      />

      {/* ===== Modal chi tiết quán ===== */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-[90%] md:w-[600px] relative text-black"
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setOpenModal(null)}
            >
              <X />
            </button>
            {(() => {
              const r = restaurants.find((x) => x.id === openModal)!;
              return (
                <>
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    {r.name}
                    {r.isHot && (
                      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        HOT
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 mb-1">
                    ⭐ {r.rating} | {r.address}
                  </p>
                  <p className="text-gray-500 mb-2">
                    👥 {r.followers} người theo dõi
                  </p>
                  <p className="text-gray-500 mb-2">Giờ mở cửa: 8h - 22h</p>
                  <p className="text-gray-500 mb-2">
                    Số món ăn: {foodCountByRestaurant[r.id] || 0}
                  </p>
                  {/* Điểm tích lũy */}
                  <p className="text-purple-600 mb-2 font-semibold">
                    🎁 Điểm tích lũy của bạn tại quán: {points[r.id] || 0}
                  </p>
                  {/* Voucher */}
                  {vouchers.filter((v) => v.restaurantId === r.id).length >
                    0 && (
                    <div className="mb-2">
                      <div className="font-bold mb-1 text-yellow-700">
                        Voucher hiện có:
                      </div>
                      {vouchers
                        .filter((v) => v.restaurantId === r.id)
                        .map((v) => (
                          <div
                            key={v.id}
                            className="bg-yellow-100 border border-yellow-400 text-yellow-800 text-xs rounded px-2 py-1 mb-1 flex items-center gap-2"
                          >
                            <span className="font-bold">🎫 {v.code}</span>
                            <span>{v.desc}</span>
                            <span className="ml-auto text-[10px] text-gray-500">
                              HSD: {v.expired}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}
                  <div className="flex gap-2 mb-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => alert("Đã gửi tin nhắn cho quán!")}
                    >
                      Nhắn tin
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded"
                      onClick={() => alert("Đã đặt bàn trước!")}
                    >
                      Đặt bàn
                    </button>
                  </div>
                  <button
                    className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => {
                      setSelectedRestaurant(r.id);
                      setOpenModal(null);
                    }}
                  >
                    Xem menu
                  </button>
                </>
              );
            })()}
          </motion.div>
        </div>
      )}
    </div>
  );
}
