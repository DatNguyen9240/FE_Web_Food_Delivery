import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#6c47c6] mb-4">
          Về Dorfo
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Dorfo là nền tảng giao đồ ăn nhanh chóng, tiện lợi và thân thiện dành
          cho sinh viên KTX khu B.
        </p>
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          <Image
            src="/logo/01.png"
            alt="Dorfo Logo"
            width={128}
            height={128}
            className="w-32 h-32 rounded-full shadow-md border-4 border-[#e2d8fa] bg-white object-cover"
            priority
          />
          <div>
            <h2 className="text-xl font-semibold text-[#6c47c6] mb-2">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-gray-700">
              Mang đến trải nghiệm đặt món ăn nhanh, an toàn và giá cả hợp lý
              cho sinh viên. Chúng tôi kết nối các quán ăn uy tín trong khu vực,
              giúp bạn dễ dàng tìm kiếm và thưởng thức những món ăn yêu thích
              mỗi ngày.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
          <div className="bg-[#f7f4ff] rounded-xl p-6 shadow">
            <span className="text-3xl mb-2 block">🍜</span>
            <h3 className="font-semibold text-lg text-[#6c47c6] mb-1">
              Đa dạng món ăn
            </h3>
            <p className="text-gray-600 text-sm">
              Hàng trăm món ăn bình dân, hợp khẩu vị sinh viên, luôn tươi ngon
              mỗi ngày.
            </p>
          </div>
          <div className="bg-[#f7f4ff] rounded-xl p-6 shadow">
            <span className="text-3xl mb-2 block">⚡</span>
            <h3 className="font-semibold text-lg text-[#6c47c6] mb-1">
              Giao nhanh
            </h3>
            <p className="text-gray-600 text-sm">
              Đặt món chỉ vài thao tác, giao tận phòng ký túc xá trong 15-20
              phút.
            </p>
          </div>
          <div className="bg-[#f7f4ff] rounded-xl p-6 shadow">
            <span className="text-3xl mb-2 block">💸</span>
            <h3 className="font-semibold text-lg text-[#6c47c6] mb-1">
              Giá sinh viên
            </h3>
            <p className="text-gray-600 text-sm">
              Giá cả hợp lý, nhiều ưu đãi hấp dẫn dành riêng cho sinh viên khu
              B.
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <h2 className="text-xl font-semibold text-[#6c47c6] mb-2">
            Liên hệ với Dorfo
          </h2>
          <p className="text-gray-700 mb-2">
            Email:{" "}
            <a
              href="mailto:hotro@dorfo.vn"
              className="text-blue-600 hover:underline"
            >
              hotro@dorfo.vn
            </a>
          </p>
          <p className="text-gray-700">
            Fanpage:{" "}
            <a
              href="https://facebook.com/dorfo.vn"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              facebook.com/dorfo.vn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
