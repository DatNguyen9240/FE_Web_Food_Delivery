"use client";
import React from "react";
import SectionTitle from "./SectionTitle";
import ProductCarousel from "./ProductCarousel";
import Carousel from "./Carousel";
import ProductsTitle from "./ProductsTitle";
import { useBreakpoint } from "../hooks/useBreakpoint";
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

const FeaturedProductsSection: React.FC = () => {
  const breakpoint = useBreakpoint();
  const carouselSize = breakpoint === "base" ? "sm" : "md";

  return (
    <section className="max-w-[1300px] w-full mx-auto mt-12 overflow-hidden">
      <div className="w-full flex justify-start">
        <SectionTitle size="xl">Món ăn nổi bật</SectionTitle>
      </div>
      <div className="px-4">
        <ProductCarousel products={featuredProducts} />
      </div>
      <Carousel
        size={carouselSize}
        showIndicator={["base", "sm", "md"].includes(breakpoint)}
      />
      <div className="mt-10">
        <ProductsTitle
          title="Món ăn đặc sắc"
          description="Không thể bỏ qua những món ăn hot nhất!"
        />
        <div className="px-4 mt-4">
          <ProductCarousel products={featuredProducts} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
