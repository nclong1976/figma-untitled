import React from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="mx-[17px] mt-6 mb-2 w-[calc(100%-34px)] flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
    >
      <LogOut className="w-4 h-4" /> Đăng xuất
    </button>
  );
}