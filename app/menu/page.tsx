"use client";

import { useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface Category {
  name: string;
  image: string;
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3x3 grid

  // Dữ liệu mẫu - sau này có thể thay thế bằng API call
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Lẩu Thái",
      description: "Lẩu Thái chua cay đặc trưng",
      price: 299000,
      image: "/images/lau-thai.jpg",
      category: "Lẩu",
    },
    {
      id: 2,
      name: "Bò Mỹ Cuộn Nấm",
      description: "Bò Mỹ thượng hạng cuộn nấm kim châm",
      price: 189000,
      image: "/images/bo-cuon-nam.jpg",
      category: "Bò",
    },
    {
      id: 3,
      name: "Gân Bò",
      description: "Gân bò hầm mềm",
      price: 159000,
      image: "/images/gan-bo.jpg",
      category: "Nội tạng",
    },
    {
      id: 4,
      name: "Tôm Sú Nướng",
      description: "Tôm sú nướng tươi với sốt đặc biệt",
      price: 259000,
      image: "/images/tom-su-nuong.jpg",
      category: "Hải sản",
    },
    {
      id: 5,
      name: "Nấm Kim Châm Nướng",
      description: "Nấm kim châm nướng mỡ hành",
      price: 89000,
      image: "/images/nam-kim-cham.jpg",
      category: "Rau và nấm",
    },
    {
      id: 6,
      name: "Mỳ Udon",
      description: "Mỳ Udon đậm đà hương vị Nhật",
      price: 129000,
      image: "/images/my-udon.jpg",
      category: "Mỳ",
    },
    {
      id: 7,
      name: "Sườn Cừu Nướng",
      description: "Sườn cừu nướng kiểu Mông Cổ",
      price: 329000,
      image: "/images/suon-cuu.jpg",
      category: "Heo & Cừu",
    },
    {
      id: 8,
      name: "Lẩu Nấm",
      description: "Lẩu nấm chay thanh đạm",
      price: 249000,
      image: "/images/lau-nam.jpg",
      category: "Lẩu",
    },
    {
      id: 9,
      name: "Bò Wagyu A5",
      description: "Thịt bò Wagyu A5 thượng hạng",
      price: 899000,
      image: "/images/bo-wagyu.jpg",
      category: "Bò",
    },
    {
      id: 10,
      name: "Bạch Tuộc Nướng",
      description: "Bạch tuộc nướng sa tế",
      price: 219000,
      image: "/images/bach-tuoc.jpg",
      category: "Hải sản",
    },
    {
      id: 11,
      name: "Dồi Trường Chiên",
      description: "Dồi trường chiên giòn",
      price: 139000,
      image: "/images/doi-truong.jpg",
      category: "Nội tạng",
    },
    {
      id: 12,
      name: "Rau Củ Thập Cẩm",
      description: "Các loại rau củ theo mùa",
      price: 99000,
      image: "/images/rau-cu.jpg",
      category: "Rau và nấm",
    },
    {
      id: 13,
      name: "Ba Chỉ Heo Nướng",
      description: "Ba chỉ heo nướng mật ong",
      price: 179000,
      image: "/images/ba-chi-heo.jpg",
      category: "Heo & Cừu",
    },
  ];

  const categories: Category[] = [
    {
      name: "Tất cả",
      image: "/images/categories/all.jpg",
    },
    {
      name: "Lẩu",
      image: "/images/categories/lau.jpg",
    },
    {
      name: "Bò",
      image: "/images/categories/bo.jpg",
    },
    {
      name: "Nội tạng",
      image: "/images/categories/noi-tang.jpg",
    },
    {
      name: "Hải sản",
      image: "/images/categories/hai-san.jpg",
    },
    {
      name: "Rau và nấm",
      image: "/images/categories/rau-nam.jpg",
    },
    {
      name: "Mỳ",
      image: "/images/categories/my.jpg",
    },
    {
      name: "Heo & Cừu",
      image: "/images/categories/heo-cuu.jpg",
    },
  ];

  const filteredItems =
    activeCategory === "Tất cả"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  // Tính toán các items cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="pt-20 px-4 min-h-screen bg-gray-50">
      {/* Danh mục */}
      <div className="container mx-auto mb-8">
        <div className="flex overflow-x-auto gap-8 pb-4 items-center">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`flex flex-col items-center gap-3 min-w-[80px] ${
                activeCategory === category.name
                  ? "text-red-500"
                  : "text-gray-700 hover:text-red-500"
              }`}
            >
              <div
                className={`w-20 h-20 rounded-full overflow-hidden ${
                  activeCategory === category.name ? "ring-2 ring-red-500" : ""
                }`}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                {category.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Thanh tìm kiếm và sắp xếp */}
      <div className="container mx-auto mb-6">
        <div className="flex gap-4 items-center justify-center">
          <div className="w-2/5">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Sắp xếp theo giá:</span>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
              <option value="default">Mặc định</option>
              <option value="asc">Giá thấp đến cao</option>
              <option value="desc">Giá cao đến thấp</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tiêu đề danh mục đang chọn */}
      <div className="container mx-auto mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {activeCategory === "Tất cả"
            ? "Tất cả món ăn"
            : `Món ${activeCategory}`}
        </h2>
      </div>

      {/* Danh sách món ăn */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-red-500 font-medium">
                    {item.price.toLocaleString("vi-VN")}đ
                  </span>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center items-center gap-2 mt-8 mb-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Trước
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === index + 1
                  ? "bg-red-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
