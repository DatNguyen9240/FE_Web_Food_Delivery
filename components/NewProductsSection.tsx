"use client";
import React, { useState } from "react";
import ProductsTitle from "./ProductsTitle";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import { useBreakpoint } from "@/hooks/useBreakpoint";

// Dữ liệu mẫu sản phẩm mới
const newProducts = [
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

const PAGE_SIZE = 12;

const NewProductsSection: React.FC = () => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(newProducts.length / PAGE_SIZE);

  const productsToShow = newProducts.slice(
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
