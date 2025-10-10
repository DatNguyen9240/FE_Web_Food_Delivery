"use client";
import React, { useEffect } from "react";
import SectionTitle from "./SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { fetchMerchantCategoriesRequest } from "@/redux/slice/MerchantCategory/merchantCategorySlice";

// No local fallback: rely on API categories

const FeaturedCategories: React.FC = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(
    (state: RootState) => state.merchantCategory || { categories: [], loading: false }
  );

  // Debug: log redux state
  // eslint-disable-next-line no-console
  console.log("[FeaturedCategories] categories, loading:", categories, loading);

  useEffect(() => {
    dispatch(fetchMerchantCategoriesRequest());
  }, [dispatch]);

  if (!categories || categories.length === 0) return null;

  const list = categories.slice(0, 6);

  return (
    <section className="hidden lg:block max-w-[1280px] mx-auto mt-10">
      <SectionTitle size="lg">DANH MỤC NỔI BẬT</SectionTitle>
      <div className="flex gap-8 justify-center flex-wrap">
        {list.map((cat: any) => (
          <a
            key={cat.name || cat.label}
            href={cat.href || `/products/category/${(cat.name || cat.label).toString().toLowerCase().replace(/\s|\//g, "-")}`}
            className="flex flex-col items-center w-32 group"
          >
            <div className="w-24 h-24 flex items-center justify-center rounded-full text-5xl bg-gray-50 mb-2 border border-gray-200 transition-transform duration-200 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
              {cat.icon || (cat.imageUrl ? <img src={cat.imageUrl} alt={cat.name} className="w-full h-full object-cover rounded-full" /> : "🍽️")}
            </div>
            <span className="text-base font-semibold text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-200">
              {cat.name || cat.label}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
