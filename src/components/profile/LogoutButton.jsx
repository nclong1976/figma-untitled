import React from "react";
import { base44 } from "@/api/base44Client";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function LogoutButton() {
  const { toast } = useToast();
  const handle = async () => {
    try {
      await base44.auth.logout();
      toast({ title: "Đã đăng xuất" });
    } catch {
      toast({ title: "Đăng xuất thất bại", variant: "destructive" });
    }
  };
  return (
    <button onClick={handle} className="mx-[17px] mt-6 mb-2 w-[calc(100%-34px)] flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600/80 hover:bg-red-600 text-white text-sm font-semibold transition-colors">
      <LogOut className="w-4 h-4" /> Đăng xuất
    </button>
  );
}