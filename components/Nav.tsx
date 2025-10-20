"use client";
import React, { useState } from "react";
const menu = [
  { label: "Trang chủ", href: "/" },
  {
    label: "Thực đơn",
    href: "/products/category/an-sang",
    subMenu: [
      { label: "Ăn sáng", href: "/products/category/an-sang" },
      { label: "Ăn trưa", href: "/products/category/an-trua" },
      { label: "Ăn tối", href: "/products/category/an-toi" },
      { label: "Ăn vặt", href: "/products/category/an-vat" },
    ],
  },
  { label: "Quán ăn", href: "/quan-an" },
  { label: "Giới thiệu", href: "/about" },
];

const Nav = React.memo(function Nav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <nav className="w-full bg-white border-b border-gray-200 flex justify-center hidden lg:flex">
      <div className="flex items-center gap-12 py-4 z-99">
        {menu.map((item, idx) => (
          <div
            key={item.label}
            className="relative group"
            onMouseEnter={() => item.subMenu && setOpenIndex(idx)}
            onMouseLeave={() => item.subMenu && setOpenIndex(null)}
          >
            <a href={item.href} className="flex items-center min-w-[80px] px-2">
              <span className="text-sm font-bold tracking-wide uppercase text-gray-700 transition-colors duration-200 ease-in-out group-hover:text-green-600">
                {item.label}
              </span>
              {item.subMenu && (
                <svg
                  className="ml-1 w-3 h-3 text-gray-400 transition-transform duration-200 ease-in-out group-hover:text-green-500 group-hover:-rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              )}
            </a>
            {item.subMenu && (
              <div
                className={`absolute left-0 top-full mt-2 bg-white shadow-lg rounded z-10 min-w-[160px] overflow-hidden transition-all duration-200 ease-in-out ${
                  openIndex === idx
                    ? "opacity-100 visible transform scale-100"
                    : "opacity-0 invisible transform scale-95"
                }`}
              >
                {item.subMenu.map((sub) => (
                  <a
                    key={sub.label}
                    href={sub.href}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 whitespace-nowrap transition-colors duration-150 ease-in-out"
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
});

export default Nav;
