"use client";
import React, { useState } from "react";
import ProductsTitle from "./ProductsTitle";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import { useBreakpoint } from "@/hooks/useBreakpoint";
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

const PAGE_SIZE = 12;

const NewProductsSection: React.FC = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(featuredProducts.length / PAGE_SIZE);

  const productsToShow = featuredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const breakpoint = useBreakpoint();
  const cols =
    breakpoint === "base" || breakpoint === "sm"
      ? 2
      : breakpoint === "md"
      ? 3
      : 4;

  return (
    <section className="w-full mt-10 px-2 sm:px-4">
      <div className="mb-4">
        <ProductsTitle
          title="Món ăn mới nhất"
          description="Cập nhật món ăn hấp dẫn mỗi ngày."
        />
      </div>
      <ProductGrid products={productsToShow} cols={cols} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        maxButtons={5}
      />
    </section>
  );
};

export default NewProductsSection;
