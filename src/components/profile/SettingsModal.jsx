import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone, Monitor, Tablet } from "lucide-react";

export default function SettingsModal({ open, onOpenChange, onToast }) {
  const [pw, setPw] = useState({ cur: "", new: "", confirm: "" });
  const [pin, setPin] = useState("");
  const [devices, setDevices] = useState([
    { id: "d1", name: "iPhone 13 (Hiện tại)", icon: Smartphone, current: true },
    { id: "d2", name: "iPad Pro", icon: Tablet, current: false },
    { id: "d3", name: "Windows PC", icon: Monitor, current: false },
  ]);

  const submitPw = () => {
    if (!pw.cur || !pw.new) return onToast({ title: "Vui lòng nhập đầy đủ", variant: "destructive" });
    if (pw.new !== pw.confirm) return onToast({ title: "Mật khẩu xác nhận không khớp", variant: "destructive" });
    onToast({ title: "Đổi mật khẩu thành công" });
    setPw({ cur: "", new: "", confirm: "" });
  };
  const submitPin = () => {
    if (!/^\d{6}$/.test(pin)) return onToast({ title: "PIN phải 6 chữ số", variant: "destructive" });
    onToast({ title: "Đổi PIN rút tiền thành công" });
    setPin("");
  };
  const revoke = (d) => {
    setDevices((ds) => ds.filter((x) => x.id !== d.id));
    onToast({ title: "Đã đăng xuất thiết bị", description: d.name });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[460px] bg-[#1e1832] border-[#323b51] text-white rounded-2xl">
        <DialogHeader><DialogTitle className="text-[#bd9c59]">Cài đặt cá nhân</DialogTitle></DialogHeader>

        <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#d3d6da]">Đổi mật khẩu đăng nhập</p>
            <Input type="password" placeholder="Mật khẩu hiện tại" value={pw.cur} onChange={(e) => setPw({ ...pw, cur: e.target.value })} className="bg-[#2a2040] border-[#3a2d52]" />
            <Input type="password" placeholder="Mật khẩu mới" value={pw.new} onChange={(e) => setPw({ ...pw, new: e.target.value })} className="bg-[#2a2040] border-[#3a2d52]" />
            <Input type="password" placeholder="Xác nhận mật khẩu mới" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} className="bg-[#2a2040] border-[#3a2d52]" />
            <Button onClick={submitPw} className="w-full bg-[#bd9c59] text-[#1e1832] hover:bg-[#cfb06a]">Cập nhật mật khẩu</Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#d3d6da]">Đổi PIN rút tiền</p>
            <Input type="text" inputMode="numeric" maxLength={6} placeholder="PIN mới (6 số)" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} className="bg-[#2a2040] border-[#3a2d52]" />
            <Button onClick={submitPin} className="w-full bg-[#bd9c59] text-[#1e1832] hover:bg-[#cfb06a]">Cập nhật PIN</Button>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-[#d3d6da]">Quản lý thiết bị</p>
            {devices.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.id} className="flex items-center gap-3 bg-[#2a2040] rounded-lg px-3 py-2">
                  <Icon className="w-5 h-5 text-[#bd9c59]" />
                  <span className="flex-1 text-sm">{d.name}{d.current && <span className="ml-2 text-[10px] text-emerald-400">(Thiết bị này)</span>}</span>
                  {!d.current && <button onClick={() => revoke(d)} className="text-xs text-red-400 hover:underline">Đăng xuất</button>}
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild><Button variant="ghost" className="text-white/70">Đóng</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}