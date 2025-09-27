import React from "react";
import { useRouter } from "next/navigation";

interface AccountDropdownProps {
  user: {
    displayName?: string;
  } | null;
}

const AccountDropdown: React.FC<AccountDropdownProps> = ({ user }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Xóa cookie đăng nhập (client only)
    document.cookie = "accessToken=; path=/; max-age=0";
    document.cookie = "refreshToken=; path=/; max-age=0";
    document.cookie = "user=; path=/; max-age=0";
    router.push("/");
    // Có thể reload lại trang nếu muốn clear context
    window.location.reload();
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
      <div className="absolute right-0 top-full w-56 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
        <button
          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
          onClick={() => router.push("/profile")}
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
