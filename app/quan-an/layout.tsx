"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { fetchMerchantsRequest } from "@/redux/slice/Merchant/merchantSlice";
import Image from "next/image";

export default function QuanAnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();
  const { merchants, loading, error } = useSelector(
    (state: RootState) => state.merchant
  );
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMerchantsRequest());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 p-4 flex flex-col gap-2 sticky top-0 h-screen">
        <h2 className="text-lg font-bold mb-4 text-blue-700">Quán ăn</h2>
        {loading && <div className="text-gray-500">Đang tải...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <ul className="flex-1 overflow-y-auto">
          {merchants.map((m) => (
            <li
              key={m.merchantId}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-blue-50 transition ${
                selected === m.merchantId ? "bg-blue-100" : ""
              }`}
              onClick={() => setSelected(m.merchantId)}
            >
              <Image
                src={m.imgUrl || "/sell_off/01.jpg"}
                alt={m.name}
                width={40}
                height={40}
                className="rounded-full object-cover border aspect-square"
              />
              <div>
                <div className="font-semibold text-gray-900">{m.name}</div>
                <div className="text-xs text-gray-500">{m.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      {/* Main content */}
      <main className="flex-1 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
