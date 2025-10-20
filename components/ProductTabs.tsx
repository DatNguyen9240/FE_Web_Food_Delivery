"use client";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { fetchMerchantCategoriesRequest } from "@/redux/slice/MerchantCategory/merchantCategorySlice";
import { ButtonPrev, ButtonNext } from "./Button";
import ProductsTitle from "./ProductsTitle";

// Tabs sẽ lấy từ category API

const ProductTabs = React.memo(function ProductTabs() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(
    (state: RootState) => state.merchantCategory || { categories: [], loading: false }
  );
  useEffect(() => {
    dispatch(fetchMerchantCategoriesRequest());
  }, [dispatch]);
  const tabs = categories?.map(cat => cat.name) || [];
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);
  // Tạo mảng ref cho từng tab
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (idx: number) => {
    setActiveTab(idx);
    const tabEl = tabRefs.current[idx];
    const container = scrollRef.current;
    if (tabEl && container) {
      const tabCenter = tabEl.offsetLeft + tabEl.offsetWidth / 2;
      const containerCenter = container.offsetWidth / 2;
      const targetScrollLeft = tabCenter - containerCenter;
      container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
    }
  };
  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -80, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 80, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const checkShow = () => {
      if (scrollEl) {
        setShowPrev(scrollEl.scrollLeft > 0);
        setShowNext(
          scrollEl.scrollLeft + scrollEl.offsetWidth < scrollEl.scrollWidth
        );
      }
    };
    checkShow();
    if (scrollEl) {
      scrollEl.addEventListener("scroll", checkShow);
    }
    window.addEventListener("resize", checkShow);
    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener("scroll", checkShow);
      }
      window.removeEventListener("resize", checkShow);
    };
  }, []);

  return (
    <div className="relative lg:w-[640px] w-[345px] md:w-[600px]">
      <div className="block md:hidden mb-2">
        <ProductsTitle
          title="Sản phẩm phổ biến"
          description="Khám phá những sản phẩm được ưa chuộng nhất hiện nay"
        />
      </div>

      <div className="relative">
        <ButtonPrev onClick={handlePrev} size="sm" hidden={!showPrev} />

        <div
          ref={scrollRef}
          className="flex lg:space-x-2 space-x-0 overflow-x-auto rounded-lg scrollbar-hide mx-6 xl:mx-12 lg:mx-12 md:mx-12"
        >
          {tabs.length === 0 && loading ? (
            <div className="text-gray-400 px-4 py-2">Đang tải danh mục...</div>
          ) : (
            tabs.map((tab, idx) => (
              <button
                key={tab}
                ref={el => { tabRefs.current[idx] = el; }}
                onClick={() => handleTabClick(idx)}
                className={`pb-1 text-sm font-medium flex-1 text-center min-w-[120px] px-4 whitespace-nowrap mx-1 ${
                  activeTab === idx
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))
          )}
        </div>

        <ButtonNext onClick={handleNext} size="sm" hidden={!showNext} />
      </div>
    </div>
  );
});

export default ProductTabs;
