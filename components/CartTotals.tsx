"use client";
import React from "react";
import Button from "./Button";
import MoneyVND from "./MoneyVND";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { paymentCheckoutRequest } from "@/redux/slice/Payment/PaymentSlice";

const CartTotals: React.FC = () => {
  const cartState = useSelector((s: RootState) => s.cart);
  const carts = cartState.carts || [];
  const dispatch = useDispatch();

  // Compute subtotal by summing cart.subTotal if provided, otherwise items
  let subTotal = 0;
  let deliveryFee = 0;
  let serviceFee = 0;
  let discount = 0;

  if (carts.length > 0) {
    // If API returns multiple carts (per merchant), aggregate them
    for (const c of carts) {
      if (typeof c.subTotal === "number") subTotal += c.subTotal;
      else if (Array.isArray(c.items)) {
        for (const it of c.items) {
          const price = it.priceAtAdd ?? it.price ?? 0;
          const qty = it.quantity ?? 1;
          subTotal += price * qty;
        }
      }
      deliveryFee += c.deliveryFee ?? 0;
      serviceFee += c.serviceFee ?? 0;
      discount += c.discount ?? 0;
    }
  }

  const total = subTotal + deliveryFee + serviceFee - discount;

  const handleCheckout = () => {
    if (!carts.length) return;
    const merchantId = carts[0].merchant?.merchantId || carts[0].merchantId;
    if (!merchantId) return;
    // Gửi toàn bộ cart đầu tiên làm payload, bạn có thể tuỳ chỉnh lại nếu muốn
    dispatch(paymentCheckoutRequest({ merchantId, payload: carts[0] }));
  };

  return (
    <div className="bg-white rounded-lg border p-5 w-full max-w-xs shadow flex flex-col gap-2">
      <h3 className="text-lg font-bold text-gray-800 mb-2">TỔNG GIỎ HÀNG</h3>
      <hr className="mb-2" />
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-700">Tạm tính</span>
        <MoneyVND value={subTotal} color="text-pink-600" className="text-lg" />
      </div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-700">Phí vận chuyển</span>
        <MoneyVND value={deliveryFee} color="text-black" />
      </div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-700">Phí dịch vụ</span>
        <MoneyVND value={serviceFee} color="text-black" />
      </div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-gray-700">Giảm giá</span>
        <MoneyVND value={discount} color="text-black" />
      </div>
      <div className="flex justify-between items-center mt-2 mb-3">
        <span className="text-gray-700 font-bold">Tổng cộng</span>
        <MoneyVND value={total} color="text-pink-600" className="text-lg" />
      </div>
      <Button
        shape="rounded"
        size="md"
        className="bg-pink-600 hover:bg-pink-700 text-white w-full flex items-center justify-center font-semibold text-base py-2 mt-2"
        icon={<span className="text-xl mr-2">🛒</span>}
        onClick={handleCheckout}
      >
        Thanh toán
      </Button>
    </div>
  );
};

export default CartTotals;
