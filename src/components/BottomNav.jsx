import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Trophy, Gamepad2, User } from "lucide-react";

const navItems = [
  { label: "Trang chủ", icon: Home, path: "/" },
  { label: "Giải Thưởng", icon: Trophy, path: "/giai-thuong" },
  { label: "Sảnh Chơi", icon: Gamepad2, path: "/sanh-choi" },
  { label: "Của Tôi", icon: User, path: "/cua-toi" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="absolute bottom-0 left-0 w-full z-50 bg-[#191c40]/95 backdrop-blur-md border-t border-white/10">
      <div className="grid grid-cols-4 h-[64px] max-w-[616px] mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-1 focus:outline-none transition-transform active:scale-95"
            >
              <Icon
                className={`w-6 h-6 transition-colors ${isActive ? "text-[#bfa22d]" : "text-white/55"}`}
                strokeWidth={isActive ? 2.4 : 2}
              />
              <span
                className={`text-[12px] font-medium leading-none transition-colors ${
                  isActive ? "text-[#bfa22d]" : "text-white/55"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}