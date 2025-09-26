"use client";

import LoginLayout from "./LoginLayout";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { loginRequest } from "@/redux/slice/Auth/AuthSlice";
import { RootState } from "@/redux/store/store";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const [form, setForm] = useState({
    login: "", // Có thể là userName hoặc phone
    password: "",
  });

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Đăng nhập thành công!");
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Luôn truyền userName, nếu nhập số thì gán vào userName
    dispatch(
      loginRequest({
        userName: form.login.trim(),
        password: form.password,
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

        {/* Sign In Form */}
        <h2 className="text-4xl font-bold mb-3 text-center text-black">
          Đăng nhập
        </h2>
        <p className="text-gray-500 mb-8 text-center">
          <span className="font-semibold text-xl text-gray-400">Đăng nhập</span>{" "}
          để kết nối cùng Dorfo.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 mb-2">
              Tên đăng nhập hoặc Số điện thoại
            </label>
            <input
              type="text"
              name="login"
              value={form.login}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg text-gray-400"
              placeholder="Nhập tên đăng nhập hoặc số điện thoại"
              required
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
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-gray-600">Ghi nhớ đăng nhập?</span>
            </label>
            <Link href="/forgot-password" className="text-orange-500">
              Quên mật khẩu
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        {/* Link đăng ký */}
        <p className="text-center mt-6 text-black">
          Chưa có tài khoản?{" "}
          <Link
            href="/signup"
            style={{ color: "#f97316" }}
            className="hover:text-orange-600 font-medium"
          >
            Đăng ký ngay.
          </Link>
        </p>
      </div>
    </LoginLayout>
  );
}
