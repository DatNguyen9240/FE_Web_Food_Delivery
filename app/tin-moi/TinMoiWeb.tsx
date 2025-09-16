"use client";
import React from "react";

const stories = [
  { user: "Tin của bạn", img: "/images/story1.jpg" },
  { user: "Ốc chi", img: "/images/story2.jpg" },
  { user: "Ngô Quyền", img: "/images/story3.jpg" },
  { user: "Hà anh", img: "/images/story4.jpg" },
];

const posts = [
  {
    user: "Ốc chi",
    avatar: "/images/story2.jpg",
    img: "/images/spaghetti.jpg",
    title: "Mì Ý Sốt Cà Chua",
    time: "30 phút",
    left: "Còn 15 phần",
    likes: 1234,
    content:
      "chef_minh Mì Ý sốt cà chua tự làm 🍝 Công thức gia truyền của gia đình mình nè! #homemade #pasta #vietnamese",
    timeAgo: "2 giờ",
  },
  {
    user: "Ngô Quyền",
    avatar: "/images/story3.jpg",
    img: "/images/pho.jpg",
    title: "Phở Bò Tái",
    time: "2 tiếng",
    left: "Còn 10 phần",
    likes: 857,
    content:
      "food_lover Phở bò tái nóng hổi buổi sáng ❤ Không có gì bằng một tô phở để bắt đầu ngày mới #pho #hanoi #breakfast",
    timeAgo: "4 giờ",
  },
];

const TinMoiWeb: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white min-h-screen pb-8">
      {/* Stories */}
      <div className="flex gap-4 px-4 py-6 border-b border-gray-200 overflow-x-auto scrollbar-hide">
        {stories.map((story, idx) => (
          <div key={idx} className="flex flex-col items-center min-w-[80px]">
            <div className="w-16 h-16 rounded-full border-2 border-orange-400 flex items-center justify-center overflow-hidden">
              <img
                src={story.img}
                alt={story.user}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xs mt-2 text-center truncate w-16">
              {story.user}
            </span>
          </div>
        ))}
      </div>
      {/* Posts */}
      <div className="flex flex-col gap-8 px-4 mt-6">
        {posts.map((post, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow border border-gray-100 max-w-2xl mx-auto"
          >
            <div className="flex items-center px-4 pt-4 pb-2">
              <img
                src={post.avatar}
                alt={post.user}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="font-semibold text-base flex-1">
                {post.user}
              </span>
              <button className="text-gray-400 hover:text-gray-600 px-2">
                ...
              </button>
            </div>
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-[320px] object-cover rounded-t-xl"
            />
            <div className="px-4 py-3">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-semibold text-lg">{post.title}</span>
                <span className="text-sm text-gray-500">{post.time}</span>
                <span className="ml-auto text-xs bg-gray-100 rounded px-2 py-0.5 text-gray-700">
                  {post.left}
                </span>
              </div>
              <div className="flex items-center gap-6 mb-2">
                <span className="text-sm text-gray-500">
                  {post.likes} lượt thích
                </span>
                <button className="ml-auto text-gray-500 hover:text-red-500">
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21C12 21 4 13.5 4 8.5C4 5.5 6.5 3 9.5 3C11.04 3 12.5 3.99 13 5.36C13.5 3.99 14.96 3 16.5 3C19.5 3 22 5.5 22 8.5C22 13.5 12 21 12 21Z" />
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-blue-500">
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />
                  </svg>
                </button>
              </div>
              <div className="text-sm text-gray-800 mb-2 line-clamp-3">
                {post.content}
              </div>
              <div className="text-xs text-gray-400">{post.timeAgo}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TinMoiWeb;
