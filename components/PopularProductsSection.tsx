"use client";
import React from "react";
import AdBanner from "./AdBanner";
import ProductTabs from "./ProductTabs";
import ProductsTitle from "./ProductsTitle";
import NewProductsSection from "./NewProductsSection";
import Carousel from "./Carousel";
import ProductList from "./ProductCarousel";

const products = [
  {
    id: "1",
    label: "Men Alias-N Regular ... 1",
    priceOld: "420000",
    priceNew: "298000",
    percent: "10%",
    distanceKm: 2.5,
    avgDeliveryMin: 18,
    image: "/sell_off/01.jpg",
    imageHover: "/sell_off/02.jpg",
    rating: 4,
  },
  {
    id: "2",
    label: "A-Line Kurti With Sh... 2",
    priceOld: "145000",
    priceNew: "130000",
    percent: "8%",
    distanceKm: 3.1,
    avgDeliveryMin: 22,
    image: "/sell_off/02.jpg",
    rating: 5,
  },
  {
    id: "3",
    label: "Chikankari Woven Kur... 3",
    priceOld: "1350",
    priceNew: "1200",
    percent: "10%",
    distanceKm: 1.8,
    avgDeliveryMin: 15,
    image: "/products/03.jpg",
    rating: 5,
  },
  {
    id: "4",
    label: "Men Layerr Regular F... 4",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 2.2,
    avgDeliveryMin: 17,
    image: "/products/04.jpg",
    rating: 5,
  },
  {
    id: "5",
    label: "Men Layerr Regular F... 5",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 2.7,
    avgDeliveryMin: 19,
    image: "/products/04.jpg",
    rating: 5,
  },
  {
    id: "6",
    label: "Men Layerr Regular F... 6",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 3.5,
    avgDeliveryMin: 25,
    image: "/products/04.jpg",
    rating: 5,
  },
  {
    id: "7",
    label: "Men Layerr Regular F... 7",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 2.9,
    avgDeliveryMin: 20,
    image: "/products/04.jpg",
    rating: 5,
  },
  {
    id: "8",
    label: "Men Layerr Regular F... 8",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 2.1,
    avgDeliveryMin: 16,
    image: "/products/04.jpg",
    rating: 5,
  },
  {
    id: "9",
    label: "Men Layerr Regular F... 9",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 3.0,
    avgDeliveryMin: 21,
    image: "/products/04.jpg",
    rating: 5,
  },
  {
    id: "10",
    label: "Men Layerr Regular F... 10",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 2.6,
    avgDeliveryMin: 18,
    image: "/products/04.jpg",
    rating: 5,
  },
  {
    id: "11",
    label: "Men Layerr Regular F... 11",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 2.3,
    avgDeliveryMin: 17,
    image: "/products/04.jpg",
    rating: 5,
  },
  {
    id: "12",
    label: "Men Layerr Regular F... 12",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 2.8,
    avgDeliveryMin: 19,
    image: "/products/04.jpg",
    rating: 5,
  },
  {
    id: "14",
    label: "Men Layerr Regular F... 14",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 3.2,
    avgDeliveryMin: 23,
    image: "/products/04.jpg",
    rating: 5,
  },
  {
    id: "15",
    label: "Men Layerr Regular F... 15",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 2.4,
    avgDeliveryMin: 18,
    image: "/products/04.jpg",
    rating: 5,
  },
  {
    id: "16",
    label: "16Men Layerr Regular F... 16",
    priceOld: "1200",
    priceNew: "950",
    percent: "12%",
    distanceKm: 2.0,
    avgDeliveryMin: 15,
    image: "/products/04.jpg",
    rating: 5,
  },
];

const PopularProductsSection: React.FC = () => {
  return (
    <section className="w-full xl:mx-[100px] lg:mx-0 mt-10 flex relative">
      <div className="hidden xl:block flex-shrink-0" style={{ width: 260 }}>
        <div className="sticky top-2">
          <AdBanner />
        </div>
      </div>
      <div className="w-[980px] overflow-hidden sm:ml-4 sm:pl-4">
        <div className="flex items-center justify-between mb-2">
          <div className="hidden xl:block">
            {(() => {
              const monthNames = [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
              ];
              const now = new Date();
              const month = monthNames[now.getMonth()];
              return (
                <ProductsTitle
                  title="Món ăn phổ biến"
                  description={`Khám phá những món ăn được yêu thích nhất tháng ${month} này`}
                />
              );
            })()}
          </div>
          <div className="flex-shrink-0">
            <ProductTabs />
          </div>
        </div>
        <ProductList products={products} />
        <NewProductsSection />
        <Carousel size="md" />
      </div>
    </section>
  );
};

export default PopularProductsSection;
