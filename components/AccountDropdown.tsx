import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store/store";
import { logoutRequest } from "@/redux/slice/Auth/AuthSlice";

const AccountDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutRequest());
    router.push("/");
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-100">
        <span className="font-semibold text-gray-700">
          {user?.displayName || "Tài khoản"}
        </span>
        <svg
          width="18"
          height="18"
          fill="none"
          stroke="#222"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div className="absolute right-0 top-full w-48 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
        <div className="px-4 py-2 text-gray-700 border-b">{user?.email}</div>
        <button
          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
          onClick={() => router.push("/account")}
        >
          Thông tin tài khoản
        </button>
        <button
          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
          onClick={() => router.push("/orders")}
        >
          Đơn hàng của tôi
        </button>
        <button
          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default AccountDropdown;
