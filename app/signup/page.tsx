"use client";

import LoginLayout from "../login/LoginLayout";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  registerRequest,
  clearRegisterSuccess,
} from "@/redux/slice/Auth/AuthSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store/store";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {  error, registerSuccess } = useSelector(
    (state: RootState) => state.auth
  );

  // Lắng nghe error và toast
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Lắng nghe đăng ký thành công
  useEffect(() => {
    if (registerSuccess) {
      toast.success("Đăng ký thành công!");
      setTimeout(() => {
        router.push("/login");
        dispatch(clearRegisterSuccess());
      }, 1000);
    }
  }, [registerSuccess, router, dispatch]);

  const [form, setForm] = useState({
    userName: "",
    displayName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerRequest({
        userName: form.userName,
        displayName: form.displayName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        dateOfBirth: form.dateOfBirth,
        gender: Number(form.gender),
      })
    );
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold flex items-center justify-center">
            <span className="mx-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
              Dorfo
            </span>
          </h1>
          <p className="text-center text-gray-500 mt-2 italic">
            Thưởng thức sự tuyệt vời
          </p>
        </div>

        {/* Sign Up Form */}
        <h2 className="text-4xl font-bold mb-3 text-center text-black">
          Đăng ký
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          <span className="font-semibold text-xl text-gray-400">Đăng ký</span>{" "}
          để trở thành thành viên của Dorfo.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 mb-2">Tên đăng nhập</label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-400"
              placeholder="Nhập tên đăng nhập"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Họ và tên</label>
            <input
              type="text"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-400"
              placeholder="Nhập họ và tên"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-400"
              placeholder="Nhập email của bạn"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-400"
              placeholder="Nhập số điện thoại của bạn"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-400"
              placeholder="Tạo mật khẩu"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">
              Nhập lại mật khẩu
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-400"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Ngày sinh</label>
            <input
              type="date"
              name="dateOfBirth"
              value={form.dateOfBirth}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-400"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Giới tính</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-400"
            >
              <option value={0}>Nam</option>
              <option value={1}>Nữ</option>
              <option value={2}>Khác</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
          >
            Đăng ký
          </button>
        </form>

        {/* Link đăng nhập */}
        <p className="text-center mt-6 text-black">
          Đã có tài khoản?{" "}
          <Link
            href="/login"
            style={{ color: "#f97316" }}
            className="hover:text-orange-600 font-medium"
          >
            Đăng nhập ngay.
          </Link>
        </p>
      </div>
    </LoginLayout>
  );
}
