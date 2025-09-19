import React from "react";

const users = [
  {
    avatar: "/sell_off/01.jpg",
    fullname: "Phở 24",
    username: "pho24_khuB",
  },
  {
    avatar: "/avatars/bunbohue.png",
    fullname: "Bún Bò Huế O Loan",
    username: "bunbohue_loan",
  },
  {
    avatar: "/avatars/banhmihoamai.png",
    fullname: "Bánh Mì Hoa Mai",
    username: "banhmi_hoamai",
  },
  {
    avatar: "/avatars/tra_sua_toco.png",
    fullname: "Trà Sữa Tocotoco",
    username: "tocotoco_khub",
  },
  {
    avatar: "/avatars/comtam.png",
    fullname: "Cơm Tấm Sài Gòn",
    username: "comtam_sg",
  },
  {
    avatar: "/avatars/banhcanh.png",
    fullname: "Bánh Canh Cua",
    username: "banhcanh_cua",
  },
  {
    avatar: "/avatars/tra_sua_bobapop.png",
    fullname: "Trà Sữa Bobapop",
    username: "bobapop_khub",
  },
  {
    avatar: "/avatars/banhxeo.png",
    fullname: "Bánh Xèo Miền Trung",
    username: "banhxeo_mt",
  },
  {
    avatar: "/avatars/ga_ran.png",
    fullname: "Gà Rán Lotteria",
    username: "lotteria_khub",
  },
  {
    avatar: "/avatars/tra_chanh.png",
    fullname: "Trà Chanh Bụi Phố",
    username: "trachanh_buipho",
  },
  {
    avatar: "/avatars/banhcuon.png",
    fullname: "Bánh Cuốn Nóng",
    username: "banhcuon_nong",
  },
  {
    avatar: "/avatars/tra_sua_royaltea.png",
    fullname: "Royaltea",
    username: "royaltea_khub",
  },
  {
    avatar: "/avatars/mi_quang.png",
    fullname: "Mì Quảng Đà Nẵng",
    username: "miquang_dn",
  },
  {
    avatar: "/avatars/banhtrangtron.png",
    fullname: "Bánh Tráng Trộn Cô Năm",
    username: "banhtrang_conam",
  },
  {
    avatar: "/avatars/tra_sua_gongcha.png",
    fullname: "Gong Cha",
    username: "gongcha_khub",
  },
  {
    avatar: "/avatars/pho_thin.png",
    fullname: "Phở Thìn",
    username: "phothin_khub",
  },
  {
    avatar: "/avatars/banhmi.png",
    fullname: "Bánh Mì PewPew",
    username: "banhmi_pewpew",
  },
  {
    avatar: "/avatars/tra_sua_koi.png",
    fullname: "KOI Thé",
    username: "koi_khub",
  },
  {
    avatar: "/avatars/banhtrangnuong.png",
    fullname: "Bánh Tráng Nướng Đà Lạt",
    username: "banhtrangnuong_dl",
  },
  {
    avatar: "/avatars/tra_sua_milktea.png",
    fullname: "Milk Tea House",
    username: "milktea_house",
  },
];

export default function TinMoiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-8 px-4 py-8 max-w-7xl mx-auto">
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 bg-white rounded-2xl shadow-lg border p-6 h-fit">
        <h2 className="font-bold text-xl mb-6 text-gray-800 tracking-wide">
          Quán ăn nổi bật
        </h2>
        <ul className="space-y-5">
          {users.map((user, idx) => (
            <li
              key={idx}
              className="flex items-center gap-4 hover:bg-blue-100/60 rounded-lg px-2 py-2 transition group cursor-pointer"
            >
              <img
                src={user.avatar}
                alt={user.fullname}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-sm group-hover:scale-105 transition"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-gray-900 truncate text-base group-hover:text-blue-700">
                  {user.fullname}
                </span>
                <span className="text-xs text-gray-500 truncate group-hover:text-blue-500">
                  @{user.username}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      {/* Main content */}
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
