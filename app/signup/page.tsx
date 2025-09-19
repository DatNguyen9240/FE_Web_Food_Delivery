"use client";

import LoginLayout from "../login/LoginLayout";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
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

        <form className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-2">Họ và tên</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg text-gray-400"
              placeholder="Nhập họ và tên"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg text-gray-400"
              placeholder="Nhập email của bạn"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-2">Mật khẩu</label>
            <input
              type="password"
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
              className="w-full p-3 border rounded-lg text-gray-400"
              placeholder="Nhập lại mật khẩu"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
          >
            Đăng ký
          </button>
        </form>

        {/* Đăng ký mạng xã hội */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-4">hoặc đăng ký bằng tài khoản khác</p>
          <div className="flex justify-center space-x-4">
            <button className="p-2 border rounded-full">
              <Image
                src="/icons/google-icon.png"
                alt="Google"
                width={24}
                height={24}
              />
            </button>
            <button className="p-2 border rounded-full">
              <Image
                src="/icons/facebook-icon.png"
                alt="Facebook"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

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
