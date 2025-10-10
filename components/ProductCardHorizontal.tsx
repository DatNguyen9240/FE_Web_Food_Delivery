"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ProductBadge,
  ProductDeliveryInfo,
  ProductPrice,
} from "./ProductCard";
import { MenuItem } from "@/redux/slice/MenuItem/menuItemSlice";


const ProductCardHorizontal: React.FC<{
  product: MenuItem;
  className?: string;
}> = ({ product, className = "" }) => (
  <motion.div
    layout
    initial={{ scale: 0.8, originX: 0, originY: 0 }}
    animate={{ scale: 1, originX: 0, originY: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className={`bg-white rounded-xl border border-gray-100 flex flex-row items-center relative transition-shadow duration-200 hover:shadow-2xl w-full max-w-full min-h-[120px] p-2 ${className}`}
  >
    <div className="relative flex-shrink-0 w-[100px] h-[100px] sm:w-[140px] sm:h-[140px] md:w-[180px] md:h-[180px] max-w-full">
      <Image
        src={product.imgUrl || "/products/04.jpg"}
        alt={product.name}
        fill
        className="object-cover rounded-lg"
        sizes="100vw"
        priority
      />
      <ProductBadge isSpecial={product.isSpecial} />
    </div>
    <div className="flex-1 flex flex-col justify-center items-start px-2 py-1 sm:px-4 sm:py-2 min-w-0">
      <div className="font-semibold text-gray-800 mb-1 text-left w-full text-[13px] sm:text-base truncate">
        {product.name}
      </div>
      <ProductDeliveryInfo
        availableFrom={product.availableFrom}
        availableTo={product.availableTo}
      />

      <ProductPrice
        price={product.price !== undefined && product.price !== null ? String(product.price) : undefined}
        className="text-[13px] sm:text-base"
      />
    </div>
  </motion.div>
);

export default ProductCardHorizontal;
