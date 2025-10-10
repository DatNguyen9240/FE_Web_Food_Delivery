"use client";
import React from "react";
import ProductCarousel from "./ProductCarousel";
import AdBanner from "./AdBanner";
import type { MenuItem } from "@/redux/slice/MenuItem/menuItemSlice";

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

const FeaturedProductAd: React.FC = () => (
  <div>
    <h2 className="font-semibold mb-4 text-base text-gray-800">
      Món ăn nổi bật
    </h2>
    <div className="px-4 overflow-hidden">
  <ProductCarousel products={featuredProducts} slideStep={1} />
    </div>
    <div className="my-6">
      <AdBanner />
    </div>
  </div>
);

export default FeaturedProductAd;
