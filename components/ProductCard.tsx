"use client";
import React from "react";
import { Expand, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import MoneyVND from "./MoneyVND";
import { MenuItem } from "@/redux/slice/MenuItem/menuItemSlice";

export const ProductBadge = ({ percent, isSpecial }: { percent?: string; isSpecial?: boolean }) => (
  <span
    className="
    absolute left-2 top-2 bg-blue-100 text-blue-700
    text-[8px] md:text-[9px] lg:text-[10px] xl:text-xs
    font-bold px-1 py-0.5 rounded-full
    flex items-center justify-center
    w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8
    z-20
  "
  >
    {typeof percent === "string" && percent ? percent : isSpecial ? "HOT" : null}
  </span>
);

const SpecialBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="absolute left-2 top-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-md z-30">
    {children}
  </span>
);

const ProductImageActions = ({ productId }: { productId?: string }) => {
  const router = useRouter();
  return (
    <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40">
      <button
        className="bg-white rounded-full shadow flex items-center justify-center w-10 h-10"
        onClick={(e) => {
          e.stopPropagation();
          if (productId) {
            router.push(`/product/pop-up/${productId}`);
          }
        }}
        title="Xem chi tiết"
      >
        <Expand size={22} strokeWidth={1} color="#222" />
      </button>
      <button className="bg-white rounded-full shadow flex items-center justify-center w-10 h-10">
        <Heart size={22} strokeWidth={1} color="#222" />
      </button>
    </div>
  );
};

const ProductImage = ({
  src,
  alt,
  productId,
  className = "",
}: {
  src: string;
  alt?: string;
  productId?: string;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <div
      className={`relative w-full h-[120px] sm:h-[160px] md:h-[200px] lg:h-[220px] xl:h-[240px] overflow-hidden group mb-6 cursor-pointer ${className}`}
      onClick={() => productId && router.push(`/product/${productId}`)}
    >
      <Image
        src={src}
        alt={alt ?? "Product image"}
        fill
        className="
          object-cover rounded-t-lg
          transform transition-transform duration-500
          group-hover:scale-110
          absolute top-0 left-0 z-10
        "
        sizes="100vw"
        priority
      />

      <ProductImageActions productId={productId} />
    </div>
  );
};

const ProductLabel = ({ label }: { label: string }) => (
  <div
    className="
    font-semibold text-gray-800 mb-1 text-left w-full
    text-[10px] md:text-[11px] lg:text-xs xl:text-sm
    truncate
  "
  >
    {label}
  </div>
);

// Hiển thị khoảng thời gian khả dụng của món (availableFrom - availableTo)
const formatTime = (t?: string | null, fallback = "08:00:00") => {
  if (!t || t.trim() === "") return fallback;
  // Accept formats like HH:mm:ss or HH:mm and return HH:mm
  const parts = t.split(":");
  if (parts.length >= 2) return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}`;
  return t;
};

export const ProductDeliveryInfo = ({
  availableFrom,
  availableTo,
  prepTimeMinutes,
  className = "",
}: {
  availableFrom?: string | null;
  availableTo?: string | null;
  prepTimeMinutes?: number | null;
  className?: string;
}) => {
  const from = formatTime(availableFrom, "08:00:00");
  const to = formatTime(availableTo, "21:00:00");
    return (
      <div className={"mb-1 " + className}>
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-[11px] py-1 px-2 rounded-lg">⏰ {from} - {to}</span>
        </div>
        {prepTimeMinutes && prepTimeMinutes > 0 ? (
          <div className="mt-1">
            <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-500 text-[11px] py-1 px-2 rounded-md">⏱ {prepTimeMinutes} phút</span>
          </div>
        ) : null}
      </div>
    );
};

export const ProductRating = ({
  rating,
  className = "",
}: {
  rating: number;
  className?: string;
}) => (
  <div className={`flex text-left w-full ${className}`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={i < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ))}
  </div>
);

export const ProductPrice = ({
  price,
  className = "",
}: {
  price?: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex items-center gap-2 ${className}
        text-[10px] md:text-xs lg:text-sm xl:text-base pb-4
      `}
    >
      {price && <MoneyVND value={price} color="text-pink-600" />}
    </div>
  );
};

const ProductCard: React.FC<{
  product: MenuItem & { imageHover?: string };
  className?: string;
  imageClassName?: string;
}> = ({ product, className = "", imageClassName = "" }) => (
  <motion.div
    layout
    initial={{ scale: 0.95, originX: 0, originY: 0 }}
    animate={{ scale: 1, originX: 0, originY: 0 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className={`
      bg-white rounded-xl border border-gray-100 flex flex-col relative transition-shadow duration-200 hover:shadow-2xl
      w-full
      max-w-[250px] min-w-[130px]
      md:max-w-[380px] md:min-w-[180px]
      lg:max-w-[235px] lg:min-w-[180px]
      xl:max-w-[490px] xl:min-w-[222px]
      ${className}
    `}
  >
    <div className="relative">
      <ProductImage
        src={product.imgUrl || "/products/04.jpg"}
        alt={product.name}
        
        productId={product.menuItemId}
        className={imageClassName}
      />
      {/* Badges */}
      {product.isSpecial && <SpecialBadge>HOT</SpecialBadge>}
      {/* <ProductBadge percent={product.percent} /> */}
    </div>
    <div className="flex-1 flex flex-col justify-start items-start w-full px-2 md:px-3 lg:px-4">
      <ProductLabel label={product.name} />
      <div className="flex flex-row flex-wrap items-center w-full text-left gap-2">
        <ProductDeliveryInfo
          availableFrom={product.availableFrom || ""}
          availableTo={product.availableTo || ""}
          prepTimeMinutes={product.prepTimeMinutes}
        />
        {/* <ProductRating rating={product.rating} className="mb-2" /> */}
      </div>
      <ProductPrice price={product.price !== undefined ? String(product.price) : ""} />
    </div>
  </motion.div>
);

export default ProductCard;
