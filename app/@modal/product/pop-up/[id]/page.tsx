"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenuItemByIdRequest } from "@/redux/slice/MenuItem/menuItemSlice";
import { addToCartRequest } from "@/redux/slice/Cart/cartSlice";
import type { RootState } from "@/redux/store/store";
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
  const dispatch = useDispatch();
  const menuItem = useSelector((s: RootState) => s.menuItem.selectedItem);

  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (id) dispatch(fetchMenuItemByIdRequest(id));
  }, [dispatch, id]);

  // Khi click chọn topping
  const toggleOptionValue = (optionId: string, valueId: string, isMultiple: boolean) => {
    setSelectedOptions((prev) => {
      const current = prev[optionId] || [];
      if (isMultiple) {
        // Chọn nhiều được
        return {
          ...prev,
          [optionId]: current.includes(valueId)
            ? current.filter((x) => x !== valueId)
            : [...current, valueId],
        };
      } else {
        // Chỉ chọn 1
        return { ...prev, [optionId]: [valueId] };
      }
    });
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    let total = menuItem?.price || 0;
    if (menuItem?.options) {
      for (const option of menuItem.options) {
        const chosenIds = selectedOptions[option.optionId] || [];
        for (const val of option.values) {
          if (chosenIds.includes(val.optionValueId)) {
            total += val.priceDelta;
          }
        }
      }
    }
    return total * quantity;
  };

  const totalPrice = calculateTotal();

  const handleAddToCart = () => {
    // Build payload in backend-expected shape
    const items = [
      {
        menuItemId: menuItem?.menuItemId,
        quantity,
        options: Object.keys(selectedOptions).map((optionId) => ({
          optionId,
          selectedValueIds: selectedOptions[optionId],
        })),
      },
    ];

    const payload = {
      merchantId: menuItem?.merchantId,
      deliveryFee: 0,
      serviceFee: 0,
      discount: 0,
      items,
      note,
    };

    console.log("Dispatch addToCartRequest", payload);
  // dispatch to saga
  // @ts-expect-error - payload may be partial during build-time checks
  dispatch(addToCartRequest(payload));
  };

  return (
    <div className="relative p-4 md:p-6 bg-white rounded-2xl text-black">
      {isModal && (
        <ButtonClose
          className="absolute right-4 top-4 z-20"
          onClick={() => router.back()}
        />
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left: Food images */}
        <div className="flex-1 min-w-[260px]">
          <ProductImages imageUrl={menuItem?.imgUrl || "/img/placeholder.png"} />
        </div>

        {/* Right: Food details */}
        <div className="flex-1 min-w-[280px]">
          <SectionTitle>
            <span className="text-2xl font-semibold text-gray-900">
              {menuItem?.name ?? `Món #${id}`}
            </span>
          </SectionTitle>

          <p className="mt-3 text-gray-700 leading-relaxed">
            {menuItem?.description ?? "Mô tả đang cập nhật"}
          </p>

          {/* Các options (ví dụ: Extra Toppings, chọn size,...) */}
          {menuItem?.options?.map((opt) => (
            <div key={opt.optionId} className="mb-6">
              <span className="block mb-2 font-medium text-gray-800">
                {opt.optionName}
                {opt.required && <span className="text-red-500 ml-1">*</span>}
              </span>

              <div className="flex flex-wrap gap-2">
                {opt.values
                  .filter((v) => v.isActive)
                  .map((val) => {
                    const isSelected =
                      selectedOptions[opt.optionId]?.includes(val.optionValueId);
                    return (
                      <button
                        key={val.optionValueId}
                        onClick={() =>
                          toggleOptionValue(
                            opt.optionId,
                            val.optionValueId,
                            opt.isMultipleChoice
                          )
                        }
                        className={`px-3 py-1 rounded-full border transition text-sm ${
                          isSelected
                            ? "bg-green-500 text-white border-green-500"
                            : "border-gray-300 text-gray-700 hover:border-green-400"
                        }`}
                      >
                        {val.valueName}{" "}
                        {val.priceDelta > 0 &&
                          `(+$${(val.priceDelta / 1000).toFixed(0)}k)`}
                      </button>
                    );
                  })}
              </div>
            </div>
          ))}

          {/* Quantity */}
          <div className="flex items-center gap-5 mb-6">
            <div className="flex items-center border rounded-lg">
              <ButtonMinus onClick={() => setQuantity((q) => Math.max(1, q - 1))} />
              <span className="px-4 text-lg font-medium text-black">{quantity}</span>
              <ButtonPlus onClick={() => setQuantity((q) => q + 1)} />
            </div>
            <span className="text-lg font-semibold text-green-600">
              {totalPrice.toLocaleString()}₫
            </span>
          </div>

          {/* Note */}
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
              onClick={handleAddToCart}
            />
            <WishlistButton />
          </div>
        </div>
      </div>
    </div>
  );
}
