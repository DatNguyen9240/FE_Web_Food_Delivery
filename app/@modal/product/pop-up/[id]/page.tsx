"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import SectionTitle from "@/components/SectionTitle";
import ProductImages from "@/components/ProductImages";
import {
  ButtonMinus,
  ButtonPlus,
  AddToCartButton,
  WishlistButton,
  ButtonClose,
} from "@/components/Button";

export default function FoodModal({
  params,
  isModal = true,
}: {
  params: Promise<{ id: string }>;
  isModal?: boolean;
}) {
  const router = useRouter();
  const { id } = use(params);

  // Các lựa chọn đặc trưng cho cơm sườn
  const suonTypes = ["Sườn nướng", "Sườn ram", "Sườn chiên"];
  const toppings = ["Dưa chua", "Chả", "Xúc xích"];
  const [selectedSuon, setSelectedSuon] = useState(suonTypes[0]);
  const [addEgg, setAddEgg] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const toggleTopping = (t: string) =>
    setSelectedToppings((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  return (
    <div className="relative p-4 md:p-6 bg-white rounded-2xl">
      {isModal && (
        <ButtonClose
          className="absolute right-4 top-4 z-20"
          onClick={() => router.back()}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Food images */}
        <div className="flex-1 min-w-[260px]">
          <ProductImages />
        </div>

        {/* Right: Food details */}
        <div className="flex-1 min-w-[280px]">
          <SectionTitle>
            <span className="text-2xl font-semibold text-gray-900">
              Cơm sườn #{id}
            </span>
          </SectionTitle>

          <p className="mt-3 text-gray-700 leading-relaxed">
            Cơm sườn đặc biệt, chọn loại sườn và topping theo ý thích!
          </p>

          {/* Chọn loại sườn */}
          <div className="mb-6">
            <span className="block mb-2 font-medium text-gray-800">
              Chọn loại sườn
            </span>
            <div className="flex gap-2">
              {suonTypes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSuon(s)}
                  className={`px-3 py-1 rounded-full border transition
                    ${
                      selectedSuon === s
                        ? "bg-green-500 text-white border-green-500"
                        : "border-gray-300 text-gray-700 hover:border-green-400"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Thêm trứng */}
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={addEgg}
                onChange={() => setAddEgg((v) => !v)}
                className="mr-2"
              />
              <span className="text-black">Thêm trứng (+10.000₫)</span>
            </label>
          </div>

          {/* Toppings */}
          <div className="mb-6">
            <span className="block mb-2 font-medium text-gray-800">
              Thêm topping
            </span>
            <div className="flex flex-wrap gap-2">
              {toppings.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleTopping(t)}
                  className={`px-3 py-1 rounded-full border transition
                    ${
                      selectedToppings.includes(t)
                        ? "bg-green-500 text-white border-green-500"
                        : "border-gray-300 text-gray-700 hover:border-green-400"
                    }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-5 mb-6">
            <div className="flex items-center border rounded-lg">
              <ButtonMinus
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              />
              <span className="px-4 text-lg font-medium text-black">
                {quantity}
              </span>
              <ButtonPlus onClick={() => setQuantity((q) => q + 1)} />
            </div>
          </div>

          {/* Note for chef */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-black">
              Ghi chú cho bếp
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring focus:ring-green-400 text-black"
              placeholder="Ví dụ: ít cay, không hành..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 items-center">
            <AddToCartButton
              className="flex-1 text-lg py-3"
              // onClick={() => handleAddToCart({selectedSuon, addEgg, selectedToppings, quantity, note})}
            />
            <WishlistButton />
          </div>
        </div>
      </div>
    </div>
  );
}
