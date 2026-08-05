import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const METHODS = [
  { id: "bank", label: "Ngân hàng", icon: "🏦" },
  { id: "crypto", label: "Crypto (USDT)", icon: "₿" },
];

export default function DepositModal({ open, onOpenChange, balance, linked, onSubmit }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) { setAmount(""); setMethod("bank"); setLoading(false); }
  }, [open]);

  const submit = (e) => {
    e.preventDefault();
    if (loading) return;
    const amt = Number(amount);
    if (!amt || amt <= 0) return;
    setLoading(true);
    setTimeout(() => {
      onSubmit({ amount: amt, method });
      setLoading(false);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0d1226] border-white/15 text-white max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="text-white">Nạp tiền</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <p className="text-white/60 text-xs mb-1.5">Số dư hiện tại: <span className="text-amber-400 font-semibold">{(balance || 0).toLocaleString()} coin</span></p>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Nhập số tiền muốn nạp"
              className="w-full h-11 rounded-lg bg-white/5 border border-white/15 px-3 text-white text-sm outline-none focus:border-amber-500"
              autoFocus
            />
          </div>
          <div>
            <p className="text-white/60 text-xs mb-1.5">Phương thức</p>
            <div className="grid grid-cols-2 gap-2">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`h-11 rounded-lg border px-3 flex items-center gap-2 text-sm transition-colors ${method === m.id ? "border-amber-500 bg-amber-500/15 text-white" : "border-white/15 bg-white/5 text-white/70"}`}
                >
                  <span>{m.icon}</span> {m.label}
                </button>
              ))}
            </div>
          </div>
          {linked && linked.length > 0 && (
            <p className="text-white/40 text-[11px]">Sẽ sử dụng tài khoản đã liên kết. Vui lòng liên hệ CSKH nếu cần hỗ trợ.</p>
          )}
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="text-white/70">Huỷ</Button>
            <Button type="submit" disabled={loading} className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
              {loading ? "Đang xử lý..." : "Xác nhận nạp tiền"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}