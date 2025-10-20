"use client";
import React from "react";
import AdBanner from "./AdBanner";
import ProductTabs from "./ProductTabs";
import ProductsTitle from "./ProductsTitle";
import NewProductsSection from "./NewProductsSection";
import Carousel from "./Carousel";
import ProductList from "./ProductCarousel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { fetchMenuItemsRequest } from "@/redux/slice/MenuItem/menuItemSlice";

const PopularProductsSection: React.FC = () => {
  const dispatch = useDispatch();
  const { items: products } = useSelector(
    (state: RootState) => state.menuItem || { items: [], loading: false, error: null }
  );

  React.useEffect(() => {
    dispatch(fetchMenuItemsRequest());
  }, [dispatch]);

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
            <ProductsTitle
              title="Sản phẩm phổ biến"
              description="Khám phá những sản phẩm phổ biến tháng 9 này"
            />
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
