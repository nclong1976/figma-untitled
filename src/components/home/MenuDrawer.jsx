import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Home as HomeIcon, Trophy, Gamepad2, User, LogIn, UserPlus, LogOut } from "lucide-react";

export default function MenuDrawer({ open, onOpenChange, t }) {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const items = [
    { label: t("home"), path: "/", icon: HomeIcon },
    { label: t("lobby"), path: "/sanh-choi", icon: Gamepad2 },
    { label: t("awards"), path: "/giai-thuong", icon: Trophy },
    { label: t("profile"), path: "/cua-toi", icon: User },
  ];
  const go = (path) => { navigate(path); onOpenChange(false); };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="bg-[#1e1832] border-[#323b51] text-white w-[78%] max-w-[320px] p-0 flex flex-col">
        <SheetHeader className="px-5 py-4 border-b border-[#323b51] text-left">
          <SheetTitle className="text-[#bd9c59] text-base">{t("shortcuts")}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col p-3 flex-1">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <button
                key={it.path}
                onClick={() => go(it.path)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 transition-colors text-left"
              >
                <Icon className="w-5 h-5 text-[#bd9c59]" />
                <span className="text-sm">{it.label}</span>
              </button>
            );
          })}
        </div>
        <div className="p-3 border-t border-[#323b51]">
          {isAuthenticated ? (
            <>
              <p className="px-3 pb-2 text-xs text-white/60 truncate">{user?.email}</p>
              <button onClick={() => { logout(); onOpenChange(false); }} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-white/10 text-left">
                <LogOut className="w-5 h-5 text-[#bd9c59]" />
                <span className="text-sm">Đăng xuất</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <button onClick={() => go("/login")} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-[#bd9c59] text-[#1e1832] font-medium">
                <LogIn className="w-5 h-5" /> Đăng nhập
              </button>
              <button onClick={() => go("/register")} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg bg-white/10 hover:bg-white/15">
                <UserPlus className="w-5 h-5 text-[#bd9c59]" /> Đăng ký
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}