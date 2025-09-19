"use client";
import Image from "next/image";
import { useState } from "react";
import FoodCircle from "../components/FoodCircle";

const foodItems = [
  { id: 1, image: "/foods/salad.jpg" },
  { id: 2, image: "/foods/smoothie-bowl.jpg" },
  { id: 3, image: "/foods/avocado-toast.jpg" },
  { id: 4, image: "/foods/kebab.jpg" },
  { id: 5, image: "/foods/pizza.jpg" },
  { id: 6, image: "/foods/buddha-bowl.jpg" },
];

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="flex min-h-screen relative">
      {/* Background image */}
      <Image
        src="/images/bg_login.jpg"
        alt="Background"
        fill
        sizes="100vw"
        quality={100}
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-white/40" />

      <div className="relative flex w-full">
        {/* Bên trái: nội dung truyền vào */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          {children}
        </div>
        {/* Bên phải: luôn là vòng tròn món ăn */}
        <div className="w-1/2 flex items-center justify-center">
          <FoodCircle
            foodItems={foodItems}
            currentIndex={currentIndex}
            onItemClick={setCurrentIndex}
          />
        </div>
      </div>
    </div>
  );
}