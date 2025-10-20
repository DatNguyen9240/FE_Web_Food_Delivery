"use client";
import React, { useEffect } from "react";
import ProductsTitle from "./ProductsTitle";
import { ButtonMinus, ButtonPlus, ButtonClose } from "./Button";
import Image from "next/image";
import MoneyVND from "./MoneyVND";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store/store";
import { fetchCartRequest, updateCartItemQuantityRequest, deleteCartItemRequest } from "@/redux/slice/Cart/cartSlice";

type CartItemType = {
  id: string;
  label: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
  cartItemId?: string;
  merchantId?: string;
  extraToppings?: string;
};

// API types to avoid `any`

type CartApiSelectedValue = {
  valueName: string;
};

type CartApiOption = {
  optionName: string;
  selectedValues?: CartApiSelectedValue[];
};

type CartApiItem = {
  cartItemId?: string;
  menuItemId?: string;
  menuItemName?: string;
  priceAtAdd?: number;
  price?: number;
  quantity?: number;
  options?: CartApiOption[];
};

type CartApi = {
  cartId?: string;
  merchant?: { merchantId?: string; merchantName?: string };
  merchantId?: string;
  merchantName?: string;
  items?: CartApiItem[];
  subTotal?: number;
};

type TableHeaderProps = {
  columns: string[];
};

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => (
  <thead>
    <tr className="bg-gray-200">
      {columns.map((col, idx) => (
        <th
          key={col}
          className={`py-3 px-4 font-semibold ${
            idx === 0
              ? "text-black rounded-tl-xl rounded-bl-xl min-w-[240px] text-left"
              : idx === 1 || idx === 2 || idx === 3
              ? "text-black text-center"
              : idx === columns.length - 1
              ? "text-black rounded-tr-xl rounded-br-xl text-center"
              : "text-black text-center"
          }`}
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>
);

const CartTableRow: React.FC<{ item: CartItemType }> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  const decrease = () => {
    console.debug("CartTable: decrease clicked", { cartItemId: item.cartItemId, merchantId: item.merchantId, quantity: item.quantity });
    if (!item.cartItemId) return;
    const newQty = Math.max(1, item.quantity - 1);
    dispatch(updateCartItemQuantityRequest({ cartItemId: item.cartItemId, merchantId: item.merchantId, quantity: newQty }));
  };

  const increase = () => {
    console.debug("CartTable: increase clicked", { cartItemId: item.cartItemId, merchantId: item.merchantId, quantity: item.quantity });
    if (!item.cartItemId) return;
    dispatch(updateCartItemQuantityRequest({ cartItemId: item.cartItemId, merchantId: item.merchantId, quantity: item.quantity + 1 }));
  };

  const remove = () => {
    console.debug("CartTable: remove clicked", { cartItemId: item.cartItemId, merchantId: item.merchantId });
    if (!item.cartItemId) return;
    dispatch(deleteCartItemRequest({ cartItemId: item.cartItemId, merchantId: item.merchantId }));
  };

  return (
    <tr className="border-b">
      <td className="py-2 flex items-center gap-6 min-w-[300px]">
        <Image
          src={item.image}
          alt={item.label}
          width={100}
          height={100}
          className="rounded"
        />
        <div>
          <div
            className="font-bold text-black max-w-[240px] overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
            }}
          >
            {item.label}
          </div>
          {item.extraToppings && (
            <div className="text-xs text-gray-500 mt-1">
              <span className="font-medium text-gray-600">Extra Toppings:</span> {item.extraToppings}
            </div>
          )}
        </div>
      </td>
      <td className="py-2 px-4 text-center">
        <MoneyVND value={item.price} color="text-pink-600" />
      </td>
      <td className="py-2 px-4 text-center text-black">
        <div className="flex items-center gap-2 justify-center">
          <ButtonMinus onClick={decrease} />
          <span className="px-2">{item.quantity}</span>
          <ButtonPlus onClick={increase} />
        </div>
      </td>
      <td className="py-2 px-4 text-center">
        <MoneyVND value={item.subtotal} color="text-pink-600" />
      </td>
      <td className="py-2 px-4 text-center">
        <ButtonClose onClick={remove} />
      </td>
    </tr>
  );
};

const CartTableBody: React.FC<{ items: CartItemType[] }> = ({ items }) => (
  <tbody>
    {items.map((item) => (
      <CartTableRow key={item.id} item={item} />
    ))}
  </tbody>
);

const CartTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartState = useSelector((s: RootState) => s.cart);

  useEffect(() => {
    // fetch cart on mount
    dispatch(fetchCartRequest());
  }, [dispatch]);

  const carts = cartState.carts || [];

  return (
    <div className="w-full mx-auto mt-8 rounded-lg ">
      <ProductsTitle title="GIỎ HÀNG CỦA BẠN" />

      {carts.length === 0 && (
        <div className="text-gray-700 mb-2 ml-1">Giỏ hàng trống</div>
      )}

      {/* Render a table per merchant/cart */}
      <div className="flex flex-col gap-6">
        {carts.map((c: CartApi, cartIndex: number) => {
          const merchantId = c.merchant?.merchantId || c.merchantId;
          const merchantName = c.merchant?.merchantName || c.merchantName || "Quán ăn";
          const rows: CartItemType[] = (c.items || []).map((it: CartApiItem, idx: number) => {
            let extraToppings = "";
            if (it.options && Array.isArray(it.options)) {
              const toppingsOpt = it.options.find((opt: CartApiOption) => opt.optionName === "Extra Toppings");
              if (toppingsOpt && Array.isArray(toppingsOpt.selectedValues)) {
                extraToppings = toppingsOpt.selectedValues.map((v: CartApiSelectedValue) => v.valueName).join(", ");
              }
            }
            return {
              id: String(it.cartItemId ?? it.menuItemId ?? `cart-${cartIndex}-item-${idx}`),
              cartItemId: it.cartItemId,
              merchantId,
              label: it.menuItemName || "",
              image: "/sell_off/01.jpg",
              price: it.priceAtAdd || it.price || 0,
              quantity: it.quantity || 1,
              subtotal: (it.priceAtAdd || it.price || 0) * (it.quantity || 1),
              extraToppings,
            };
          });

          return (
            <div key={c.cartId} className="bg-white rounded-lg border p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold text-lg">{merchantName}</div>
                <div className="text-sm text-gray-600">Tạm tính: <span className="font-semibold text-pink-600"><MoneyVND value={c.subTotal ?? rows.reduce((s, r) => s + r.subtotal, 0)} /></span></div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <TableHeader columns={["Sản phẩm", "Đơn giá", "Số lượng", "Tạm tính", "Xóa"]} />
                  <CartTableBody items={rows} />
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartTable;
