import React from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Home as HomeIcon, Trophy, Gamepad2, User } from "lucide-react";

export default function MenuDrawer({ open, onOpenChange, t }) {
  const navigate = useNavigate();
  const items = [
    { label: t("home"), path: "/", icon: HomeIcon },
    { label: t("lobby"), path: "/sanh-choi", icon: Gamepad2 },
    { label: t("awards"), path: "/giai-thuong", icon: Trophy },
    { label: t("profile"), path: "/cua-toi", icon: User },
  ];
  const go = (path) => { navigate(path); onOpenChange(false); };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="bg-[#1e1832] border-[#323b51] text-white w-[78%] max-w-[320px] p-0">
        <SheetHeader className="px-5 py-4 border-b border-[#323b51] text-left">
          <SheetTitle className="text-[#bd9c59] text-base">{t("shortcuts")}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col p-3">
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
      </SheetContent>
    </Sheet>
  );
}