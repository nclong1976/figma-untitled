import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Trophy, Gamepad2, User } from "lucide-react";

const navItems = [
  { label: "Trang chủ", icon: Home, path: "/", match: ["/"] },
  { label: "Giải Thưởng", icon: Trophy, path: "/giai-thuong", match: ["/giai-thuong", "/bieu-do", "/ket-qua"] },
  { label: "Sảnh Chơi", icon: Gamepad2, path: "/sanh-choi", match: ["/sanh-choi", "/choi-game"] },
  { label: "Của Tôi", icon: User, path: "/cua-toi", match: ["/cua-toi"] },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const p = location.pathname;

  const isActive = (item) => item.match.some((m) => (m === "/" ? p === "/" : p.startsWith(m)));

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[616px] z-50 bg-[#0A0E1A]/95 backdrop-blur-md border-t border-white/10">
      <div className="grid grid-cols-4 h-[60px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-1 focus:outline-none transition-transform active:scale-95"
            >
              <Icon
                className={`w-6 h-6 transition-colors ${active ? "text-[#FFD700]" : "text-white/55"}`}
                strokeWidth={active ? 2.4 : 2}
              />
              <span
                className={`text-[11px] font-medium leading-none transition-colors ${
                  active ? "text-[#FFD700]" : "text-white/55"
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