"use client";
import React, { useState } from "react";
import ProductGrid from "../../components/ProductGrid";
import { MenuItem } from "@/redux/slice/MenuItem/menuItemSlice";
const featuredProducts: MenuItem[] = [
  {
    menuItemId: "m1",
    merchantId: "merchant-1",
    categoryId: "cat-1",
    name: "Avocado Toast",
    imgUrl: "/foods/avocado-toast.jpg",
    description: "Tasty avocado on toast",
    price: 99000,
    prepTimeMinutes: 20,
    supportsScheduling: false,
    availableFrom: null,
    availableTo: null,
    isAvailable: true,
    isSpecial: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    options: [],
  },
  {
    menuItemId: "m2",
    merchantId: "merchant-2",
    categoryId: "cat-1",
    name: "Buddha Bowl",
    imgUrl: "/foods/buddha-bowl.jpg",
    description: "Healthy Buddha bowl",
    price: 130000,
    prepTimeMinutes: 25,
    supportsScheduling: false,
    availableFrom: null,
    availableTo: null,
    isAvailable: true,
    isSpecial: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    options: [],
  },
  {
    menuItemId: "m3",
    merchantId: "merchant-3",
    categoryId: "cat-2",
    name: "Kebab",
    imgUrl: "/foods/kebab.jpg",
    description: "Grilled kebab",
    price: 75000,
    prepTimeMinutes: 18,
    supportsScheduling: false,
    availableFrom: null,
    availableTo: null,
    isAvailable: true,
    isSpecial: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    options: [],
  },
  {
    menuItemId: "m4",
    merchantId: "merchant-4",
    categoryId: "cat-3",
    name: "Pizza",
    imgUrl: "/foods/pizza.jpg",
    description: "Classic pizza",
    price: 170000,
    prepTimeMinutes: 30,
    supportsScheduling: false,
    availableFrom: null,
    availableTo: null,
    isAvailable: true,
    isSpecial: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    options: [],
  },
  {
    menuItemId: "m5",
    merchantId: "merchant-5",
    categoryId: "cat-4",
    name: "Salad",
    imgUrl: "/foods/salad.jpg",
    description: "Fresh salad",
    price: 70000,
    prepTimeMinutes: 12,
    supportsScheduling: false,
    availableFrom: null,
    availableTo: null,
    isAvailable: true,
    isSpecial: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    options: [],
  },
  {
    menuItemId: "m6",
    merchantId: "merchant-6",
    categoryId: "cat-4",
    name: "Smoothie Bowl",
    imgUrl: "/foods/smoothie-bowl.jpg",
    description: "Yummy smoothie bowl",
    price: 95000,
    prepTimeMinutes: 15,
    supportsScheduling: false,
    availableFrom: null,
    availableTo: null,
    isAvailable: true,
    isSpecial: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    options: [],
  },
];

export default function QuanAnPage() {

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

      <ProductGrid products={featuredProducts} cols={3} className="text-black" />
    </div>
  );
}
