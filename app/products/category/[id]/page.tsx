"use client";

import ProductGrid from "@/app/components/ProductGrid";
import ViewModeSwitcher from "@/app/components/ViewModeSwitcher";
import { useGridMode } from "@/app/hooks/useGridMode";

const newProducts = [
  {
    id: "1",
    label: "Cơm Tấm Sườn Bì",
    priceOld: "35000",
    priceNew: "30000",
    percent: "14%",
    distanceKm: 1.2,
    avgDeliveryMin: 15,
    image: "/products/comtam.jpg",
    rating: 5,
  },
  {
    id: "2",
    label: "Bún Bò Huế",
    priceOld: "40000",
    priceNew: "35000",
    percent: "13%",
    distanceKm: 2.5,
    avgDeliveryMin: 20,
    image: "/products/bunbohue.jpg",
    rating: 4,
  },
  {
    id: "3",
    label: "Bánh Mì Thịt",
    priceOld: "20000",
    priceNew: "18000",
    percent: "10%",
    distanceKm: 0.8,
    avgDeliveryMin: 10,
    image: "/products/banhmi.jpg",
    rating: 5,
  },
  {
    id: "4",
    label: "Hủ Tiếu Gõ",
    priceOld: "30000",
    priceNew: "27000",
    percent: "10%",
    distanceKm: 1.7,
    avgDeliveryMin: 12,
    image: "/products/hutieu.jpg",
    rating: 4,
  },
  {
    id: "5",
    label: "Mì Gói Trứng",
    priceOld: "15000",
    priceNew: "12000",
    percent: "20%",
    distanceKm: 0.5,
    avgDeliveryMin: 8,
    image: "/products/migoitrung.jpg",
    rating: 4,
  },
  {
    id: "6",
    label: "Xôi Gà",
    priceOld: "25000",
    priceNew: "22000",
    percent: "12%",
    distanceKm: 1.3,
    avgDeliveryMin: 14,
    image: "/products/xoiga.jpg",
    rating: 5,
  },
  {
    id: "7",
    label: "Bánh Cuốn Nóng",
    priceOld: "25000",
    priceNew: "22000",
    percent: "12%",
    distanceKm: 2.0,
    avgDeliveryMin: 16,
    image: "/products/banhcuon.jpg",
    rating: 4,
  },
  {
    id: "8",
    label: "Bún Thịt Nướng",
    priceOld: "35000",
    priceNew: "32000",
    percent: "9%",
    distanceKm: 2.8,
    avgDeliveryMin: 18,
    image: "/products/bunthitnuong.jpg",
    rating: 5,
  },
  {
    id: "9",
    label: "Phở Bò",
    priceOld: "40000",
    priceNew: "37000",
    percent: "8%",
    distanceKm: 1.9,
    avgDeliveryMin: 15,
    image: "/products/phobo.jpg",
    rating: 5,
  },
  {
    id: "10",
    label: "Cháo Thịt Bằm",
    priceOld: "20000",
    priceNew: "18000",
    percent: "10%",
    distanceKm: 1.1,
    avgDeliveryMin: 11,
    image: "/products/chao.jpg",
    rating: 4,
  },
  {
    id: "11",
    label: "Bún Riêu",
    priceOld: "30000",
    priceNew: "27000",
    percent: "10%",
    distanceKm: 2.3,
    avgDeliveryMin: 17,
    image: "/products/bunrieu.jpg",
    rating: 4,
  },
  {
    id: "12",
    label: "Cơm Gà Xối Mỡ",
    priceOld: "35000",
    priceNew: "32000",
    percent: "9%",
    distanceKm: 1.6,
    avgDeliveryMin: 13,
    image: "/products/comgaxoimo.jpg",
    rating: 5,
  },
];

const CategoryPage = () => {
  const { cols, setCols, modes } = useGridMode();

  return (
    <div className="overflow-hidden lg:px-4">
      <div className="mb-8">
        <ViewModeSwitcher value={cols} onChange={setCols} modes={modes} />
      </div>
      <ProductGrid products={newProducts} cols={cols} />
    </div>
  );
};

export default CategoryPage;
