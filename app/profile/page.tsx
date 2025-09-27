"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useState, useEffect } from "react";
import {
  updateUserRequest,
  getCurrentUserRequest,
} from "@/redux/slice/Auth/AuthSlice";

import Image from "next/image";

// Gender helpers
const genderToDisplay = (g: string) => {
  if (g === "Male" || g === "1") return "Nam";
  if (g === "Female" || g === "0") return "Nữ";
  return "";
};
const genderToValue = (g: string) => {
  if (g === "Nam" || g === "1") return "Male";
  if (g === "Nữ" || g === "0") return "Female";
  return g || "";
};

export default function ProfilePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUserRequest());
  }, [dispatch]);
  const user = useSelector((state: RootState) => state.auth.user);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    birthDate: user?.birthDate || "",
    gender: user?.gender || "",
  });

  useEffect(() => {
    setForm({
      displayName: user?.displayName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      birthDate: user?.birthDate || "",
      gender: genderToValue(user?.gender || ""),
    });
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-24 p-8 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Bạn chưa đăng nhập
        </h2>
        <p className="text-gray-600">
          Vui lòng đăng nhập để xem thông tin cá nhân.
        </p>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert gender to 1/0 for API
    let genderValue = form.gender;
    if (form.gender === "Male") genderValue = "1";
    else if (form.gender === "Female") genderValue = "0";
    dispatch(updateUserRequest({ ...user, ...form, gender: genderValue }));
    setEditMode(false);
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 px-4 md:px-0">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Hồ sơ của tôi
      </h1>
      {/* Thông tin tài khoản */}
      <div className="bg-white rounded-xl border border-gray-200 flex flex-col md:flex-row items-center md:items-center p-6 md:p-8 mb-8">
        <div className="flex-shrink-0 flex flex-col items-center md:items-start md:flex-row gap-4 w-full md:w-auto">
          <div className="w-20 h-20 relative">
            <Image
              src={user.avatarUrl || "/images/logo/01.png"}
              alt="Avatar"
              width={80}
              height={80}
              className="rounded-full object-cover border-2 border-blue-200"
            />
          </div>
          <div className="flex flex-col justify-center ml-0 md:ml-4 mt-4 md:mt-0">
            <span className="text-xl font-semibold text-gray-900">
              {user.displayName}
            </span>
            <span className="text-blue-500 text-base">
              {user.role || "Người dùng"}
            </span>
            <span className="text-gray-400 text-sm">@{user.username}</span>
          </div>
        </div>
        {/* Removed Edit button from profile card */}
      </div>

      {/* Thông tin cá nhân */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Thông tin cá nhân
          </h2>
          <button
            className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium transition"
            onClick={() => {
              setForm({
                displayName: user?.displayName || "",
                email: user?.email || "",
                phone: user?.phone || "",
                birthDate: user?.birthDate || "",
                gender: user?.gender || "",
              });
              setEditMode(true);
            }}
            disabled={editMode}
          >
            Chỉnh sửa
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.788l-4 1 1-4 14.362-14.3z"
              />
            </svg>
          </button>
        </div>
        {!editMode ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <div className="text-xs text-gray-400 mb-1">Họ và tên</div>
              <div className="text-base text-gray-900 font-medium">
                {user.displayName}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Email</div>
              <div className="text-base text-gray-900 font-medium">
                {user.email}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Số điện thoại</div>
              <div className="text-base text-gray-900 font-medium">
                {user.phone}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Ngày sinh</div>
              <div className="text-base text-gray-900 font-medium">
                {user.birthDate}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Giới tính</div>
              <div className="text-base text-gray-900 font-medium">
                {genderToDisplay(user.gender)}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Vai trò</div>
              <div className="text-base text-gray-900 font-medium">
                {user.role || "Người dùng"}
              </div>
            </div>
          </div>
        ) : (
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
            onSubmit={handleSave}
          >
            <div>
              <div className="text-xs text-gray-400 mb-1">Họ và tên</div>
              <input
                type="text"
                name="displayName"
                value={form.displayName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900"
                required
              />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Email</div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900"
                required
              />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Số điện thoại</div>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900"
              />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Ngày sinh</div>
              <input
                type="date"
                name="birthDate"
                value={form.birthDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900"
              />
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Giới tính</div>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-900"
                required
              >
                <option disabled>Chọn giới tính</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Vai trò</div>
              <input
                type="text"
                name="bio"
                value={user.role || "Người dùng"}
                disabled
                className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 cursor-not-allowed"
              />
            </div>
            <div className="md:col-span-2 flex gap-2 mt-2">
              <button
                type="submit"
                className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Lưu
              </button>
              <button
                type="button"
                className="flex-1 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                onClick={() => setEditMode(false)}
              >
                Hủy
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
